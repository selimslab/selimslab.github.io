---
---

Taking notes clears my mind and it's fun 

There are many ways to do it. I searched for a simple and flexible way. Publishing should be simple, readable, accessible, beautiful, and personal

So here is my process so far 

## Write 

I write my notes in markdown files

Each file has a unique name eg. my-file-name

Files link to each other with wikilinks eg. [[psy]] 

Files can also tag to each other in markdown front-matter, eg. tags: psy

Markdown files are grouped under dirs with short names eg. psy, math, lit, ux etc

Dirs have a file with the proper dir name, eg. psy dir has psychology.md 

If you tag any file to psy, you will see its link in url /psychology

Dirs have at most one child dir, flat is better than nested 

There is a yaml file to clarify the short name to display in a url, eg. func: functional-programming

## Build  

I use [jekyll](https://jekyllrb.com/) to turn markdown to html

Jekyll comes with a few folders

You can define your templates _layouts

```html
<article>

  <h1 id="page-title">{{ page.title }}</h1>

  {{ content }}

</article>
```

You can choose layout by path 

```yml
collections:
  NOTES:    
    output: true 
    permalink:  /:title/


defaults:
  -
    scope:
      path: "" # an empty string here means all files in the project
    values:
      layout: post
  -
    scope:
      path: "*/code/*"
    values:
      layout: code
      
```

Jekyll has _includes to define reusable html parts 

Jekyll runs ruby files under _plugins, here I iterate my files and replace wikilinks with markdown links 


## Deploy 

I deploy to github pages. 

This github action automatically builds and deploys upon commit 

```yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

# Sample workflow for building and deploying a Jekyll site to GitHub Pages
name: Deploy Jekyll site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["master"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Ruby
        uses: ruby/setup-ruby@0a29871fe2b0200a17a4497bae54fe5df0d973aa # v1.115.3
        with:
          ruby-version: '3.0' # Not needed with a .ruby-version file
          bundler-cache: true # runs 'bundle install' and caches installed gems automatically
          cache-version: 0 # Increment this number if you need to re-download cached gems
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v2
      - name: Build with Jekyll
        # Outputs to the './_site' directory by default
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        # Automatically uploads an artifact from the './_site' directory by default
        uses: actions/upload-pages-artifact@v1

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1

```


