get_random_idea = async () =>{
    fetch("/assets/data/ideas.json", {headers:{     
            'Content-Type': 'application/json',
            'cache': "force-cache"
    }})
    .then(response => {
    return response.json();
    })
    .then(quotes => {
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let ideaSlot = ''
        document.getElementById("random_idea").innerHTML =  ideaSlot + randomQuote;
    }
    );
}


