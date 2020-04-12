import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

export default class AwesomeSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <SyncLoader
          css={override}
          size={44}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
