# Δ Delta  

View at <https://selimslab.github.io>

![](assets/static/ss.jpg)

## What is it?
This is a place to bring together everything I like online.  

Links, essays, photos, artworks, drawings, poetry, lists, code snippets, experiments, ..

## Origin of the name 
The name comes from the greek letter **delta**(Δ), 
it's used as mathematical symbol of change,   
often for incremental change. 

It reflects the philosophy of doing one little thing at a time. 

## Motivation 
Doing one little thing at a time compounds over time.   
Writing clarifies mind.   
Editing provides natural spaced repetition.  
Ideas spark each other and connect in creative ways.  
This leads to more iterations and virtuous cycles. 


## How it works 

Plain markdown files 

All pages have a unique name

### Backlinks 
Any file can link to any other using its name. With html, markdown, or [[wikilink]] format. 

Pages list their incoming links 

### Tags 
Files can tag each other by their name.   
Tags are listed above page title. 

### Prepare 
_plugins\gen.rb visits all pages before rendering. 

Figures out document tree, replaces wikilinks with html links, and adds backlinks to page metadata. 

### Publish 

Published with jekyll, following [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now)

### Visualize
[3D Graph of all pages](https://selimslab.github.io/graph-3d)

### Works offline 
A service worker caches all pages (4-5mb) on the first visit. 

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
