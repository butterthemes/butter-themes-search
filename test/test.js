const honeyButter = require('../index.js');

console.log(" @honeyButter is searching... \n");

honeyButter.search((themes) => {
    console.log(" @honeyButter found: " + themes.length + " themes.");
    themes.map( (item, index) => console.log(" --- butter-theme:",item.name, item.version, "["+index+"]"));
});
