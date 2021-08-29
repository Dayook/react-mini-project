import React, { Component } from "react";

class Subject extends Component {
  // class 안에 포함되는 함수는 function 생략
  render() {
    console.log("Subject render");
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
