import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";


class Subject extends Component {
  // class 안에 포함되는 함수는 function 생략
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </nav>
    );
  }
}

// react가 갖고 있는 Component를 상속해서 클래스 만듦
class App extends Component {
  render() {
    return (
      // jsx 코드로 작성 -> create-react-app이 변환해줌
      <div className="App">
        <Subject title="WEB" sub="world wide web"></Subject>
        <Subject title="React" sub="frame"></Subject>
        <Nav></Nav>
      </div>
    );
  }
}

export default App;
