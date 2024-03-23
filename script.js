const image = document.getElementById("spinImage");
const toggleButton = document.getElementById("toggleButton");
let rotationInterval = null;
let isRotating = false;

function getCurrentRotationAngle() {
  const image = document.getElementById("spinImage");
  const computedStyle = window.getComputedStyle(image);
  const transform = computedStyle.getPropertyValue("transform");
  let rotationAngle = 0;

  if (transform && transform !== "none") {
    const matrix = transform.split("(")[1].split(")")[0].split(",");
    const a = matrix[0];
    const b = matrix[1];
    rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }
  return rotationAngle;
}

function rotateImageByAngle(angle) {
  const image = document.getElementById("spinImage");
  const currentRotation = getCurrentRotationAngle();
  const newRotation = currentRotation + angle;
  image.style.transform = `rotate(${newRotation}deg)`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(`randomNum: ${randomNum}`)
  return randomNum;
}

const sections_count = 8;
const sections = {
  0: "python",
  1: "diversity",
  2: "data",
  3: "ai",
  4: "inclusion",
  5: "test",
  6: "check",
  7: "work",
};
// Function to start or stop the rotation
const toggleRotation = () => {
  rotationSpeed = getRandomInt(25, 20);
  if (isRotating) {
    isRotating = false;
    rotationAngle = getCurrentRotationAngle();
    if (rotationAngle < 0) {
      rotationAngle = 360 + rotationAngle;
      console.log("Negative");
    }
    document.getElementById("toggleButton").innerHTML = `SPIN THE WHEEL`;
    clearInterval(rotationInterval);
    // console.log(rotationAngle);
    var division = Math.floor(rotationAngle / (360 / sections_count));
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    myModal.show();
    generateQRCode(sections[division]);
  } else {
    document.getElementById("toggleButton").innerHTML = `STOP THE WHEEL`;
    document.getElementById("qrcode").innerHTML = "";
    document.getElementById("categorySelected").innerHTML = "";
    rotationInterval = setInterval(() => {
      rotateImageByAngle(rotationSpeed);
    }, 1);
    isRotating = true;
  }
};
toggleButton.addEventListener("click", toggleRotation);

function generateQRCode(section) {
  const now = new Date();
  var userId = `${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  url = `https://risingps2024.streamlit.app/signup?userId=${userId}&quizSection=${section}`;
  console.log(url);
  // url = `https://risingps2024.streamlit.app/signup?userId=${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}&quizSection=python`
  const qrcode = new QRCode("qrcode", url);
  const titleCaseWord = word => word.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  document.getElementById(
    "categorySelected"
  ).innerHTML = `<p>User ID: ${userId}<br>Quiz Topic: ${titleCaseWord(section)}\n</p>`;
}

// async () => {
//   function decelerateRotation(rotationSpeed) {
//     return new Promise((resolve, reject) => {
//       let decelerationInterval = setInterval(() => {
//         rotationSpeed -= 0.1; // Adjust the decrement value as needed
//         if (rotationSpeed <= 0) {
//           clearInterval(decelerationInterval); // Stop the interval when rotation speed reaches 0
//         } else {
//           rotateImageByAngle(rotationSpeed);
//         }
//   }, 10);});};
//   decelerateRotation(rotationSpeed);