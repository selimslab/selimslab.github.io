function render3DGraph(){

    (async () => {
    const gData = await fetch("/assets/data/graph.json").then((response) =>
      response.json()
    );

    const highlightNodes = new Set();

    const container = document.getElementById("graph");

    const g = ForceGraph3D();

    g(container)
      .graphData(gData)
      .nodeLabel("name")
      .linkColor(() => lightText)
      .linkWidth(() => 1)
      .nodeVal(node => node.links.length || 1) 
      .nodeColor(node => {
        return highlightNodes.has(node.id) ? accent : getColor(node.group);
      })


  })();

}

render3DGraph()
