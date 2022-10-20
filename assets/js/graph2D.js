
  function draw2DGraph(id=null){

    (async () => {

    const gData = await  getGraphData()
    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode = null;

    const container = document.getElementById("graph-container");

    const g = ForceGraph();
    g(container)
      .graphData(gData)
      .nodeLabel("name")
      .minZoom(1)
      .maxZoom(5)
      .linkColor((link) => (highlightLinks.has(link) ?  "#FF530D" : "#568692"))
      .linkWidth((link) => (highlightLinks.has(link) ? 1 : 0.1))
      .onNodeHover((node) => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
          highlightNodes.add(node.id);
          node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
          node.links.forEach((link) => highlightLinks.add(link));
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
      .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;

        if (id == null && g.zoom() <= 1) {
            return 
        } 

        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.5
        ); // some padding

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        let color = "#2398ff";
        if (node.type == "tag") {
          color = "orange";
        }
        if (highlightNodes.has(node.id)) {
          color = "#FF530D";
        }

        ctx.fillStyle = color;
        ctx.fillText(label, node.x, node.y);
        
        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      })
      .nodePointerAreaPaint((node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions &&
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );
      })
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      });

    g.d3Force("center", null);
    g.d3Force('charge').strength(-20);

    // fit to canvas when engine stops
    g.onEngineStop(() => g.zoomToFit());

  })();

  }