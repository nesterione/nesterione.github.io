# coding=utf-8
import codecs
import markdown
import json

with open('config.json', encoding='utf-8') as config_file:
    config = json.loads(config_file.read())

print(config['categories'])

r = codecs.open("source/00012.md", "r", "utf-8")
data=r.read()
r.close()

data = markdown.markdown(data, extensions=["markdown.extensions.fenced_code"])

i1 = ''' 
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js"></script>
'''
i2 = '''
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  config: ["MMLorHTML.js"],
  jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
  extensions: ["MathMenu.js", "MathZoom.js"]
});
</script>

'''

i3 = '''
<script type="text/javascript"
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
'''

i4 = '''
<link rel="stylesheet" href="github-markdown.css">
'''

head = '''

<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
		<title>GitHub Markdown CSS demo</title>
		<link rel="stylesheet" href="github-markdown.css">
		<style>
			body {
				min-width: 200px;
				max-width: 790px;
				margin: 0 auto;
				padding: 30px;
			}
		</style>
    '''
    
head2 = '''    
	</head>
	<body>
		<article class="markdown-body">'''

end = '''
		</article>
	</body>
</html>

'''

heig = '''
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/styles/github.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.7/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
'''

f = codecs.open('render/00012.html','w',"utf-8")

f.write(head)
f.write(i4)
f.write(i3)
f.write(heig)
f.write(head2)
f.write(data)
f.write(end)


#f.write(i4)
#f.write(data)
#f.write(i1)
#f.write(i2)
#f.write(i3)
f.close()
