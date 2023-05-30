
    /*
    Array ToDos
    ----------------------------------
    */

    const ToDos = [
        { id:1, duedate:"2023-05-20", title:"Vanessa", description:"In die Badi, Bier kaufen", priority: 1, status:"done" },
        { id:2, duedate:"2023-05-19", title:"Mamma", description:"Milch kaufen", priority: 2, status:"done" },
        { id:3, duedate:"2023-05-15", title:"Schule", description:"JavaScript lernen", priority: 3, status:"done" },
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

    const itemsBox = document.createElement("ToDoBox");

    for (let i = 0; i < ToDos.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="items">
          <div class="table">
            <div>`+ToDos[i].duedate+`<br>`+ToDos[i].status+`</div>
            <div>`+ToDos[i].title+`<br>`+ToDos[i].description+`</div>
            <div>`+ToDos[i].priority+`<br>edit</div>
          </div>
        </div>
        <hr />`;
        itemsBox.appendChild(div);
    }

    const container = document.getElementById("ToDoBox");
    container.appendChild(itemsBox);