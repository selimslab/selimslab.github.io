get_random_idea = async () =>{
    fetch("/assets/data/ideas.json", {headers:{     
            'Content-Type': 'application/json',
            'cache': "force-cache"
    }})
    .then(response => {
    return response.json();
    })
    .then(quotes => {
        let randomQuote = "\"" + get_random_item(quotes) + "\""
        document.getElementById("random_idea").innerHTML =   randomQuote;
    }
    );
}


