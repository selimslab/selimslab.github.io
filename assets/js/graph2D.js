
(async () => {
  const graphData = await fetch("/assets/data/graph.json").then((response) =>
    response.json()
  );
  const container = document.getElementById("graph");
  const g = ForceGraph()

  const highlightNodes = new Set();

  g(container)
    .graphData(graphData)
    .minZoom(1)
    .maxZoom(5)
    .linkColor(() => lightText)
    .linkWidth(() => 0.3)
    .nodeColor(node => {
      return highlightNodes.has(node.id) ? accent : getColor(node.group);
    })
    .nodeVal(node => node.links.length || 1) 
    .onNodeHover((node) => {
      highlightNodes.clear();
      if (node) {
        highlightNodes.add(node.id);
        node.links.forEach((linkedNode) => highlightNodes.add(linkedNode)
        );
      }
    })
    .autoPauseRedraw(false) // keep redrawing after engine has stopped

  g.d3Force("center", null);
  g.d3Force('charge').strength(-16);

  // fit to canvas when engine stops
  g.onEngineStop(() => g.zoomToFit());
  
})();




