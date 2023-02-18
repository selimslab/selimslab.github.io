
function setTheme() {
	const theme = localStorage.getItem('theme');
	if (theme === "light") {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
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