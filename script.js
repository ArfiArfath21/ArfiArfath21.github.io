// // Get a reference to the image element
// const image = document.getElementById('spinImage');
 
// // Rotate the image randomly every 100 milliseconds
// const rotationInterval = setInterval(() => {
//   const randomRotation = Math.floor(Math.random() * 360); // Generate a random angle between 0 and 360 degrees
//   image.style.transform = `rotate(${randomRotation}deg)`; // Apply the rotation to the image
// }, 100);
 
// // Stop the rotation when the image is at a certain position (e.g., at 90 degrees)
// const stopRotation = () => {
//   clearInterval(rotationInterval); // Stop the rotation interval
// //   image.style.transform = 'rotate(90deg)'; // Set the image rotation to the desired position
//   const computedStyle = window.getComputedStyle(image);
 
// // Extract the rotation angle from the computed style
// const transform = computedStyle.getPropertyValue('transform');
// let rotationAngle = 0;
//   if (transform && transform !== 'none') {
//   // Extract the rotation angle from the transform matrix
//   const matrix = transform.split('(')[1].split(')')[0].split(',');
//   const a = matrix[0];
//   const b = matrix[1];
//   rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
// }
 
// console.log('Rotation angle:', rotationAngle);
 
// };

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
    generateQRCode(division)
  } else {
    document.getElementById("qrcode").innerHTML=""
    document.getElementById('categorySelected').innerHTML = "";
    rotationInterval = setInterval(() => {
        rotateImageByAngle(rotationSpeed);}, 1);
    isRotating = true;
    
  }
};
toggleButton.addEventListener("click", toggleRotation);

function generateQRCode(number) {
    var url = `https://www.google.com/search?q=${number}`
    console.log(url)
    url = "https://risingps2024.streamlit.app/pythonpage"
    const qrcode = new QRCode("qrcode",url);
    console.log(url)
    document.getElementById('categorySelected').innerHTML = `Your Category is ${number}`;
  }

