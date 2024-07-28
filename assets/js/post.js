
const dice = document.getElementById("dice");
let cachedUrls = null;

getRandomPage = async () =>{    
    if (!cachedUrls) {
        try {
            const response = await fetch("/assets/data/urls.json", {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            cachedUrls = await response.json();
        } catch (error) {
            console.error("Error fetching urls:", error);
            return;
        }
    }

    animate(dice, "shakex");
    location.href = get_random_item(cachedUrls);

}

dice.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      getRandomPage();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && (e.key === 'p' || e.key === 'P')) {
       getRandomPage();
    }
});
