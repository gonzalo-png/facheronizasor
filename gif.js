let frames = [];
let staticImg;
let playing = false;
let frameIndex = 0;
let totalFrames = 20; 
let frameDuration = 5; 

function preload() {
  staticImg = loadImage('ruta/static.png');
  for (let i = 1; i <= totalFrames; i++) {
    let filename = `ruta/frame_${nf(i, 3)}.png`;
    frames.push(loadImage(filename));
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
}

function draw() {
  background(0);
  if (!playing) {
    image(staticImg, width / 2, height / 2);
  } else {
    image(frames[frameIndex], width / 2, height / 2);
    if (frameCount % frameDuration == 0) {
      frameIndex++;
      if (frameIndex >= totalFrames) {
        playing = false;
        frameIndex = 0;
      }
    }
  }
}

function mousePressed() {
  if (!playing) {
    playing = true;
    frameIndex = 0;
  }
}