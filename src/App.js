import React, { Component } from "react";
import fileman from "./components/Fileman";
import Rezept from "./components/Components";
import Header from "./components/Header";
import Liste from "./components/Einkaufsliste";
import ManageRecipes from "./components/Manage";

var obj =
  JSON.parse(localStorage.getItem("savedRecipes")) || fileman.fetchFile();

var options = (function() {
  var optArr = [];
  obj.map(item => {
    optArr.push(item.name);
    return optArr;
  });
  return optArr;
})();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*** VIEW CONTROLS ***/
      viewMain: true,
      viewList: false,
      viewNew: false,
      /*** ***/
      options: options,
      selected: options[0],
      name: "",
      zutaten: [],
      zubereitung: [],
      einkaufsliste: [],
      newListItem: "",
      obj: obj
    };

    this._onSelect = this._onSelect.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: obj[0].id,
      name: obj[0].name,
      zutaten: obj[0].zutaten,
      zubereitung: obj[0].zubereitung,
    });
  }

  RecipeControl = () => {
    this.setState({
      viewMain: false,
      viewList: false,
      viewNew: true
    });
  }

  ListControl = () => {
    this.setState({
      viewMain: false,
      viewList: true,
      viewNew: false
    });
  }

  MainControl = () => {
    this.setState({
      viewMain: true,
      viewList: false,
      viewNew: false
    });
  };

  _onSelect(option) {
    var index = options.indexOf(option.label);

    this.setState({
      selected: option,
      onlist: obj[index].onlist,
      name: obj[index].name,
      zutaten: obj[index].zutaten,
      zubereitung: obj[index].zubereitung
    });
  }

  removeFromList = items => {
    var array = this.state.einkaufsliste;
    items.forEach(function(item) {
      var index=array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    });
    this.setState({
      einkaufsliste: array
    });
  };

  clearList = () => {
    obj.map(item => {
      item.onlist = false;
      return item.onlist;
      
    });

    this.setState({
      onlist: false,
      einkaufsliste: []
    });
  };

  addToList() {
    if (this.state.onlist) {
      alert("ist bereits auf Liste!");
    } else {
      var newList = this.state.einkaufsliste.concat(
        this.state.zutaten.map(function(item) {
          return item.name;
        })
      );

      this.setState(
        {
          onlist: true,
          einkaufsliste: newList
        },
        () => {
          console.log(" Einkaufsliste: " + this.state.einkaufsliste);
        }
      );
    }
  }

  addItem = () => {
    this.setState({
      einkaufsliste: this.state.einkaufsliste.concat(this.state.newListItem)
    });
  };

  listItemChangeHandler = e => {
    var item = e.target.value;
    this.setState({
      newListItem: item
    });
  };

  addNewRecipe = recipe => {
    console.log("Füge neues Rezept ein");
    recipe.id = obj.length - 1;
    console.log("Neue ID ist" + recipe.id);
    obj.push(recipe);
    options.push(recipe.name);
    console.log(options);
    this.setState({ options: options });

  localStorage.setItem("savedRecipes", JSON.stringify(obj));
    localStorage.setItem("savedNames", JSON.stringify(options));
  };

  updateRecipe = (recipe, keyID) => {
    obj[keyID].name = recipe.name;
    obj[keyID].zutaten = recipe.zutaten;
    obj[keyID].zubereitung = recipe.zubereitung;
    options.push(recipe.name);
    localStorage.setItem("savedRecipes", JSON.stringify(obj));
    localStorage.setItem("savedNames", JSON.stringify(options));
  };

	deleteRecipe = keyID => {
      console.log("Deleting: " + obj[keyID].name )
      obj.splice(keyID, 1);
      console.dir(obj)
      
      var newOptions =this.state.options; 
      
      newOptions.splice(keyID, 1);
      
      options = newOptions;
      
      this.setState({
      name: obj[0].name,
      zutaten: obj[0].zutaten,
      zubereitung: obj[0].zubereitung,
      selected: options[0],
        obj: obj,
        options: newOptions
      })
        localStorage.setItem("savedRecipes", JSON.stringify(obj));
    localStorage.setItem("savedNames", JSON.stringify(options));
  
    };

  render() {
    var view = this.state.viewMain
      ? <Rezept
          options={this.state.options}
          obj={this.state.obj}
          _onSelect={this._onSelect}
          addToList={this.addToList}
          selected={this.state.selected}
          name={this.state.name}
          zutaten={this.state.zutaten}
          zubereitung={this.state.zubereitung}
        />
      : this.state.viewList
        ? <Liste
            liste={this.state.einkaufsliste}
            removeFromList={this.removeFromList}
            clearList={this.clearList}
            addItem={this.addItem}
            newListItem={this.state.newListItem}
            changeHandler={this.listItemChangeHandler}
          />
        : <ManageRecipes
            addNewRecipe={this.addNewRecipe}
            updateRecipe={this.updateRecipe}
            deleteRecipe={this.deleteRecipe}
            recipeNames={this.state.options}
            obj={this.state.obj}
          />;
    return (
      <div className="App">
        <Header
          one={this.ListControl}
          two={this.RecipeControl}
          three={this.MainControl}
        />
        {view}
      </div>
    );
  }
}

export default App;
