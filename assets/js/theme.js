
let moon = "<div class='moon' style='width:2rem; height:2rem'></div>"
let sun = "<div class='sun' style='width:2rem; height:2rem'></div>"


function setTheme() {
	var themeToggle = document.getElementById("themeToggle");

	const theme = localStorage.getItem('theme');
	if (theme === "light") {
		document.documentElement.setAttribute('data-theme', 'light');
		themeToggle.innerHTML = sun
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		themeToggle.innerHTML = moon
	}
}

setTheme()

function switchTheme() {
	let currentMode = document.documentElement.getAttribute('data-theme');
	if (currentMode === "dark") {
		window.localStorage.setItem('theme', 'light');
	} else {
		window.localStorage.setItem('theme', 'dark');
	}
	setTheme()
}