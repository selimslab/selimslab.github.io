get_random_quote = async () =>{
    fetch("/assets/data/quotes.json", {headers:{     
            'Content-Type': 'application/json',
            'cache': "force-cache"
    }})
    .then(response => {
    return response.json();
    })
    .then(quotes => {
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById("random_quote").innerHTML = randomQuote;
    }
    );
}


