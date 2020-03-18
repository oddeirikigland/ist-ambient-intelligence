import React from "react";
import P5Wrapper from "react-p5-wrapper";
import objectDetectionSketch from "./ObjectDetectionSketch";
import registerFaceSketch from "./registerFaceSketch"

function FaceRec() {
  return <P5Wrapper sketch={objectDetectionSketch} />;
}

export default FaceRec;
