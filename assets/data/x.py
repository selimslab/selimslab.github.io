import json

with open('artworks.json', 'r') as f:
    artworks = json.load(f)

for artwork in artworks:
    print(artwork['name'])

