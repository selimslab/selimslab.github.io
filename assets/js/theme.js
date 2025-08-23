const THEME = 'theme';
const DATA_THEME = 'data-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const CLASS_SUN = 'sun';
const CLASS_MOON = 'moon';
const themeToggle = document.getElementById("themeToggle");
themeToggle.textContent = "🌓";

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

function setTheme(theme){
    document.documentElement.setAttribute(DATA_THEME, theme);
    window.localStorage.setItem(THEME, theme);
}

function toggleTheme() {
    let currentMode = document.documentElement.getAttribute(DATA_THEME);
    if (currentMode === THEME_DARK) {
        setTheme(THEME_DARK)
    } else {
        setTheme(THEME_LIGHT)
    }
}

if (themeToggle) {
    themeToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            toggleTheme();
        }
    });
}

const theme = getSystemTheme()
setTheme(theme)