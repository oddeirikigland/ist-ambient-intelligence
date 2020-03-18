import * as faceapi from "face-api.js";

const MODEL_URL = "/models";
const HEIGHT = 200;
const WIDTH = HEIGHT * 1.7778;
let registeredPictures = 0;
let personDescriptors = [];

// Options for program
const PICTURES_TO_TAKE = 10;
let nameToRegister = "new_name";

const handleSaveToPC = (jsonData, filename) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};

export default function sketch(p) {
  let capture = null;

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
  };

  p.draw = async () => {
    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    faceapi
      .detectAllFaces(capture.id())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors()
      .then(data => {
        console.log(data.length);
        if (data.length) {
          const person = data[0];
          if (registeredPictures < PICTURES_TO_TAKE) {
            registeredPictures++;
            personDescriptors.push(person.descriptor);
          } else if (registeredPictures === PICTURES_TO_TAKE) {
            registeredPictures++;
            const labelDescriptor = new faceapi.LabeledFaceDescriptors(
              nameToRegister,
              personDescriptors
            );
            const labelJson = labelDescriptor.toJSON();
            handleSaveToPC(labelJson, nameToRegister);
            console.log(`${nameToRegister} saved to store`);
          }
        }
      });
  };
}
