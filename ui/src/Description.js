import React, { Component } from "react";

class Description extends Component {
  state = {
    value: "Click to edit description",
    isInEditMode: false,
  };

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    });
  };

  updateComponentValue = () => {
    this.setState({
      isInEditMode: false,
      value: this.refs.textInput.value,
    });
  };

  renderEditView = () => {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.state.value}
          ref="textInput"
          maxLength={1024}
        />
        <button onClick={this.changeEditMode}>x</button>
        <button onClick={this.updateComponentValue}>Save</button>
      </div>
    );
  };

  renderDefaultView = () => {
    return <div onClick={this.changeEditMode}>{this.state.value}</div>;
  };

  render() {
    return this.state.isInEditMode
      ? this.renderEditView()
      : this.renderDefaultView();
  }
}

export default Description;
