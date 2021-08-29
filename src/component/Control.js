import React, { Component } from "react";

class Control extends Component {
  // class 안에 포함되는 함수는 function 생략
  render() {
    console.log("Subject render");
    return (
      <ul>
      <ul><a href="/create" onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode('create');
      }.bind(this)}>create</a></ul>
      <ul><a href="/update" onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode('update');
      }.bind(this)}>update</a></ul>
      <ul><input type="button" value="delete"
      onClick={function(e){
        e.preventDefault();
        this.props.onChangeMode('delete');
      }.bind(this)}
      /></ul>

    </ul>
    );
  }
}

export default Control;
