import React from "react";
import NewRecipe from "./Input";

function RecipeList(props) {
  return (
    <div>
      <h2>Rezepte verwalten</h2>
      
        <button type="button" className="btn btn-default" onClick={props.addNewRecipe}>Neues Rezept</button>   {props.recipeNames.map((item, key) =>
            <div className="editRecipeList">
              <small>
                <button
                className="btn btn-default"
                  type="button"
                  key={"b"+ key}
                  title="Rezept bearbeiten"
                  onClick={() => {
                    props.handleEditClick(key);
                  }}
                >
                  <span className="glyphicon glyphicon-edit" />
                </button>
                <button
                  className="btn btn-default"
                  type="button"
                  key={"a" + key}
                  title="Rezept löschen"
                  onClick={() => {
                    props.handleRemoveClick(key);
                  }}
                >
                  <span className="glyphicon glyphicon-remove" />
                </button>
                
              </small>  
	                          <p key={key}>
                {item}
              </p>
      
              
                                   
            </div>
          )}
        
      </div>
    
  );
}


class ManageRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      createNew: false,
      activeRecipe: 1
    };
  }

  handleEditClick = IDkey => {
    console.log("Editier mit Key: " + IDkey ) 
    this.setState({
      showList: !this.state.showList,
      createNew: false,
      activeRecipe: IDkey
    })
  };

handleRemoveClick = IDkey => {
  
  this.props.deleteRecipe(IDkey)
}

addNewRecipe = () => {
  this.setState({
    showList: false,
  createNew: true

  })
}

  render() {
    var view = this.state.showList
      ? <RecipeList
          recipeNames={this.props.recipeNames}
          handleEditClick={this.handleEditClick}
          handleRemoveClick={this.handleRemoveClick}
		addNewRecipe={this.addNewRecipe}
        />
      : this.state.createNew ? 
        
        <NewRecipe name={""} zutaten={[""]} zubereitung={[""]} addNewRecipe={this.props.addNewRecipe}/>:
        <NewRecipe 
          IDkey={this.state.activeRecipe}
          name={this.props.obj[this.state.activeRecipe].name}
          zutaten={this.props.obj[this.state.activeRecipe].zutaten} 
          zubereitung={this.props.obj[this.state.activeRecipe].zubereitung}
          updateRecipe={this.props.updateRecipe}
          addNewRecipe={this.props.addNewRecipe}
          />;
    return (
      <div>
        {view}
      </div>
    );
  }
}

export default ManageRecipes;
