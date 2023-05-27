
    /*
    Array ToDos
    ----------------------------------
    */

    const ToDos = [
        { id:1, duedate:"2023-05-20", title:"title1", description:"schwimmen", priority: 1, status:"done" },
        { id:2, duedate:"2023-05-19", title:"title2", description:"einkaufen", priority: 2, status:"done" },
        { id:3, duedate:"2023-05-15", title:"title33", description:"lernen", priority: 3, status:"done" },
        { id:4, duedate:"2023-05-13", title:"title4", description:"singen", priority: 4, status:"done" },
        { id:5, duedate:"2023-05-13", title:"title5", description:"spazieren", priority: 4, status:"done" }
    ];

    for (let i = 0; i < ToDos.length; i++) {
        console.log(ToDos[i]);
    }

    /*
    THEME SWITCHER
    ====================================================================
    */
    const darkThemeName = "dark-theme";
    const themeToggler = "theme-toggler";
    const localStorageThemeKey = "_setTheme";
    const iconDarkTheme = "moon-outline";
    const iconLightTheme = "sunny-outline";
    const ionIconAttribute = "name";

    const themeSwitcher = document.getElementById(themeToggler);
    const theme = localStorage.getItem(localStorageThemeKey);

    // Read theme from local storage
    //----------------------------------
    if (theme === iconLightTheme)
        {
            document.body.classList.remove(darkThemeName);
            themeSwitcher.setAttribute(ionIconAttribute, iconDarkTheme);
        }
    else
        {
            document.body.classList.add(darkThemeName);
            themeSwitcher.setAttribute(ionIconAttribute, iconLightTheme);
        }

    // Set theme to local storage
    //----------------------------------
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

