# coding=utf-8
import codecs
import markdown
import json
import os
import re
from datetime import datetime
import shutil 

DATE_FORMAT = '%d.%m.%Y'

ANALYTICS = '''
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-59740475-1', 'auto');
        ga('send', 'pageview');
    </script>
    '''

class Category:
    def __init__(self, template, title, name, description):
        super(Category, self).__init__()
        self.template = template
        self.title = title
        self.description = description
        self.name = name
        self.posts = []

    def getn_content(self):
        # TODO upd with tmp
        linksstr = []

        sorted_posts = sorted(self.posts, key=(lambda x: x.date),reverse=True )

        for post in sorted_posts:
            link = '<li><a href="{0}"> {1} ({2}) </a></li>'.format(post.get_filename(), post.title,post.date.strftime(DATE_FORMAT)) 
            linksstr+=[link]

        return '<ul>' +  '\n'.join(linksstr) + '</ul>'
        
    def get_filename(self):
        return self.name + ".html"


    def getpage(self):
        t = self.template
        t = t.replace("{{title}}", self.title)
        t = t.replace("{{description}}", self.description)
        t = t.replace("{{content}}", self.getn_content())
        t = t.replace("{{include}}", ANALYTICS)
        return t


    def add_post(self, post):
        self.posts+=[post]


class Post:

    MATHJAX_INCLUDE = '''
<script type="text/javascript"
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
'''
    CODE_HIGHLIGHTER_INCLUDE = '''
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
'''

    def __init__(self, title, date, change, slug, comments, article, category):
        super(Post, self).__init__()
        self.title = title
        self.date = date
        self.change = change
        self.slug = slug
        self.comments = comments
        self.article = article
        self.category = category


    def get_html(self, template):
        t = template
        t = t.replace("{{title}}", self.title)
        t = t.replace("{{backlink}}", self.category.name+".html")
        t = t.replace("{{category}}", self.category.title)
        t = t.replace("{{date}}", self.date.strftime(DATE_FORMAT))
        t = t.replace("{{change}}", self.change.strftime(DATE_FORMAT))
        t = t.replace("{{comments}}", self.comments)
        include = self.MATHJAX_INCLUDE+ self.CODE_HIGHLIGHTER_INCLUDE+ ANALYTICS
        t = t.replace("{{include}}", include)

        html_article = markdown.markdown(self.article, extensions=["markdown.extensions.fenced_code"])
        t = t.replace("{{article}}", html_article)

        return t

    def get_filename(self):
        return self.slug + ".html"



# form directories
ROOT_PATH = "render/"
if os.path.exists(ROOT_PATH):
    shutil.rmtree(ROOT_PATH)
# copy static content 
shutil.copytree("templates/static/", ROOT_PATH, symlinks=False, ignore=None)

POST_PATH = ROOT_PATH + "post/"
if not os.path.exists(POST_PATH):
    os.makedirs(POST_PATH)


categories = {}


with open('config.json', encoding='utf-8') as config_file:
    config = json.loads(config_file.read())

category_tmpl = codecs.open("templates/category_tmpl.html", "r", "utf-8").read()

for c in config['categories']:
    category = Category(category_tmpl, c['title'], c['name'], c['discription'])
    categories[c['name']]=category


def load_config_page(text):
    m = re.search('<!--([^-]*)-->', text)
    cnftext = m.group(0).replace("<!--","").replace("-->","")
    return json.loads(cnftext)

recently = []


for root, dirs, files in os.walk("source", topdown=False):
    for name in files:
        text = codecs.open( os.path.join(root, name), "r", "utf-8").read()
        cnf = load_config_page(text)
        
        _title = cnf['title']
        _category_name = cnf['category']
        _slug = cnf['slug']
        _comments = cnf['comments']
        _date = datetime.strptime(cnf['date'], DATE_FORMAT )
        _change = datetime.strptime(cnf['change'], DATE_FORMAT)
        
        _category = categories[_category_name]
        post = Post(_title,_date,_change, _slug, _comments, text, _category)
        recently+=[post]
        categories[_category_name].add_post(post)

        
for post in recently:
    f = codecs.open(POST_PATH+post.get_filename(),'w',"utf-8")
    post_tmpl = codecs.open("templates/post_tmpl.html", "r", "utf-8").read()
    f.write( post.get_html(post_tmpl) )
    f.close()

for k, c in categories.items():
    filename = POST_PATH + c.get_filename()
    f = codecs.open(filename,'w',"utf-8")
    page = c.getpage()
    f.write(page)
    f.close()

# index page generation
def getn_recently(posts):
        # TODO upd with tmp
        linksstr = []

        sorted_posts = sorted(posts, key=(lambda x: x.date),reverse=True )

        for post in sorted_posts[:10]:
            link = '<li><a href="post/{0}"> {1} ({2}) </a></li>'.format(post.get_filename(), post.title,post.date.strftime(DATE_FORMAT)) 
            linksstr+=[link]

        return '<ul>' +  '\n'.join(linksstr) + '</ul>'


# TODO add params
def getn_categories_links():
    linksstr = []
    for k, c in categories.items():
        filename = POST_PATH + c.get_filename()
        link = '<li><a href="post/{0}"> {1} ({2}) </a></li>'.format(c.get_filename(), c.title, len(c.posts) )
        linksstr+=[link]

    return '<ul>' +  '\n'.join(linksstr) + '</ul>'


f = codecs.open(ROOT_PATH+"index.html",'w',"utf-8")
index_tmpl = codecs.open("templates/index_tmpl.html", "r", "utf-8").read()
index_tmpl = index_tmpl.replace("{{include}}", ANALYTICS)
index_tmpl = index_tmpl.replace("{{recently}}", getn_recently(recently))
index_tmpl = index_tmpl.replace("{{categories}}", getn_categories_links())

f.write(index_tmpl)
f.close()