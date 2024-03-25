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

const sections_count = 12;
const displaySections = {
  0: "AI", 11: "AI",
  1: "Data", 2: "Data",
  3: "Current Affairs", 4: "Current Affairs",
  5: "Wellness", 6: "Wellness",
  7: "Diversity & Inclusion", 8: "Diversity & Inclusion",
  9: "Tech History", 10: "Tech History"
};
const sections = {
  0: "ai", 11: "ai",
  9: "techHistory", 10: "techHistory",
  7: "dei", 8: "dei",
  5: "wellness", 6: "wellness",
  3: "currentAffairs", 4: "currentAffairs",
  1: "data", 2: "data"
};
// Function to start or stop the rotation

function startRotation(duration, rotspeed) {
  if (!isRotating) {
    isRotating = true;
    rotationInterval = setInterval(() => {
      rotateImageByAngle(rotspeed);
    }, 1);
    rotationTimeout = setTimeout(() => {
      stopRotation();
    }, duration);
  }
}
function stopRotation() {
  clearInterval(rotationInterval);
  isRotating = false;
}
const toggleRotation = () => {
  let targetSpeed = getRandomInt(5, 3);
  let acceleration = 0.01; // Adjust acceleration rate as needed
  let currentSpeed = 0;

  if (isRotating) {
    isRotating = false;
    clearInterval(rotationInterval);
    rotationAngle = getCurrentRotationAngle();
    if (rotationAngle < 0) {
      rotationAngle = 360 + rotationAngle;
      console.log("Negative");
    }
    document.getElementById("toggleButton").innerHTML = `SPIN THE WHEEL`;
    var division = Math.floor(rotationAngle / (360 / sections_count));
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    setTimeout(() => {
      myModal.show();
      generateQRCode(sections[division], displaySections[division]);
    }, 500);
  } else {
    document.getElementById("toggleButton").innerHTML = `STOP THE WHEEL`;
    document.getElementById("qrcode").innerHTML = "";
    document.getElementById("categorySelected").innerHTML = "";
    rotationInterval = setInterval(() => {
      if (currentSpeed < targetSpeed) {
        currentSpeed += acceleration;
        if (currentSpeed > targetSpeed) {
          currentSpeed = targetSpeed;
        }
      }
      rotateImageByAngle(currentSpeed);
    }, 1);
    isRotating = true;
  }
};
toggleButton.addEventListener("click", toggleRotation);


function generateQRCode(section, displaySection) {
  const now = new Date();
  var userId = `${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  url = `https://rising24ps.streamlit.app/signup?userId=${userId}&quizSection=${section}`;
  console.log(url);
  // url = `https://risingps2024.streamlit.app/signup?userId=${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}&quizSection=python`
  const qrcode = new QRCode("qrcode", url);
  // const titleCaseWord = word => word.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  document.getElementById(
    "categorySelected"
  ).innerHTML = `<p>User ID: ${userId}<br>Quiz Topic: ${displaySection}\n</p>`;
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

// let globalSpeed = 0;
//     currentSpeed = globalSpeed;
//     newRotationInterval = setInterval(() => {
//       if (currentSpeed > 0) {
//         console.log("here")
//         currentSpeed -= acceleration;
//       }
//       rotateImageByAngle(currentSpeed);
//     }, 1);
//     clearInterval(newRotationInterval);
//       globalSpeed = currentSpeed;