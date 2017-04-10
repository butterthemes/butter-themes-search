const honeyButter = require('../index.js');

console.log(" @honeyButter is searching... \n");

honeyButter.search((themes) => {
    console.log(" @honeyButter found: " + themes.length + " themes.");
    themes.map( (item, index) => {
        let verify = (item.official) ? "official" : "third-party";
        console.log(" --- butter-theme("+ verify +"):",item.name, item.version, "["+index+"]");
    });
});
