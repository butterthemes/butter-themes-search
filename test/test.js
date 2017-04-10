const search = require('../index.js');

//Init....
console.log(" Searching for themes... \n");

search((results) => {
    let themes = [],
        official = [],
        thirdParty = [];

    //Get search stats...
    results.map((item, index) => {
        let verify = (item.official) ? "official" : "third-party";
        let data = " --- butter-theme(" + verify + "): " + item.name  + " " + item.version + " [" + index + "]";
        (item.official) ? official.push(index) : thirdParty.push(index);
        themes.push(data);

    });

    //Print stats ...
    console.log(" Results found:", official.length + " official,", thirdParty.length + " third-party,", themes.length + " total. \n");

    //Print results...
    themes.map((i) => console.log(i));
});
