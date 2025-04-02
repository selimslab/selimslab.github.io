const THEME = 'theme';
const DATA_THEME = 'data-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const CLASS_SUN = 'sun';
const CLASS_MOON = 'moon';
const themeToggle = document.getElementById("themeToggle");

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

function setTheme() {
    const theme = localStorage.getItem(THEME) || getSystemTheme();
    if (theme === THEME_LIGHT) {
        document.documentElement.setAttribute(DATA_THEME, THEME_LIGHT);
        if (themeToggle) {
            themeToggle.classList.remove(CLASS_MOON);
            themeToggle.classList.add(CLASS_SUN);
        }
    } else {
        document.documentElement.setAttribute(DATA_THEME, THEME_DARK);
        if (themeToggle) {
            themeToggle.classList.remove(CLASS_SUN);
            themeToggle.classList.add(CLASS_MOON);
        }
        // themeToggle.textContent = "🌔";
    }
}

setTheme();

function switchTheme() {
    let currentMode = document.documentElement.getAttribute(DATA_THEME);
    if (currentMode === THEME_DARK) {
        window.localStorage.setItem(THEME, THEME_LIGHT);
    } else {
        window.localStorage.setItem(THEME, THEME_DARK);
    }
    setTheme();
}

themeToggle.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      switchTheme();
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem(THEME)) {
        setTheme();
    }
});

