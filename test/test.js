const search = require('../index.js');

//Init....
console.log("\n Searching for themes... \n");

search(results => {
    let themes = [],
        official = 0,
        thirdParty = 0;

    //Get search stats...
    results.map((item, index) => {
        let verify = (item.official) ? "official" : "third-party";
        let data = " --- butter-theme(" + verify + "): " + item.name  + " " + item.version + " [" + index + "]";
        themes.push(data);
        (item.official) ? official += 1  : thirdParty += 1;
        if(themes.length === index+1) {
            //Print stats ...
            console.log(" Results found:", official + " official,", thirdParty + " third-party,", themes.length + " total. \n");
            themes.map(i => console.log(i));
            console.log('\n');
        }
    });
});
