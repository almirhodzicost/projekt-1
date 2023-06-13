/*
THEME SWITCHER
====================================================================
*/

const themeToggle = (id) =>
{
    const themeToggle = document.querySelector(id);
    const themeTogglerIcon = "theme-toggler";
    const themeSwitcher = document.getElementById(themeTogglerIcon);
    const darkThemeName = "dark-theme";
    const localStorageThemeKey = "_setTheme";
    const iconDarkTheme = "moon-outline";
    const iconLightTheme = "sunny-outline";
    const ionIconAttribute = "name";
    const theme = localStorage.getItem(localStorageThemeKey);


// Read theme from local storage
//--------------------------------------------------------------------
    if (theme === iconLightTheme)
    {
        document.body.classList.remove(darkThemeName);
        themeToggle.setAttribute(ionIconAttribute, iconDarkTheme);
    }
    else
    {
        document.body.classList.add(darkThemeName);
        themeToggle.setAttribute(ionIconAttribute, iconLightTheme);
    }


// Set theme to local storage
//--------------------------------------------------------------------
    themeSwitcher.addEventListener("click", () => {

        document.body.classList.toggle(darkThemeName);

        if (document.body.classList.contains(darkThemeName))
        {
            localStorage.setItem(localStorageThemeKey, iconDarkTheme);
            themeSwitcher.setAttribute(ionIconAttribute, iconLightTheme);
        }
        else
        {
            localStorage.setItem(localStorageThemeKey, iconLightTheme);
            themeSwitcher.setAttribute(ionIconAttribute, iconDarkTheme);
        }
    });
};

export { themeToggle };