import React, { Component } from "react";

class TOC extends Component {
  // class 안에 포함되는 함수는 function 생략
  render() {
    var lists = [];
    var data = this.props.data;
    console.log(data);
    console.log(data.length);
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            data-id={data[i].id}
            href={"/content/" + data[i].id}
            onClick={function (id, e) {
              // 다른 페이지로 가지 않도록
              e.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
