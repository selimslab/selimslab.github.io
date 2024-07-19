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

  })();

}