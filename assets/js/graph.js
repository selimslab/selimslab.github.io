async function getGraphData(id=null){
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
    return gData
  }