

function get(key){
    return localStorage.getItem(key)
}

function set(key, val){
    localStorage.setItem(key, val)
}

function toggle_day(day){
    let val = get(day) 
    val = "1" ? val == "0" : "0"
    set(day, val)
}


(async () => {
    const habits = await fetch("/assets/data/habits.json").then((response) =>response.json());
    console.log(habits)

    const ok = "✅"
    const nok = "❌"

    console.log(get_todays_date())

    const todays_date = new Date()
    const weekday = get_the_weekday(todays_date)
    const last_seen = get('last_seen');
    if (last_seen !== weekday){
        // todo: rotate habits by one 
        set('last_seen', weekday)
    }

})();



