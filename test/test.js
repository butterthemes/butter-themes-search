//Test...
var search = require('../index.js');

//Init....
console.log("\n Searching for themes... \n");

search(function(results) {

    var official = 0,
        thirdParty = 0;

    //Get search stats...
    var themes = results.map(function (item, index) {
        let verify = (item.official) ? "official" : "third-party";
        let data = " --- butter-theme(" + verify + "): " + item.name  + " " + item.version + " [" + index + "]";
        (item.official) ? official += 1  : thirdParty += 1;
        return data;
    });

    //Print stats ...
    console.log(" Results found:", official + " official,", thirdParty + " third-party,", themes.length + " total. \n");
    themes.forEach(i => console.log(i));
    console.log('\n');
});
