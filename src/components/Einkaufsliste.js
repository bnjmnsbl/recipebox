import React from "react";
import Checkbox from "./Checkbox";

var index = 0;

class Liste extends React.Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };
  createCheckbox = this.createCheckbox.bind(this);

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = formSubmitEvent => {
    var removeItems = [];
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      removeItems.push(checkbox);
    }
    this.props.removeFromList(removeItems);
  };

  removeAll = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    this.props.clearList();
  };

  createCheckbox(label) {
    index++;
    return (
      <Checkbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={index}
      />
    );
  }
  createCheckboxes = () => this.props.liste.map(this.createCheckbox);

  render() {
    return (
      <div className="Einkaufsliste">
        <form>
          {this.createCheckboxes()}
          <div className="newItem" style={{whiteSpace:"nowrap"}}>
          <input type="text" value={this.props.newListItem} onChange={this.props.changeHandler} placeholder="weitere Zutat..."/>
            <button type="button" onClick={this.props.addItem}>+</button>  
          </div>
          <div className="btn-group">
            <button type="button"className="btn btn-default einkaufslisteButton" onClick={this.handleFormSubmit}>
              Erledigte löschen
            </button>
            <button type="button" className="btn btn-default einkaufslisteButton" onClick={this.removeAll}>
              Alle löschen
            </button>
          </div>
          
        </form>
      </div>
    );
  }
}

export default Liste;
