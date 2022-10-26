

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function get_todays_date(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date()
    return today.toLocaleDateString(undefined, options)
}

function get_the_weekday(date){
    return days[date.getDay()]
}

function get_the_first_day_of_this_year(){
    var d = new Date(new Date().getFullYear(), 0, 1);
    return get_the_weekday(d)
}

function get_the_last_day_of_this_year(){
    var d = new Date(new Date().getFullYear(), 11, 31);
    return get_the_weekday(d)
}

