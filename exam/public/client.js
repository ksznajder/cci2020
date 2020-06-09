var socket, myColor, mySize;
function setup(){
	createCanvas(windowWidth,windowHeight);
	background(25)
	socket = io()
	socket.on('mouse', drawing)
	myColor = [random(255), random(255), random(255)]
	mySize = 5
	let s = 'click and draw!'
	textSize(25);
	fill('lightgray')
text(s, 10, 30);
}

function drawing(data){
strokeWeight(mySize)
	stroke(data.color[0],data.color[1],data.color[2]);
	line(data.x, data.y, data.px, data.py)
}

function mouseDragged(){
	//console.log(mouseX + ', ' + mouseY)
	var data = {
		x: mouseX,
		y: mouseY,
		px: pmouseX,
		py: pmouseY,
		color: myColor,
		size: mySize
	}
  console.log(data);
	socket.emit('mouse', data)


	stroke(myColor[0], myColor[1], myColor[2]);
	strokeWeight(mySize)
	line(mouseX, mouseY, pmouseX, pmouseY);
}
