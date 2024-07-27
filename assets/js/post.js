
const dice = document.getElementById("dice");

getRandomPage = async () =>{
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

dice.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      getRandomPage();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'p' || e.key === 'P') {
       getRandomPage();
    }
});
