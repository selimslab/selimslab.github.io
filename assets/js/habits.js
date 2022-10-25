
(async () => {
    const habits = await fetch("/assets/data/habits.json").then((response) =>response.json());
    console.log(habits)

})();


// const streak = localStorage.getItem('theme');

