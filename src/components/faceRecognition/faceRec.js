import React from "react";
import P5Wrapper from "react-p5-wrapper";
import faceDetectionSketch from "./faceDetectionSketch";
import registerFaceSketch from "./registerFaceSketch"

function FaceRec() {
  return <P5Wrapper sketch={faceDetectionSketch} />;
}

export default FaceRec;
