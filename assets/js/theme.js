function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme){
    const DATA_THEME = 'data-theme';
    document.documentElement.setAttribute(DATA_THEME, theme);
    window.localStorage.setItem('theme', theme);
    console.log("setTheme: ", theme)
}

const theme = getSystemTheme()
setTheme(theme)