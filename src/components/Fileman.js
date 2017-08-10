import data from './recipes.json';

module.exports = {
  fetchFile: function() {
    return data.table;
  },

  fetchNames: function() {
    return data.table.map(function(item) {
      return item.name
    });
}
  
};
/*
// Optional function for saving file to disk, but this needs node.js
obj.table.push({name: "Blumenkohlsuppe", id: 1})
var json = JSON.stringify(obj);
var writeFile = function() {
    fs.writeFile("rezepte.json", json, "utf8", function(){
    console.log("File written!");
    })
}; */
