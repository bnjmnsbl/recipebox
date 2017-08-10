import React from "react";
import Dropdown from "react-dropdown";

function Title(props) {
  return (
    <div className="title">
      <h2>
        {props.name}
      </h2>
    </div>
  );
}

function Zutaten(props) {
  return (
    <div className="zutaten">
      <h3>
        Zutaten
        <small>
          <button
            className="btn btn-default btn-sm"
            type="submit"
            title="Auf Einkaufsliste"
            onClick={props.onClick.bind(null, props.zutaten)}
          >
            <span className="glyphicon glyphicon-shopping-cart" />
          </button>
        </small>
      </h3>
      <ul>
        {props.zutaten.map(function(item, index) {
          var zutatenstring = "";
          if (item.menge !== null) {
            zutatenstring += item.menge
          }
          if (item.einheit !== null) {zutatenstring += item.einheit }
          
          zutatenstring += " ";
          zutatenstring += item.name
          
          return (
            <li key={index}>
              {zutatenstring}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Zubereitung(props) {
  return (
    <div className="zubereitung">
      <h3>Zubereitung</h3>
      <ol>
        {props.zubereitung.map(function(item, i) {
          return (
            <li key={i}>
              {item}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

class Rezept extends React.Component {
  
  render() {
    return (
      <div>
        <Dropdown
          options={this.props.options}
          onChange={this.props._onSelect}
          value={this.props.selected}
          placeholder="Rezept auswählen"
        />
        <Title name={this.props.name} />
        <Zutaten zutaten={this.props.zutaten} onClick={this.props.addToList} />
        <Zubereitung zubereitung={this.props.zubereitung} />
      </div>
    );
  }
}

module.exports = Rezept;
