##  Project Delta

A personal knowledge graph/wiki/digital garden. View at <https://selimslab.github.io>

[![Deploy Jekyll site to Pages](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml)

## Setup

1. clone the repo
3. install ruby <https://www.ruby-lang.org/en/downloads/>
4. `gem install bundler jekyll`
5. `bundle install`

## Serve
```
bundle exec jekyll serve --trace --incremental --profile
```

## How it works 
Plain markdown notes published with jekyll. Minimal, no ads, no analytics. 

## Connected graph  
All pages have a unique name so file name is file id.

Any file can link to any other using its id, with html, markdown, or [[wikilink]] format.

See which pages links to the current page (backlinks or incoming links)

Files can also tag each other. Tags are defined at `_data\tag_to_file.yml`

`_plugins\gen.rb` visits all pages before rendering, figures out document tree, replaces wikilinks with html links, and adds backlinks to page metadata. 

## Offline 
Works offline. A service worker caches all static pages (4-5mb) on the first open. 

Search, dark mode, and idea shuffle also work offline. 

Artwork shuffle needs network since images are heavy so they can't be cached. 

