const image = document.getElementById("spinImage");
const toggleButton = document.getElementById("toggleButton");
let rotationInterval = null;
let isRotating = false;

function getCurrentRotationAngle() {
    const image = document.getElementById('spinImage');
    const computedStyle = window.getComputedStyle(image);
    const transform = computedStyle.getPropertyValue('transform');
    let rotationAngle = 0;
  
    if (transform && transform !== 'none') {
      const matrix = transform.split('(')[1].split(')')[0].split(',');
      const a = matrix[0];
      const b = matrix[1];
      rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }
    return rotationAngle;
  }  

  function rotateImageByAngle(angle) {
    const image = document.getElementById('spinImage');
    const currentRotation = getCurrentRotationAngle();
    const newRotation = currentRotation + angle;
    image.style.transform = `rotate(${newRotation}deg)`;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`randomNum: ${randomNum}`)
    return randomNum
  }

const  sections_count = 8
const sections = {
  0: 'python',
  1: 'diversity',
  2: 'data',
  3: 'ai',
  4: 'inclusion',
  5: 'test',
  6: 'check',
  7: 'work'
};
// Function to start or stop the rotation
const toggleRotation = () => {
rotationSpeed = getRandomInt(30,20)
  if (isRotating) {
    clearInterval(rotationInterval);
    isRotating = false;
    rotationAngle = getCurrentRotationAngle()
    if (rotationAngle < 0) {
        rotationAngle = 360 + rotationAngle
        console.log("Negative")
      }
    console.log(rotationAngle);
    var division = Math.floor(rotationAngle/(360/sections_count));
    generateQRCode(sections[division])
  } else {
    document.getElementById("qrcode").innerHTML=""
    document.getElementById('categorySelected').innerHTML = "";
    rotationInterval = setInterval(() => {
        rotateImageByAngle(rotationSpeed);}, 1);
    isRotating = true;
    
  }
};
toggleButton.addEventListener("click", toggleRotation);

function generateQRCode(section) {
    const now = new Date();
    url = `https://risingps2024.streamlit.app/quiz?userId=${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}?quizSection=${section}`
    console.log(url)
    // url = `https://risingps2024.streamlit.app/quiz?userId=${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}?quizSection=python`
    const qrcode = new QRCode("qrcode",url);
    document.getElementById('categorySelected').innerHTML = `Your Category is ${section}`;
  }

