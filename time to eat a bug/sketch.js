// https://kylemcdonald.github.io/cv-examples/

let capture;
let w = 640;
let h = 480;
let img;
let bubble1;
let bubbles = [];
let gecko;
let scoreElem;
let lightimg;
let predatorimg;
let i;
let curPatch;
let bushes;
let predators = [];
let amount = 10;
let bcg;
let pointSound;
let dieSound;
let gameOver;
let tryAgain;
let font;
let tips;
let title;
let lights;
let next;
let story;


let mode;

function preload() {
  img = loadImage('assets/bug.png');
  lightimg = loadImage('assets/flash.png');
  predatorimg = loadImage('assets/predator.png');
  bushes = loadImage('assets/bushes.png');
  pointSound = loadSound('assets/point.mp3');
  dieSound = loadSound('assets/hurt.wav');
  bcg = loadImage('assets/swamp.jpg');
  gameOver = loadImage('assets/gameover.png');
  tryAgain = loadImage('assets/tryagain.png');
  font = loadFont('assets/font.ttf');
  tips = loadImage('assets/tips.PNG');
  title = loadImage('assets/title.png');
  lights = loadImage('assets/lights.png');
  next = loadImage('assets/next.png');
  story = loadImage('assets/story.png');
}

function setup() {
  createCanvas(w, h);
  run();
mode = 0;
}

function run(){

  //background('transparent');
  
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  capture.size(w, h);
  
  capture.hide();


  for (let i = 0; i < amount; i++) {

    let x = 50 + 100 * i;
    let y = random(40, 300)
    bubbles[i] = new Bubble(x, y)
  }

  gecko = new Light(400, 200);

  for (let i = 0; i < amount; i++) {
    let x = 100 + 100 * i;
    let y = random(50, 380)
    predators[i] = new Predator(x, y);
  }


  scoreElem = createDiv('Score = 0');
  scoreElem.style('font-size','large');
  scoreElem.position(280,20);
  scoreElem.id = 'score';
  scoreElem.style('font-family', 'Luminari, fantasy');
  scoreElem.style('color', 'black');

  frameRate(60);

}

function findBrightest(video) {
  var brightestValue = 0;
  var brightestPosition = createVector(0, 0);
  var pixels = video.pixels;
  var i = 0;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var r = pixels[i++];
      var g = pixels[i++];
      var b = pixels[i++];
      i++; // ignore a
      var brightness = r + g + b;
      if (brightness > brightestValue) {
        brightestValue = brightness;
        brightestPosition.set(x, y);
      }
    }
  }
  return brightestPosition;
}

var lastPoint;

function smoothPoint(point, amt) {
  if (!lastPoint) {
    lastPoint = point;
  } else {
    lastPoint.lerp(point, 1 - amt);
  }
  return lastPoint.copy();
}

var trailPointsLength = 50;
var trailPoints = [];

function drawTrail(nextPoint) {
  trailPoints.push(nextPoint);
  if (trailPoints.length > trailPointsLength) {
    trailPoints.shift();
  }
  beginShape();
  trailPoints.forEach(function(point) {
    vertex(point.x, point.y);
  })
  endShape();
}

function clearTrail() {
  trailPoints = [];
}

var anotherLastPoint;


class Bubble {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }



  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.x = random(width);
      this.y = random(height);
    }
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    imageMode(CENTER);
    image(img, this.x, this.y, 30, 30);
  }
}
class Light {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }



  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.x = random(width);
      this.y = random(height);
    }
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    imageMode(CENTER);
    image(lightimg, this.x, this.y, 50, 50);
  }
}
class Predator {
  constructor(x, y, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
    // if (d < this.r + other.r) {
    //   return true;
    // } else {
    //   return false;
    // }
  }



  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      this.x = random(width);
      this.y = random(height);
    }
  }
  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    imageMode(CENTER);
    image(predatorimg, this.x, this.y, 60, 60);
  }
}

