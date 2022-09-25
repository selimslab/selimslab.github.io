
function setTheme() {
	const theme = localStorage.getItem('theme');
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
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