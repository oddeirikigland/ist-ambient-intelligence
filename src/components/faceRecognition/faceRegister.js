import React from "react";
import P5Wrapper from "react-p5-wrapper";

import registerFaceSketch from "./registerFaceSketch";

class FaceRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "name",
      showCamera: false,
      numberOfPictures: "100",
      picturesTaken: 0,
      picturesTakenStatus: 0
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberOfPicturesChange = this.handleNumberOfPicturesChange.bind(
      this
    );
    this.handlePictureTaken = this.handlePictureTaken.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNumberOfPicturesChange(event) {
    this.setState({ numberOfPictures: event.target.value });
  }

  handleSubmit(event) {
    alert("It will now be taken pictures of you " + this.state.name);
    this.setState({ showCamera: true });
    event.preventDefault();
  }

  handlePictureTaken() {
    this.setState({
      picturesTaken: this.state.picturesTaken + 1,
      picturesTakenStatus: parseInt(
        (this.state.picturesTaken / parseInt(this.state.numberOfPictures)) * 100
      )
    });
  }

  render() {
    return (
      <div>
        {this.state.showCamera ? (
          <div>
            <h3>Status: {this.state.picturesTakenStatus} %</h3>
            <P5Wrapper
              sketch={registerFaceSketch}
              nameToRegister={this.state.name}
              picturesToTake={parseInt(this.state.numberOfPictures)}
              picturesTaken={this.state.picturesTaken}
              handlePictureTaken={this.handlePictureTaken}
            />
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </label>
            <label>
              Number of pictures:
              <select
                value={this.state.numberOfPictures}
                onChange={this.handleNumberOfPicturesChange}
              >
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="100">100</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    );
  }
}

export default FaceRegister;
