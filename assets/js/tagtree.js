---
---


function renderTagTree(tagdata, parent) {
    let ul = document.createElement("ul");
    parent.appendChild(ul);
    for (let tag in tagdata) {  
        let li = document.createElement("li");
        ul.appendChild(li);
        let a = document.createElement("a");
        li.appendChild(a);
        a.href = "/" + tag;

        if (tagnames[tag]) {
            title = tagnames[tag];
        }
        else {
            title = tag
        }

        a.innerHTML = title;

        if (tagdata[tag]) {
            renderTagTree(tagdata[tag], li);
        }
    }
}

const tagnames = {{ site.data.tagnames | jsonify }};
const tagtree = {{ site.data.tagtree | jsonify }};
const parent = document.getElementById("tagtree");
renderTagTree(tagdata, parent);

