import React from "react";

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
      onlist: false,
      zutaten: this.props.zutaten || [""],
      zubereitung: this.props.zubereitung || [""]
    };
  }

  cleanup = () => {
    this.state.zutaten.map((zutat, i) => {
      if (zutat.einheit === undefined) {
        zutat.einheit = null;
      }
      if (zutat.menge === undefined) {
        zutat.menge = null;
      }
      return this.state.zutaten;
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.cleanup();

    if (this.state.name === "") {
      alert("Bitte gib einen Namen ein!");
    } 
    if (this.props.IDkey === undefined) {

 this.props.addNewRecipe(this.state)      
    } else {
     this.props.updateRecipe(this.state, this.props.IDkey);
    }
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleZutatenChange = key => e => {
    const newZutaten = this.state.zutaten.map((zutat, si) => {
      if (key !== si) return zutat;
      return { ...zutat, name: e.target.value };
    });
    this.setState({ zutaten: newZutaten });
  };

  handleMengeChange = key => e => {
    const newMenge = this.state.zutaten.map((zutat, si) => {
      if (key !== si) return zutat;
      return { ...zutat, menge: e.target.value };
    });
    this.setState({ zutaten: newMenge });
  };

  handleEinheitChange = key => e => {
    const newEinheit = this.state.zutaten.map((zutat, si) => {
      if (key !== si) return zutat;
      return { ...zutat, einheit: e.target.value };
    });
    this.setState({ zutaten: newEinheit });
  };

  handleZubereitungChange = key => e => {
    const newZubereitung = this.state.zubereitung;
    newZubereitung[key] = e.target.value;

    this.setState({
      zubereitung: newZubereitung
    });
  };

  handleAddField = () => {
    this.setState({
      zutaten: this.state.zutaten.concat({ name: "" })
    });
  };

  handleAddZubereitung = () => {
    var newZubereitung = this.state.zubereitung;
    newZubereitung.push("");
    this.setState({
      zubereitung: newZubereitung
    });
  };

  handleRemoveField = idx => () => {
    this.setState({
      zutaten: this.state.zutaten.filter((s, sidx) => idx !== sidx)
    });
  };

  handleRemoveZubereitung = idx => () => {
    this.setState({
      zubereitung: this.state.zubereitung.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
    return (
      <div className="newRecipe">
        <h2>Neues Rezept</h2>
        <form onSubmit={this.handleSubmit}>
          <h3>Name:</h3>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            style={{ width: "255px" }}
          />
          <h3>Zutaten:</h3>
          {this.state.zutaten.map((zutat, i) =>
            <div style={{ whiteSpace: "nowrap" }} key={i}>
              <input
                type="number"
                value={zutat.menge || ""}
                placeholder="100"
                onChange={this.handleMengeChange(i)}
                style={{ width: "50px" }}
                key={"a" + i}
              />

              <input
                type="text"
                value={zutat.einheit || ""}
                placeholder="Einheit"
                onChange={this.handleEinheitChange(i)}
                style={{ width: "50px" }}
                key={"b" + i}
              />
              <input
                type="text"
                value={zutat.name}
                placeholder={"Zutat #" + (i + 1)}
                onChange={this.handleZutatenChange(i)}
                key={"c" + i}
              />
              <button
                type="button"
                onClick={this.handleRemoveField(i)}
                key={"bButton" + i}
              >
                x
              </button>
            </div>
          )}
          <button type="button" onClick={this.handleAddField}>
            Neue Zutat
          </button>
          <h3>Zubereitung:</h3>
          {this.state.zubereitung.map((zutat, i) =>
            <div style={{ whiteSpace: "nowrap" }}>
              <input
                type="text"
                style={{ width: "255px" }}
                value={zutat}
                placeholder={"Schritt #" + (i + 1)}
                onChange={this.handleZubereitungChange(i)}
                key={"d" + i}
              />
              <button
                type="button"
                onClick={this.handleRemoveZubereitung(i)}
                key={"aButton" + i}
              >
                x
              </button>
            </div>
          )}
          <button type="button" onClick={this.handleAddZubereitung}>
            Neuer Schritt
          </button>
          <br />
          <button type="submit" className="saveButton">
            Speichern
          </button>
        </form>
      </div>
    );
  }
}

export default NewRecipe;
