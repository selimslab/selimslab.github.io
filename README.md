#  Project Delta

One shared digital space to bring together everything I like on the web. 

Notes, links, articles, photos, artworks, drawings, poetry, lists, code snippets, experiments, ideas, ..

View at <https://selimslab.github.io>

<br>

[![CI/CD](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/selimslab/selimslab.github.io/actions/workflows/pages.yml)


## How it works 

Plain markdown files, published with jekyll. 

Mostly written in vscode and obsidian. 

Minimal, simple, clean, custom. 

No ads, no tracking.  

Built upon [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now)


## Connected information graph  

All pages have a unique name so file name is also file id.

Any file can link to any other using its id. With html, markdown, or [[wikilink]] format.

Pages list which other pages links to them (backlinks or incoming links)

[2D Graph of all pages](https://selimslab.github.io/graph2D)

[3D Graph of all pages](https://selimslab.github.io/graph3D)


## Tags 
Files can also tag each other. Tags are defined at `_data\tag_to_file.yml` 
Tags of a page is listed above its title. 

## Offline 

Works offline. A service worker caches all static pages (4-5mb) on the first visit. 

Search, theme, page-dice and idea-machine also work offline. Artwork shuffle will only work with images you've seen before.  

## Plugin 
`_plugins\gen.rb` visits all pages before rendering. 

Figures out document tree, replaces wikilinks with html links, and adds backlinks to page metadata. 

## Other

All content and ideas belong to their original creators, even though most are not listed explicitly. Please verify their origin before sharing. 

Most pages do not have dates since the site aims to include timeless information.

## Setup

1. clone the repo
3. install ruby <https://www.ruby-lang.org/en/downloads/>
4. `gem install bundler jekyll`
5. `bundle install`

## Serve
```
bundle exec jekyll serve --trace --incremental --profile
```
