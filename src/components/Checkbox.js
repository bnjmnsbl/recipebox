import React, { Component} from "react";

class Checkbox extends Component {
  state = {
      isChecked: false
    };
  
	
  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(label);
  };

   getStyle() {
   return {

    textDecoration: this.state.isChecked ? 'line-through' : 'none'
   }
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label style={this.getStyle()}>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onClick={this.toggleCheckboxChange}
          />

          {label}
        </label>
      </div>
    );
  }
}

/*Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};*/

export default Checkbox;
