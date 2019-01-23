//Setting of canvas
var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var canvasWidth = canvas.width
var canvasHeight = canvas.height

//Main variables

var background = new Background(canvasWidth)
var diver = new Diver(canvasHeight, canvasWidth)
// var obstacle1 = new Obstacles(canvasWidth,canvasHeight)
// empty array of obstacles
var obstacles1 = []
var airtanks = []
var frame = 0
var status = "start"


//FUNCTIONS 
//Main functions

function drawEverything() {
  ctx.clearRect(0, 0, canvasWidth, 500)
  background.draw(ctx)
  diver.drawDiver(ctx)
  writeAir()
  writeHealth()
  writeScore()
  obstacles1.forEach(obstacle1 => obstacle1.draw(ctx))
  airtanks.forEach(airtank => airtank.draw(ctx))
}

function updateEverything() {
  frame++
  checkForJellyfish()
  checkForAirtank()
  background.update()
  diver.update()
  obstacles1.forEach(obstacle1 => obstacle1.update(ctx))
  airtanks.forEach(airtank => airtank.update(ctx))
  if (frame % 100 == 0) {
    createObstacle1()    // add a new obstacle
  }
  if (frame % 300 == 0) {
    createAirtank()    // add a new tank
  }
}

function startAnimation() {
  updateEverything()
  drawEverything()
  if (diver.health > 0 && diver.airSupply > 0) {
    requestAnimationFrame(startAnimation)
  }
  else {
    status = "over"
    gameOver()
  }
}

function gameOver() {
  if (status === "over") {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  }
}


//Drawing obstacles
function createObstacle1() {
  var randomPos = Math.floor((Math.random() * canvas.height))
  var obstacle1 = new Obstacles(canvas.width, canvas.height, randomPos)
  obstacles1.push(obstacle1)
}
function createAirtank() {
  var randomPos = Math.floor((Math.random() * canvas.height))
  var airtank = new Airtanks(canvas.width, canvas.height, randomPos)
  airtanks.push(airtank)
}


// Checking for collisions
function checkForJellyfish() {
  for (let i = 0; i < obstacles1.length; i++) {

    if (
      this.diver.x + 200 > obstacles1[i].x &&
      obstacles1[i].y + 50 > this.diver.y &&
      this.diver.x - 200 < obstacles1[i].x &&
      obstacles1[i].y - 50 < this.diver.y
    ) {
      this.diver.health -= 1
      console.log("POP!")
      obstacles1[i].x = 0 + ''
      obstacles1[i].y = 0 + ''
    }
  }
}

function checkForAirtank() {
  for (let i = 0; i < airtanks.length; i++) {
    if (
      this.diver.x + 200 > airtanks[i].x &&
      airtanks[i].y + 50 > this.diver.y &&
      this.diver.x - 200 < airtanks[i].x &&
      airtanks[i].y - 50 < this.diver.y
    ) {
      this.diver.airSupply += 100
      console.log("POP!")
      airtanks[i].x = 0 + ''
      airtanks[i].y = 0 + ''
    }
  }
}

//Displaying scores

function writeAir() {
  ctx.font = '20px calibri';
  ctx.fillStyle = "#2380b2"
  ctx.fillText(`Air: ${diver.airSupply}`, 15, 25);
}
function writeHealth() {
  ctx.font = '20px calibri';
  ctx.fillText(`Health: ${diver.health}`, 15, 50);
}
function writeScore() {
  ctx.font = '20px calibri';
  ctx.fillText(`Score: ${diver.score}`, 15, 75);
}



//ON-CLICK EVENTS

window.onkeydown = function (event) {
  if (event.keyCode == 40) { // down
    diver.y += 10
  } else if (event.keyCode == 38) { //up
    diver.y -= 10
  } else if (event.keyCode == 39) { // right 
    diver.x += 10
  } else if (event.keyCode == 37) { // left
    diver.x -= 10
  } else if (event.keyCode == 32) { // space
    console.log("space")
  }
}


startAnimation()

