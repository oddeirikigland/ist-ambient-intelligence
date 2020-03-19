import React from "react";
import { Link } from "react-router-dom";
import P5Wrapper from "react-p5-wrapper";

import faceDetectionSketch from "./faceDetectionSketch";

function FaceRec() {
  return (
    <div>
      <P5Wrapper sketch={faceDetectionSketch} />
      <Link to="/register">Register your face</Link>
    </div>
  );
}

export default FaceRec;
