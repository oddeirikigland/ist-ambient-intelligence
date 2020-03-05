import React from "react";
import P5Wrapper from "react-p5-wrapper";
import objectDetectionSketch from "./ObjectDetectionSketch";

function FaceRec() {
  return <P5Wrapper sketch={objectDetectionSketch} />;
}

export default FaceRec;
