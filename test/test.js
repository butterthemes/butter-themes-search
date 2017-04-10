const butterThemes = require('../index.js');

console.log(" Searching themes... \n");

butterThemes.search((results) => {
    let themes = [],
        official = [],
        thirdParty = [];
    //Get search stats...
    resuts.map((item, index) => {
        let verify = (item.official) ? "official" : "third-party";
        let data = " --- butter-theme(" + verify + "): " + item.name + " v:"item.version + " [" + index + "]";
        (item.official) ? official.push(index) : thirdParty.push(index);
        themes.push(data);
        
    });
    //Print stats ...
    console.log(" Results found:", official.length + " official,", thirdparty.length + " third-party,", themes.length + " total.");
    //Print results...
    results.map((theme) => console.log(theme));
});
