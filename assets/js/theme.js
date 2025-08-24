const DATA_THEME = 'data-theme';

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme){
    document.documentElement.setAttribute(DATA_THEME, theme);
    window.localStorage.setItem('theme', theme);
    console.log("setTheme: ", theme)
}

function toggleTheme() {
    let currentMode = document.documentElement.getAttribute(DATA_THEME);
    if (currentMode === 'dark') {
        setTheme('light')
    } else {
        setTheme('dark')
    }
}

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.textContent = "🌓";
    themeToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            toggleTheme();
        }
    });
}

const theme = getSystemTheme()
setTheme(theme)