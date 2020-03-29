import React, { useContext } from "react";
import { Link } from "react-router-dom";
import P5Wrapper from "react-p5-wrapper";
import faceDetectionSketch from "./faceDetectionSketch";
import { PersonContext } from "../../PersonContextProvider";

import "./faceRec.css";

function FaceRec() {
  const context = useContext(PersonContext);
  return (
    <div className="faceRec-wrapper">
      <P5Wrapper sketch={faceDetectionSketch} setPerson={context.setPerson} />
      <Link className="register-button" to="/register">
        Register your face
      </Link>
    </div>
  );
}

export default FaceRec;
