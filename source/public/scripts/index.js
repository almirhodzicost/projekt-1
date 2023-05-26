
    /*
    Array ToDos
    ----------------------------------
    */
    const ToDos = [
        { id:1, duedate:"2023-05-20", title:"title1", description:"schwimmen", priority: 1, status:"done" },
        { id:2, duedate:"2023-05-19", title:"title2", description:"einkaufen", priority: 2, status:"done" },
        { id:3, duedate:"2023-05-15", title:"title3", description:"lernen", priority: 3, status:"done" },
        { id:4, duedate:"2023-05-13", title:"title4", description:"singen", priority: 4, status:"done" },
        { id:5, duedate:"2023-05-13", title:"title5", description:"spazieren", priority: 4, status:"done" }
    ];


    /*
    Theme Switcher
    ----------------------------------
     */
    const themeSwitcher = document.getElementById("theme-toggler");

    themeSwitcher.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            themeSwitcher.setAttribute("name", "sunny-outline");
        } else {
            themeSwitcher.setAttribute("name", "moon-outline");
        }
    });

