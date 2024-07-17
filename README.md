#  Project Delta

A personal knowledge base (or graph/wiki/digital garden)

View at <https://selimslab.github.io>

<br>

[![CI/CD](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml)


## Why?

Like a personal shared internet archive, it's a single place to keep everything I like. My notes, code snippets, experiments, projects, lists, artworks, ideas, poems, articles, PDFs, images, things clipped from the web, etc.

I wanted to build something I'd love to use every day and I'm happy that it worked. 


## How it works 

Plain markdown files, published with jekyll. Mostly written in vscode or obsidian. 

Minimal, no ads, no analytics. 

Built upon [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now)

## Connected graph  

All pages have a unique name so file name is also file id.

Any file can link to any other using its id. With html, markdown, or [[wikilink]] format.

Pages list which other pages links to them (backlinks or incoming links)

## Tags 
Files can also tag each other. Tags are defined at `_data\tag_to_file.yml` 
Tags of a page is listed above its title. 

## Plugin 
`_plugins\gen.rb` visits all pages before rendering, figures out document tree, replaces wikilinks with html links, and adds backlinks to page metadata. 

## Offline 

Works offline. A service worker caches all static pages (4-5mb) on the first open. 

Search, theme, page-dice and idea-machine also work offline. Artwork shuffle will only work images you've seen before.  

## Setup

1. clone the repo
3. install ruby <https://www.ruby-lang.org/en/downloads/>
4. `gem install bundler jekyll`
5. `bundle install`

## Serve
```
bundle exec jekyll serve --trace --incremental --profile
```