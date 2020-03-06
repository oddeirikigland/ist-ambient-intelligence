import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as faceapi from "face-api.js";

import oddi from "./faces/oddi";
import ingeboss from "./faces/ingeboss";
import lysbrytern from "./faces/lysbrytern";
const persons = [oddi, ingeboss, lysbrytern];

const MODEL_URL = "/models";
const HEIGHT = 200;
const WIDTH = HEIGHT * 1.7778;
const TEXT_SIZE = 15;
const SHOW_DETECTION_DATA = false;
const cameraOperations = {
  REGISTER_PERSON: "register_person",
  RECOGNICE_PERSON: "recognice_person"
};
let registeredPictures = 0;
let personDescriptors = [];

// Options for program
const PICTURES_TO_TAKE = 10;
let cameraOperation = cameraOperations.RECOGNICE_PERSON;
let nameToRegister = "new_name";

const loadFaceDescriptors = () => {
  const faceDescriptor = name => faceapi.LabeledFaceDescriptors.fromJSON(name);
  return persons.map(person => faceDescriptor(person));
};

const handleSaveToPC = (jsonData, filename) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};

const get_expression_value = raw_expressions => {
  const copiedExpression = raw_expressions;
  const expressions = Object.keys(copiedExpression).map(key => {
    const value = copiedExpression[key];
    return value;
  });
  const max = Math.max(...expressions);
  return Object.keys(copiedExpression).filter(key => {
    return copiedExpression[key] === max;
  })[0];
};

export default function sketch(p) {
  let capture = null;
  let cocossdModel = null;

  let cocoDrawings = [];
  let faceDrawings = [];

  function showCocoSSDResults(results) {
    cocoDrawings = results;
  }

  function showFaceDetectionData(data) {
    faceDrawings = data;
  }

  p.setup = async function() {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    p.createCanvas(WIDTH, HEIGHT);
    const constraints = {
      video: {
        mandatory: {
          minWidth: WIDTH,
          minHeight: HEIGHT
        },
        optional: [{ maxFrameRate: 40 }]
      },
      audio: false
    };

    capture = p.createCapture(constraints, () => {});

    capture.id("video_element");
    capture.size(WIDTH, HEIGHT);
    capture.hide();

    cocoSsd
      .load()
      .then(model => {
        try {
          cocossdModel = model;
        } catch (e) {
          console.log(e);
        }
      })
      .catch(e => {
        console.log("Error occured : ", e);
      });
  };

  p.draw = async () => {
    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    cocoDrawings.map(drawing => {
      if (drawing) {
        p.textSize(TEXT_SIZE);
        p.strokeWeight(1);
        const textX = drawing.bbox[0] + drawing.bbox[2];
        const textY = drawing.bbox[1] + drawing.bbox[3];

        const confidenetext = "Confidence: " + drawing.score.toFixed(1);
        const textWidth = p.textWidth(confidenetext);

        const itemTextWidth = p.textWidth(drawing.class);
        p.text(drawing.class, textX - itemTextWidth - 10, textY - 50);

        p.text(confidenetext, textX - textWidth - 10, textY - 10);
        p.strokeWeight(4);
        p.stroke("rgb(100%,100%,100%)");
        p.rect(
          drawing.bbox[0],
          drawing.bbox[1],
          drawing.bbox[2],
          drawing.bbox[3]
        );
      }
    });

    faceDrawings.map(drawing => {
      if (drawing) {
        p.textSize(TEXT_SIZE);
        p.strokeWeight(1);

        const textX = drawing.detection.box._x + drawing.detection.box._width;
        const textY = drawing.detection.box._y + drawing.detection.box._height;

        const confidencetext = "Gender: " + drawing.gender;
        const textWidth = p.textWidth(confidencetext);
        p.text(confidencetext, textX - textWidth - 10, textY - 60);

        const agetext = "Age: " + drawing.age.toFixed(0);
        const ageTextWidth = p.textWidth(agetext);
        p.text(agetext, textX - ageTextWidth - 10, textY - 30);

        const expressiontext =
          "Mood: " + get_expression_value(drawing.expressions);
        const expressionWidth = p.textWidth(expressiontext);
        p.text(expressiontext, textX - expressionWidth - 10, textY - 10);

        p.strokeWeight(4);
        p.stroke("rgb(100%,100%,100%)");
        p.rect(
          drawing.detection.box._x,
          drawing.detection.box._y,
          drawing.detection.box._width,
          drawing.detection.box._height
        );
      }
    });

    faceapi
      .detectAllFaces(capture.id())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors()
      .then(data => {
        if (SHOW_DETECTION_DATA) showFaceDetectionData(data);
        console.log(data.length);
        if (data.length) {
          const person = data[0];
          if (
            cameraOperation === cameraOperations.REGISTER_PERSON &&
            registeredPictures < PICTURES_TO_TAKE
          ) {
            registeredPictures++;
            personDescriptors.push(person.descriptor);
          } else if (
            cameraOperation === cameraOperations.REGISTER_PERSON &&
            registeredPictures === PICTURES_TO_TAKE
          ) {
            registeredPictures++;
            const labelDescriptor = [
              new faceapi.LabeledFaceDescriptors(
                nameToRegister,
                personDescriptors
              )
            ];
            const labelJson = labelDescriptor[0].toJSON();
            handleSaveToPC(labelJson, nameToRegister);
            console.log(`${nameToRegister} saved to store`);
            cameraOperation = cameraOperations.RECOGNICE_PERSON;
          } else if (cameraOperation === cameraOperations.RECOGNICE_PERSON) {
            const faceMatcher = new faceapi.FaceMatcher(loadFaceDescriptors());
            const bestMatch = faceMatcher.findBestMatch(person.descriptor);
            console.log(
              `${bestMatch.toString()}, ${person.gender}, ${person.age.toFixed(
                0
              )}, ${get_expression_value(person.expressions)}`
            );
          }
        }
      });

    if (SHOW_DETECTION_DATA && capture.loadedmetadata) {
      if (cocossdModel) {
        cocossdModel
          .detect(document.getElementById("video_element"))
          .then(showCocoSSDResults)
          .catch(e => {
            console.log("Exception : ", e);
          });
      }
    }
  };
}
