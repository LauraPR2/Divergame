var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var canvasWidth = canvas.width
var canvasHeight = canvas.height

var background = new Background(canvasWidth)
var diver = new Diver(canvasHeight,canvasWidth)
// var obstacle1 = new Obstacles(canvasWidth,canvasHeight)
// empty array of obstacles
var obstacles1 = []
var airtanks = []
var frame = 0

function startAnimation (){
  updateEverything()
  drawEverything()
  requestAnimationFrame(startAnimation)
  obstacles1.forEach(function(obstacle1) {
    if (crushObs(obstacle1)) {
      
}
})
}

function drawEverything(){
  ctx.clearRect(0,0,canvasWidth,500)
  background.draw(ctx)
  diver.drawDiver(ctx)
  obstacles1.forEach(obstacle1 => obstacle1.draw(ctx))
  airtanks.forEach(airtank => airtank.draw(ctx))

  
  // obstacle1.draw(ctx)
  // draw all the obstacles

}

function updateEverything(){
  frame++
  checkForJellyfish()
  background.update()
  diver.update()
  obstacles1.forEach(obstacle1 => obstacle1.update(ctx))
  airtanks.forEach(airtank => airtank.update(ctx))


  if(frame % 100 == 0) {
    
    createObstacle1()    // add a new obstacle
  }
  if(frame % 300 == 0) {
    createAirtank()    // add a new tank
  }
//obstacle1.update()
}


window.onkeydown = function(event) {
  if(event.keyCode == 40) { // down
    diver.y += 10
  } else if(event.keyCode == 38) { //up
    diver.y -= 10    
  } else if(event.keyCode == 39) { // right 
    diver.x += 10    
  } else if(event.keyCode == 37) { // left
    diver.x -= 10        
  } else if (event.keyCode == 32) { // space
    console.log("space")
  }
}

function createObstacle1 (){
  var randomPos = Math.floor((Math.random() * canvas.height))
  var obstacle1 = new Obstacles (canvas.width,canvas.height,randomPos)
  obstacles1.push(obstacle1)
}
function createAirtank (){
  var randomPos = Math.floor((Math.random() * canvas.height))
  var airtank = new Airtanks (canvas.width,canvas.height,randomPos)
  airtanks.push(airtank)
}

function crushObs (obstacle1) {
  if (diver.right() > obstacle1.left()) {
    
  }
}
// just for obastacles1 // jellyfishes
 function checkForJellyfish () {
    for (let i = 0; i < obstacles1.length; i++){

    if (
      this.diver.x + 200 > obstacles1[i].x &&
      obstacles1[i].y + 50 > this.diver.y &&
      this.diver.x - 200 < obstacles1[i].x &&
      obstacles1[i].y - 50 < this.diver.y
      ){
      this.diver.health-=1
      console.log("POP!")
      obstacles1[i].x=0+''
      obstacles1[i].y=0+''
    }
    }
  } 

// function crushObs(obstacle1) {
//   if (diver.left() < obstacle1.right() && diver.right() > obstacle1.left()) {
//     return diver.top() < obstacle1.top() || diver.bottom() > obstacle1.bottom();
//     console.log("crushed")
//   }
// }

startAnimation()