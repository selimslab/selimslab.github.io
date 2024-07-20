
(async () => {
  const graphData = await fetch("/assets/data/graph.json").then((response) =>
    response.json()
  );
  const container = document.getElementById("graph");
  const g = ForceGraph()

  const highlightNodes = new Set();
  const highlightLinks = new Set();
  let hoverNode = null;

  g(container)
    .graphData(graphData)
    .minZoom(1)
    .maxZoom(5)
    .linkColor((link) => (highlightLinks.has(link) ?  "#FF530D" : "#568692"))
    .nodeColor(node => {
      return highlightNodes.has(node.id) ? "#FF530D" : getColor(node.group);
    })
    .linkWidth((link) => (highlightLinks.has(link) ? 1 : 0.3))
    .onNodeHover((node) => {
      highlightNodes.clear();
      highlightLinks.clear();
      if (node) {
        highlightNodes.add(node.id);
        node.links.forEach((linkedNode) => highlightNodes.add(linkedNode)
        );
      }

      hoverNode = node || null;
    })
    .onLinkHover((link) => {
      highlightNodes.clear();
      highlightLinks.clear();

      if (link) {
        highlightLinks.add(link);
        highlightNodes.add(link.source.id);
        highlightNodes.add(link.target.id);
      }
    })
    .autoPauseRedraw(false) // keep redrawing after engine has stopped



  g.d3Force("center", null);
  g.d3Force('charge').strength(-18);

  // fit to canvas when engine stops
  g.onEngineStop(() => g.zoomToFit());
  
})();

function getColor(index) {
  const colors = [
    "#8A2BE2", // Violet
    "#71C9CE",
    "#B4E380", // Green
    "#F6FB7A", // Yellow
    "#E3FDFD",
    "f0f1f2",
    "ffc800",
  ];
  return colors[index % colors.length];
}