function play(){
mode = 1;


}
function draw() {
  // this acts as a background() or clear()

 
  
  
  if(mode==0){
 
    
    //clear();
    

    image(next,300,430,50,35);
    imageMode(CORNER)
  
  background(bcg);
    
      imageMode(CENTER)
    image(title,width/2,height/4,title.width / 2);
      image(lights,width/2,400,lights.width / 3,lights.height/2)
        image(story,width/2,height/2,600,100)
    
    
    capture.loadPixels();

  if (capture.pixels.length > 0) { // don't forget this!
    var total = 0;
    var i = 0;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var redValue = capture.pixels[i];
        total += redValue;
        i += 4;
      }
    }
    var n = w * h;
    var avg = int(total / n);


   // print(avg);
    
    if (avg<=100){
    image(next,300,450,50,35);
       if(
    mouseX > 300 && //if the mouse is greather than 200 we're over the image
    mouseX < 350 && //if the mouse is less than 300 were over the image (since the image is at 200 and is 100 wide = 300)
    mouseY > 450 && //same idea but on the vertical axis.
    mouseY < 485
  ){ 
     play();
       }
      
    }
  }
    
  }  
  
  if(mode==1){
 
    clear ();
    

         
  imageMode(CORNER);
  push();
  translate(capture.width, 0);
  scale(-1, 1); // You had it right!
  image(capture, 0, 0, 640, 480);


  imageMode(CENTER);
  image(bushes, 100, 10, 700, 200);
  image(bushes, 400, 10, 500, 200);
  image(bushes, 600, 10, 500, 200);
  image(bushes, 200, 500, 500, 200);
  image(bushes, 500, 500, 500, 200);
 

  // print();

  capture.loadPixels();


  if (capture.pixels.length > 0) { // don't forget this!
    var brightest = findBrightest(capture);

    // first step to try: uncomment the line below to enable smoothing

    //        brightest = smoothPoint(brightest, smoothingAmount);

    // next step to try: ignore points that are too far from current point
    if (anotherLastPoint) {
      var dist = anotherLastPoint.dist(brightest);
      if (dist > 200) {
                        brightest = anotherLastPoint;
      }
    }

    noFill();
    strokeWeight(10);
    stroke(135, 87, 32, 180);

    drawTrail(brightest);

    anotherLastPoint = brightest.copy();

    gecko.show();
    gecko.x = brightest.x;
    gecko.y = brightest.y;
    // gecko.x=mouseX;
    //  gecko.y=mouseY;


    for (let i = 0; i < predators.length; i++) {
      predators[i].show();
      predators[i].move();

      if (predators[i].intersects(gecko)) {

        dieSound.play();

        print('game over');

        predators[i].clicked(predators[i].x, predators[i].y);



        scoreElem.style('color', 'transparent');

        let prevScore = parseInt(scoreElem.html().substring(8));
        let scoreElem2 = createDiv('Your score was ' + prevScore);
        scoreElem2.position(260, 350);

        scoreElem2.style('font-family', 'Luminari, fantasy');
        scoreElem2.id = 'score';
        scoreElem2.style('color', 'orange');
        push();
        imageMode(CORNER);
        background(bcg);
        pop();
        imageMode(CENTER);

push();
        translate(gameOver.width, 0);
  scale(-1, 1);
        image(gameOver, width/3.5, height / 2);

        pop();
        button = createImg('assets/tryagain.png','button');
       button.size(180,75)
  button.position(225,400);
  button.mousePressed(run); 
        
        noLoop();
        
       
      }
      imageMode(CORNER);
    }


    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].show();
      bubbles[i].move();

      if (bubbles[i].intersects(gecko)) {
        userStartAudio();

        pointSound.play();

        const prevScore = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Score = ' + (prevScore + 1));



        bubbles[i].clicked(bubbles[i].x, bubbles[i].y);
      }
    }
pop();
    //  print(brightest);

    imageMode(CORNER);

  }

  for (let i = frameCount; i < 800; i++) {




    image(tips, 0, 0, w, h);



  }


  }

}