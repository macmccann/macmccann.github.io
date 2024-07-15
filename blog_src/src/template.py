from bs4 import BeautifulSoup as Soup
from os import listdir
from os.path import isfile, join
import pypandoc
from datetime import datetime

# constants
POST_DIR = "../posts/"
PUBLIC_DIR = "../blog/"
TEMPLATE_DIR = "../templates/"


def delatex(latex):
    return pypandoc.convert_text(
        latex, "html", format="latex", extra_args=["--mathjax"]
    )


def web_title_from(file):
    result = "-".join(file.split("-")[3:])
    return result


def date_from(file):
    split_file = file.split("-")
    month = split_file[0]
    day = split_file[1]
    year = split_file[2]
    return month + "/" + day + "/" + year


class Post:
    def __init__(self, title, web_title, create_date, url):
        self.title = title
        self.web_title = web_title
        self.create_date = create_date
        self.url = url
        self.create_date_timestamp = datetime.strptime(create_date, "%m/%d/%y").timestamp()

# find all of the post files
post_files = [f for f in listdir(POST_DIR) if isfile(join(POST_DIR, f))]
posts = []

for post_file in post_files:
    # factor the post data
    with open((POST_DIR + post_file), "r") as f:
        post_file_data = f.read()
    # construct the HTML tree
    post_soup = Soup(post_file_data, features="html.parser")
    # find the <title> tag
    title_soup = post_soup.find("title").extract()
    title = title_soup.string

    post_meta_soup = post_soup.find(id="post-meta")
    title_in_post_soup = Soup(features="html.parser").new_tag("h2")
    title_in_post_soup.string = title
    post_meta_soup.append(title_in_post_soup)
    date_in_post_soup = Soup(features="html.parser").new_tag("p")
    date_in_post_soup["class"] = "small-gray"
    date_in_post_soup.string = "Published on " + date_from(post_file)
    post_meta_soup.append(date_in_post_soup)

    # find all the <latex> tags
    latexes = post_soup.find_all("latex")
    for latex in latexes:
        # convert the latex to html
        latex_html = delatex(latex.string)
        latex.replace_with(Soup(latex_html, features="html.parser"))

    # create the post html and write it to file
    # insert the post soup into the template soup
    with open((TEMPLATE_DIR + "post.html"), "r") as f:
        template_file_data = f.read()
    # construct the HTML tree
    template_soup = Soup(template_file_data, features="html.parser")
    # find the <post> tag
    post_tag = template_soup.find(id="post")
    post_tag.append(post_soup)
    template_soup.find("title").replace_with(title_soup)

    # write it to file
    with open((PUBLIC_DIR + post_file), "w+") as f:
        f.write(template_soup.prettify())

    # create the post
    post = Post(title, web_title_from(post_file), date_from(post_file), post_file)

    posts.append(post)

posts.sort(key=lambda x: x.create_date_timestamp, reverse=True)
# create the index file
# prepare the soup for the posts
index_post_tags = []
for post in posts:
    li_tag = Soup(features="html.parser").new_tag("li")
    post_tag = Soup(features="html.parser").new_tag("a")
    post_tag["href"] = post.url
    post_tag.string = post.title
    li_tag.append(post_tag)
    date_tag = Soup(features="html.parser").new_tag("p")
    date_tag.string = post.create_date
    li_tag.append(date_tag)
    index_post_tags.append(li_tag)
with open((TEMPLATE_DIR + "index.html"), "r") as f:
    index_file_data = f.read()
index_soup = Soup(index_file_data, features="html.parser")
# find the <posts> tag
posts_tag = index_soup.find(id="posts")
for index_post_tag in index_post_tags:
    posts_tag.append(index_post_tag)

# write it to file
with open((PUBLIC_DIR + "index.html"), "w+") as f:
    f.write(index_soup.prettify())
