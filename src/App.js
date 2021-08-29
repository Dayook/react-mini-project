import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TOC from "./component/TOC";
import ReadContent from "./component/ReadContent";
import CreateContent from "./component/CreateContent";
import UpdateContent from "./component/UpdateContent";
import Subject from "./component/Subject";
import Control from "./component/Control";

// react가 갖고 있는 Component를 상속해서 클래스 만듦
class App extends Component {
  constructor(props) {
    super(props);
    // max_content_id : UI에 영향 안주므로 state값으로 할 필요 없음. 불필요한 렌더링 발생
    this.max_content_id = 3;
    this.state = {
      mode: "read",
      subject: { title: "WEB", sub: "World Wide Web!" },
      selected_content_id: 2,
      welcome: { title: "Welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "javaScript", desc: "javaScript is for interactive" },
      ],
    };
  }
  // state값 변경되면 render 함수 다시 호출됨
  // render -> 어떤 HTML값을 그릴 것인지 결정.
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // setState를 통해 새로운 content값 추가할 것
            // add content to this.state.contents
            this.max_content_id = this.max_content_id + 1;
            // push : 원본 변경
            // concat : 원본 변경 X
            // this.state.contents.push({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });
            // concat과 같은 방식
            var _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            // 성능 개선 시 더 효율적인 방법임
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });

            console.log(_title, _desc);
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            // 원본을 복사한 새로운 배열 만들어짐
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    console.log("App render");

    return (
      // jsx 코드로 작성 -> create-react-app이 변환해줌
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        {/* <header>
          <h1>
            <a
              href="/"
              onClick={function (e) {
                console.log('event in', this);
                // this -> component 자체를 가리킴
                // 해당 함수 안에서는 this에 아무 값도 세팅돼있지 않음. 따라서 bind를 써줘야함
                alert("hi");
                // 기본적인 동작들 사용하지 못하도록 - preventDefault
                e.preventDefault();
                // 알아채지 못함
                this.state.mode = "welcome";
                this.setState({
                  mode: "read",
                });
              }.bind(this)}
            >
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
        </header> */}
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("sure?")) {
                var i = 0;
                var _contents = Array.from(this.state.contents);
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted");
              }
            }
            this.setState({
              mode: _mode,
            });
          }.bind(this)}
        ></Control>
        // 가변적으로 바뀔 수 있도록 변수
        {this.getContent()}
      </div>
    );
  }
}

export default App;
