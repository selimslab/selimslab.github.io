function render3DGraph(){

    (async () => {
    const gData = await fetch("/assets/data/graph.json").then((response) =>
      response.json()
    );

    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode = null;

    const container = document.getElementById("graph");

    const g = ForceGraph3D();

    g(container)
      .graphData(gData)
      .nodeLabel("name")
      .linkWidth((link) => (highlightLinks.has(link) ? 1 : 0.1))
      .linkColor((link) => (highlightLinks.has(link) ?  "#FF530D" : "#568692"))
      .nodeColor(node => {
        return highlightNodes.has(node.id) ? "#FF530D" : getColor(node.group);
      })


  })();

}

function getColor(index) {
  const colors = [
    "#8A2BE2", // Violet
    "#71C9CE",
    "#B4E380", // Green
    "#F6FB7A", // Yellow
    "#E3FDFD"
  ];
  return colors[index % colors.length];
}