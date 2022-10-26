
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function get_todays_date(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date()
    return today.toLocaleDateString(undefined, options)
}

function get_todays_weekday(){
    const today = new Date()
    let weekday = days[today.getDay()]
    return weekday
}

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

    const today = get_todays_weekday()
    const last_seen = get('last_seen');
    if (last_seen !== today){
        // todo: rotate habits by one 
        set('last_seen', today)
    }

})();



