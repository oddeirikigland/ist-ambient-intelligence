import React, { useContext } from "react";
import { Link } from "react-router-dom";
import P5Wrapper from "react-p5-wrapper";

import faceDetectionSketch from "./faceDetectionSketch";
import { PersonContext } from "../../PersonContextProvider";

function FaceRec() {
  const context = useContext(PersonContext);
  return (
    <div>
      <P5Wrapper sketch={faceDetectionSketch} setPerson={context.setPerson} />
      <Link to="/register">Register your face</Link>
    </div>
  );
}

export default FaceRec;
