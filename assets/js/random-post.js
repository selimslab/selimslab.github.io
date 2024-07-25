get_random_post = async () =>{
    var dice = document.getElementById("dice");
    animate(dice, "shakex");

    fetch("/assets/data/urls.json", {headers:{     
            'Content-Type': 'application/json',
            'cache': "force-cache"
    }})
    .then(response => {
    return response.json();
    })
    .then(urls => {
        location.href = get_random_item(urls);
    }
    );
}


