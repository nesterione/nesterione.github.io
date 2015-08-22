# coding=utf-8
import codecs
import markdown
import json
import os
import re
from datetime import datetime

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


    def getpage(self):
        t = self.template
        t = t.replace("{{title}}", self.title)
        t = t.replace("{{description}}", self.description)
        t = t.replace("{{content}}", "content")
        t = t.replace("{{include}}", ANALYTICS)
        return t


    def add_post(self, post):
        self.posts+=[post]


class Post:
    def __init__(self, title, date, change, slug, comments, article):
        super(Post, self).__init__()
        self.title = title
        self.date = date
        self.change = change
        self.slug = slug
        self.comments = comments
        self.article = article


categories = {}


with open('config.json', encoding='utf-8') as config_file:
    config = json.loads(config_file.read())


category_tmpl = codecs.open("templates/category_tmpl.html", "r", "utf-8").read()


for c in config['categories']:
    category = Category(category_tmpl, c['title'], c['name'], c['discription'])
    categories[c['name']]=category


# m = re.search('(?<=abc)def', 'abcdef')
# >>> m.group(0)

def load_config_page(text):
    m = re.search('<!--([^-]*)-->', text)
    cnftext = m.group(0).replace("<!--","").replace("-->","")
    return json.loads(cnftext)

recently = []


for root, dirs, files in os.walk("source", topdown=False):
    for name in files:
        text = codecs.open( os.path.join(root, name), "r", "utf-8").read()
        cnf = load_config_page(text)
        dateformat = '%d.%m.%Y'
        _title = cnf['title']
        _category = cnf['category']
        _slug = cnf['slug']
        _comments = cnf['comments']
        _date = datetime.strptime(cnf['date'], dateformat )
        _change = datetime.strptime(cnf['change'], dateformat)
        
        post = Post(_title,_date,_change, _slug, _comments, text)
        recently+=[post]
        categories[_category].add_post(post)

        

for k, c in categories.items():
    filename = 'render/'+ c.name + '.html'
    f = codecs.open(filename,'w',"utf-8")
    page = c.getpage()
    f.write(page)
    f.close()