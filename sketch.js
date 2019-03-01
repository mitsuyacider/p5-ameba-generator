// refs: https://www.wolframalpha.com/input/?i=polar+plot+r%3D4%2B0.5+sin(+8+theta)
let degree;
let initRadius = 150;
let speed = 0.5
let amplitude;
let amplitudeSlider;
let frequencySlider;
let frequency;
let dotsSlider;
let dots;
let stepSlider;
let step;
let radiusSlider;
let radius;
let radio;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  smooth();
  noFill();
  degree = 360;
	
  fill(255);

  // NOTE: Create sliders
  // createSlider(min, max, [value], [step])
  amplitudeSlider = createSlider(0, 150, 27, 1);
  amplitudeSlider.position(20, 20);
  frequencySlider = createSlider(0, 200, 13, 1);
  frequencySlider.position(20, 50);
  dotsSlider = createSlider(0, 360, 360, 1);
  dotsSlider.position(20, 80);
  stepSlider = createSlider(0.1, 50, 1, 0.1);
  stepSlider.position(20, 110);
  radiusSlider = createSlider(0, 300, 150, 1);
  radiusSlider.position(20, 140);

  radio = createRadio('draw-type');
  radio.style('color', '#ffffff');
  radio.option('dots');
  radio.option('fill');
  radio.option('line');
  radio.value('dots');
  radio.position(20, 170);
}

function draw() {
  background(0, 0, 0);
  drawUI();
  setParameter();
  degree += 0.1;

  switch(radio.value()) {
    case 'dots':
      drawDots();
      break;
    
    case 'fill':
      drawAmeba();
      break;

    case 'line':
      drawWireframe()
      break;
  }
}

function setParameter() {
  amplitude = amplitudeSlider.value();
  frequency = frequencySlider.value();
  dots = dotsSlider.value();
  step = stepSlider.value();
  radius = radiusSlider.value();
}

function drawUI() {
  fill(255);
  text('amplitude: ' + amplitudeSlider.value(), amplitudeSlider.x * 2 + amplitudeSlider.width, 35);
  text('frequency: ' + frequencySlider.value(), frequencySlider.x * 2 + frequencySlider.width, 65);
  text('dots: ' + dotsSlider.value(), dotsSlider.x * 2 + dotsSlider.width, 95);
  text('step: ' + stepSlider.value(), dotsSlider.x * 2 + dotsSlider.width, 125);
  text('radius: ' + radiusSlider.value(), dotsSlider.x * 2 + dotsSlider.width, 155);
  // text('fill', 50, 190);
}

function drawAmeba() {
	var centerX = width / 2; 
	var centerY = height / 2;

	push();
	randomSeed(1)
	noStroke();
	fill(255);
	translate(centerX, centerY);
	// rotate(radians(degree * 5));
	
	beginShape();
	for (var i=0; i < dots; i+=step){    
	// polar plot r=4+0.5 sin( 8 theta)
	const r = radius + amplitude * sin( radians(frequency * i ))			    
		var x = cos(radians(i)) * r
		var y = sin(radians(i)) * r
		curveVertex(x, y);
	}
	endShape(CLOSE);
	pop();	
}

function drawWireframe() {
	var centerX = width / 2; 
	var centerY = height / 2;

	push();
	randomSeed(1)
	stroke(255);
	noFill()
	translate(centerX, centerY);
	// rotate(radians(degree * 5));
	
	beginShape();
	for (var i=0; i < dots; i += step){    
	// polar plot r=4+0.5 sin( 8 theta)
	const r = radius + amplitude * sin( radians(frequency * i ))			    
		var x = cos(radians(i)) * r
		var y = sin(radians(i)) * r
    curveVertex(x, y);
    
    if (i === 0) {
      curveVertex(x, y);
    }
	}
	endShape(CLOSE);
	pop();	
}

function drawDots() {
  var centerX = width / 2; 
  var centerY = height / 2;
  
  push();
  randomSeed(1)
  noStroke();
  fill(255);
  translate(centerX, centerY);
	for (var i=0; i < dots; i+=step){    
		// polar plot r=4+0.5 sin( 8 theta)
	const r = radius + amplitude * sin( radians(frequency * i ))			    
		var x = cos(radians(i)) * r
		var y = sin(radians(i)) * r
		ellipse(x, y, 2, 2);
	}
	pop();
}
