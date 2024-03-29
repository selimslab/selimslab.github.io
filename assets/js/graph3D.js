function draw3DGraph(id=null){

    (async () => {
    const gData = await fetch("/assets/data/graph.json").then((response) =>
      response.json()
    );

    if (id !== null){
        node = gData["nodes"][id]
        links =  node["links"]
        if (links.length == 0){
          return 
        }
        gData["links"] = links

        nodes  =  [ node ]
        for (const n of node["neighbors"]){
            nodes.push(gData["nodes"][n])
        }
        gData["nodes"] = nodes
    } else {
      gData["nodes"] = Object.values(gData["nodes"])
    }

    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode = null;

    const container = document.getElementById("graph-container");

    const g = ForceGraph3D();

    g(container)
      .graphData(gData)
      .nodeLabel("name")
      .nodeAutoColorBy('group')
      .linkWidth((link) => (highlightLinks.has(link) ? 1 : 0.1))
      .nodeVisibility(node => node.neighbors.length != 0)
      .nodeThreeObject(node => {
          const sprite = new SpriteText(node.name);
          sprite.material.depthWrite = false; // make sprite background transparent
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        });

    g.d3Force("center", null);

    // Spread nodes a little wider
    g.d3Force('charge').strength(-120);
  })();

  }