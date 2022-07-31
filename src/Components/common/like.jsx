import React, { Component } from "react";

class Like extends React.Component {
  render() {
    let iconClass = this.getIconClass();
    return (
      <i
        onClick={() => this.props.favHandler(this.props.property)}
        className={iconClass}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }
  getIconClass() {
    let classes = this.props.property.liked
      ? "fa fa-heart m-2"
      : "fa fa-heart-o m-2";
    return classes;
  }
}

export default Like;
