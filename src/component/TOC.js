class TOC extends Component {
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
