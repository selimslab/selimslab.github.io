
function setTheme() {
	var themeToggle = document.getElementById("themeToggle");
	animate(themeToggle, "flash");

	const theme = localStorage.getItem('theme');
	if (theme === "light") {
		document.documentElement.setAttribute('data-theme', 'light');
		themeToggle.innerText = "☀️"
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		themeToggle.innerText = "🌙"
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