import React from "react";
import P5Wrapper from "react-p5-wrapper";

import registerFaceSketch from "./registerFaceSketch";

class FaceRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "name", showCamera: false };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    alert("It will now be taken pictures of you " + this.state.name);
    this.setState({ showCamera: true });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.showCamera ? (
          <P5Wrapper sketch={registerFaceSketch} />
        ) : (
          " "
        )}
      </div>
    );
  }
}

export default FaceRegister;
