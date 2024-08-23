# Δ Delta  

View at <https://selimslab.github.io>

![](assets/static/ss.jpg)


This is a place to bring together everything I like online.  
Links, articles, photos, artworks, drawings, poetry, lists, code snippets, experiments, ..

The name **delta**(Δ) comes from the greek letter Δ, used for mathematical symbol of change, often for incremental change.  
It reflects the philosophy of doing one little thing at a time and it compounds.  

Writing clarifies mind.  
Editing the site becomes natural spaced repetition.   
Ideas start to connect in creative ways.  
Having an existing central place makes it easier to add new content and experiments   
Overall this creates a virtuous cycle


## Setup

1. clone the repo
3. install ruby <https://www.ruby-lang.org/en/downloads/>
4. `gem install bundler jekyll`
5. `bundle install`

## Serve
```
bundle exec jekyll serve --trace --incremental --profile
```

## Deploy 

Git push to main triggers a github action 

[![CI/CD](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml)


## How it works 

Plain markdown files 

Published with jekyll, following [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now)

All pages have a unique file name, it is also file id.

Any file can link to any other using its name. With html, markdown, or [[wikilink]] format. 

Files can also tag each other by their name. **Tags** of a page is listed above its title. 

Pages list which other pages links to them (backlinks or incoming links)

[3D Graph of all pages](https://selimslab.github.io/graph-3d)

## Offline 
Works offline. A service worker caches all static pages (4-5mb) on the first visit. 

## Plugin 
`_plugins\gen.rb` visits all pages before rendering. 

Figures out document tree, replaces wikilinks with html links, and adds backlinks to page metadata. 

## Other

All content and ideas belong to their original creators. 
