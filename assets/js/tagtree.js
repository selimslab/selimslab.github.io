---
layout: null
---

function renderUl(root) {
    let ul = document.createElement("ul");
    root.appendChild(ul);
    return ul;
}

let seen = new Set();

function renderLi(tag, ul) {
    
    let li = document.createElement("li");
    ul.appendChild(li);

    let a = document.createElement("a");



    if (tagtofilename[tag]) {
        tag = tagtofilename[tag];
    }
    seen.add(tag);
    
    a.innerHTML = labels[tag] ?? tag;;
    a.href = "/" + tag;

    li.appendChild(a);
    return li 
}


const iterate = (obj, root) => {
    Object.keys(obj).forEach(key => {

    ul = renderUl(root);
    li = renderLi(key, ul);

    next = obj[key]
    if (typeof next === 'object' && next !== null) {
            iterate(next, li)
        }
    })
}

{% assign tagpages = site.documents | where: "layout", "tag"   %}
const tagpages = {{tagpages | jsonify}};

labels = {}
tagpages.forEach(function(page) {
    labels[page.slug] = page.title;
});

const tagtofilename = {{ site.data.tagtofilename | jsonify }};
const tagtree = {{ site.data.tagtree | jsonify }};
const root = document.getElementById("tagtree");

iterate(tagtree, root);
console.log(seen, "tags rendered");
console.log(labels, "labels");

let diff =  Object.keys(labels).filter(x => !seen.has(x));
console.log(diff, "tags not rendered");

