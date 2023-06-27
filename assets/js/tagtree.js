---
layout: null
---

function renderUl(root) {
    let ul = document.createElement("ul");
    root.appendChild(ul);
    return ul;
}

function renderLi(tag, ul) {

    let li = document.createElement("li");
    ul.appendChild(li);

    let a = document.createElement("a");

    if (tagnames[tag]) {
        tag = tagnames[tag];
    }

    a.innerHTML = titles[tag] ?? tag;
    a.href = "/" + tag;

    li.appendChild(a);
    return li 
}

total = 0 
const iterate = (obj, root) => {
    Object.keys(obj).forEach(key => {

    ul = renderUl(root);
    li = renderLi(key, ul);
    total += 1;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
            iterate(obj[key], li)
        }
    })
}
{% assign tag_pages = site.documents | where: "layout", "tag"   %}
const tag_pages = {{tag_pages | jsonify}};

titles = {}
tag_pages.forEach(function(page) {
    titles[page.slug] = page.title;
});

const tagnames = {{ site.data.tagnames | jsonify }};
const tagtree = {{ site.data.tagtree | jsonify }};
const root = document.getElementById("tagtree");

iterate(tagtree, root);
console.log(total, "tags rendered");