import React from "react";
const igel= require('./igel.svg')
const hase= require('./hase.svg')


function ListButton(props) {
  return (
    <button
      className="btn btn-lg navbar-btn pull-left"
      title="Einkaufsliste"
      onClick={props.one}
    >
      <span className="glyphicon glyphicon-shopping-cart" />
    </button>
  );
}

function NewButton(props) {
  return (
    <button
      className="btn btn-lg navbar-btn pull-right"
      title="Rezepte verwalten"
      onClick={props.two}
    >
      <span className="glyphicon glyphicon-edit pull-right" />
    </button>
  );
}


function MainLogo(props) {
  return (
    
    <div className="LogoContainer" style={{whiteSpace: "nowrap", display: "inline-block", float: "none"}}> 
    <img className="igelLogo" src={igel} alt='' title='Igel' height="50px"/>


    <a className="Logo" onClick={props.three}>Rezepte</a> 
      
    <img className="rabbitLogo" src={hase} title='' alt='' height="50px"/>    
    
      </div>
  )
}


const Header = props => {
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
  
    
      
    <ListButton one={props.one} />
          
     <MainLogo three={props.three}/> 
         
      <NewButton two={props.two} />
                    
      </nav>
    </div>
  );
};

export default Header;
