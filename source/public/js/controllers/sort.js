let list = [
    { name: 'Charlie' },
    { name: 'Alice' },
    { name: 'Bob' },
];

list.sort((a, b) => {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
});

console.log(list);