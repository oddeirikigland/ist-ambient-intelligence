import React from "react";
import Clock from "react-clock";

class ClockComp extends React.Component {
  state = {
    date: new Date()
  };

  componentDidMount() {
    setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  render() {
    return (
      <div className="ClockComp">
        <Clock value={this.state.date} />
      </div>
    );
  }
}
export default ClockComp;
