get_random_post = async () =>{
    fetch("/assets/data/urls.json", {headers:{     
            'Content-Type': 'application/json',
            'cache': "force-cache"
    }})
    .then(response => {
    return response.json();
    })
    .then(urls => {
        let randomLink = urls[Math.floor(Math.random() * urls.length)];
        location.href = randomLink;
    }
    );
}

