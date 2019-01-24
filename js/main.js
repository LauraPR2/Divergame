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
var lifes = new Image()
lifes.src = "../images/lifes.png"



//FUNCTIONS 
//Main functions

function onStart() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.fillStyle = "#f4ffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  ctx.fillStyle = "#29c5f4"
  ctx.font = '50px Luckiest Guy';
  ctx.fillText(`click to start`, 310, 400);
  clickToStart()
}

function drawEverything() {
  ctx.clearRect(0, 0, canvasWidth, 500)
  background.draw(ctx)
  diver.draw(ctx)
  drawingAirLeft()
  // writeAir()
  // writeHealth()
  writeScore()
  drawingLifes()
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
    createObstacle1() // add a new obstacle
    diver.airSupply -= 10
  }
  if (frame % 600 == 0) {
    createAirtank()    // add a new tank
  }
  if (frame % 10 == 0) {
    diver.score++
  }
}

function startAnimation() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  status = "play"
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
    //ctx.fillRect = "#f4ffff"
    ctx.fillStyle = "#29c5f4"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.font = '90px Luckiest Guy';
    ctx.fillStyle = "#2380b2";
    ctx.fillText(`GAME OVER`, 225, 200);
    ctx.font = '40px Luckiest Guy';
    ctx.fillStyle = "#eeae44";
    ctx.font = '35px Luckiest Guy';
    ctx.fillText(`Final Score: ${diver.score}`, 320, 300);
    ctx.fillStyle = "#f4ffff";
    ctx.fillText(`click to restart`, 300, 400);
    //ctx.drawImage(restartbutton, 400, 300, 80, 80)
    clickToRestart()
  }
}


function restartGame() {
  status = "play"
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  // diver.health = 1
  // diver.airSupply = 500
  // diver.score = 0
  obstacles1 = []
  airtanks = []
  frame = 0
  diver.speedY = 0
  diver.gravity = 0
  // diver.x = ((canvasWidth - diver.width) / 2) - 50
  // diver.y = (canvasHeight - diver.height) / 2

  diver = new Diver(diver.canvasHeight, diver.canvasWidth)

  startAnimation()
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

function drawingLifes() {
  if (diver.health === 5) {
    ctx.drawImage(lifes, 10, 30)
    ctx.drawImage(lifes, 40, 30)
    ctx.drawImage(lifes, 70, 30)
    ctx.drawImage(lifes, 100, 30)
    ctx.drawImage(lifes, 130, 30)
  }
  if (diver.health === 4) {
    ctx.drawImage(lifes, 10, 30)
    ctx.drawImage(lifes, 40, 30)
    ctx.drawImage(lifes, 70, 30)
    ctx.drawImage(lifes, 100, 30)
  }
  if (diver.health === 3) {
    ctx.drawImage(lifes, 10, 30)
    ctx.drawImage(lifes, 40, 30)
    ctx.drawImage(lifes, 70, 30)
  }
  if (diver.health === 2) {
    ctx.drawImage(lifes, 10, 30)
    ctx.drawImage(lifes, 40, 30)
  }
  if (diver.health === 1) {
    ctx.drawImage(lifes, 10, 30)
  }
}

function drawingAirLeft() {
  var rectWidth = diver.airSupply;
  ctx.fillStyle = "#eeae44"
  ctx.fillRect(10, 10, rectWidth, 15)
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
      this.diver.collide()
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
      this.diver.x + 50 < airtanks[i].x &&
      airtanks[i].y - 50 < this.diver.y
    ) {
      this.diver.airSupply += 100
      console.log("POP!")
      airtanks[i].x = 0 + ''
      airtanks[i].y = 0 + ''
    }
  }
}

function checkForFloor() {
  if (this.diver.height === (canvasHeight - this.diver.height)) {
    this.diver.collide()
    setTimeout(gameOver(), 2000)
  }
}

//Displaying scores

// function writeAir() {
//   ctx.font = '22px calibri';
//   ctx.fillStyle = "#2380b2"

//   if (diver.airSupply <= 80) {
//     ctx.fillStyle = "#f4b042";
//   }
//   if (diver.airSupply < 50) {
//     ctx.fillStyle = "#ff0000"
//   }
//   ctx.fillText(`Air: ${diver.airSupply}`, 15, 25);
// }
// function writeHealth() {
//   ctx.fillStyle = "#2380b2"
//   if (diver.health <= 3) {
//     ctx.fillStyle = "#f4b042";
//   }
//   if (diver.health === 1) {
//     ctx.fillStyle = "#ff0000";
//   }

//   ctx.font = '22px calibri';
//   ctx.fillText(`Health: ${diver.health}`, 15, 50);
// }
function writeScore() {
  ctx.fillStyle = "#2380b2";
  ctx.font = '22px Luckiest Guy';
  ctx.fillText(`Score: ${diver.score}`, 15, 75);
}



//ON-CLICK EVENTS

window.onkeydown = function (event) {
  if (event.keyCode == 32) {
    event.preventDefault()
    diver.gravity = -0.2;
    diver.speedY = -1;
  }
}
window.onkeyup = function (event) {
  if (event.keyCode === 32) {
    diver.gravity = 0.1;
  }
};

window.onclick = function (event) {
  if (status === "play") {
    window.onclick = function () {
      diver.gravity = -0.2;
      diver.speedY = -1;
    }
  }
}

function clickToRestart() {
  if (status === "over") {
    window.onclick = function () {
      console.log("clicked")
      restartGame()
      window.onclick = function () {
        var i = 0
      }
    }
  }
}

function clickToStart() {
  if (status === "start") {
    window.onclick = function () {
      document.querySelector('#canvas').requestFullscreen()
      console.log("clicked")
      startAnimation()
      window.onclick = function () {
        var i = 0
      }
    }
  }
}


onStart()

