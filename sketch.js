let imgArray = [];
let currentImg = 0;
let nextImg = 1;
let transitionProgress = 0; // Track the progress of the transition (0 to 1)
let transitionSpeed = 0.01; // Control the speed of the dissolve effect
let size;
let asciiChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'.";

function preload() {
  imgArray[0] = loadImage("01.png");
  imgArray[1] = loadImage("02.png");
  imgArray[2] = loadImage("03.png");
}

function setup() {
  createCanvas(400, 400);
  
  // Resize all images
  imgArray.forEach(img => img.resize(100, 0));
  size = width / imgArray[0].width;
  noStroke();
}

function draw() {
  background(225);

  let imgCurrent = imgArray[currentImg];
  let imgNext = imgArray[nextImg];
  imgCurrent.loadPixels();
  imgNext.loadPixels();

  for (let i = 0; i < imgCurrent.width; i++) {
    for (let j = 0; j < imgCurrent.height; j++) {
      let pixelIndex = (i + j * imgCurrent.width) * 4;

      // Current image pixel values
      let r1 = imgCurrent.pixels[pixelIndex + 0];
      let g1 = imgCurrent.pixels[pixelIndex + 1];
      let b1 = imgCurrent.pixels[pixelIndex + 2];

      // Next image pixel values
      let r2 = imgNext.pixels[pixelIndex + 0];
      let g2 = imgNext.pixels[pixelIndex + 1];
      let b2 = imgNext.pixels[pixelIndex + 2];

      // Interpolating between the two images (morphing effect)
      let r = lerp(r1, r2, transitionProgress);
      let g = lerp(g1, g2, transitionProgress);
      let b = lerp(b1, b2, transitionProgress);

      // Calculate brightness for ASCII conversion (brightness range should be 0-255)
      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length - 1));

      // Coordinates for displaying characters
      let x = i * size + size / 2;
      let y = j * size + size / 2;
      let t = asciiChar.charAt(tIndex);

      textSize(size);
      textAlign(CENTER, CENTER);

      fill(0, 0, 255); // Blue color for ASCII text
      text(t, x, y);
    }
  }

  // Gradually increase transitionProgress until it reaches 1
  transitionProgress += transitionSpeed;

  // When transition is complete, switch images and reset transitionProgress
  if (transitionProgress >= 1) {
    transitionProgress = 0; // Reset the progress for the next transition
    currentImg = nextImg; // Move to the next image
    nextImg = (nextImg + 1) % imgArray.length; // Loop back to the start
  }
}
