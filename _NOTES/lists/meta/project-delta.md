---
---

I write my notes in common markdown files. 

Each file has a unique name. Files can link to each other by their names. 

Folders group files. There are few nested folders. 

Files can also tag each other. 

I use [jekyll](https://jekyllrb.com/) to turn markdown to html and a single custom ruby plugin to traverse the directories and figure out backlinks. 

Rendered pages list their content, tags, sub-folders, and  incoming links 

If the build is successful after a commit, a github action automatically deploys to github pages
