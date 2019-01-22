var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

var canvasWidth = canvas.width
var canvasHeight = canvas.height

var background = new Background(canvasWidth)
var diver = new Diver(canvasHeight,canvasWidth)
var obstacle = new Obstacles(canvasWidth,canvasHeight)

function startAnimation (){
  console.log("started animation")
  updateEverything()
  drawEverything()
  requestAnimationFrame(startAnimation)
}

function drawEverything(){
  ctx.clearRect(0,0,canvasWidth,500)
  background.draw(ctx)
  diver.drawDiver(ctx)
  obstacle.draw(ctx)

  
}

function updateEverything(){
  background.update()
  diver.update()
  obstacle.update()
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
  } 
}

startAnimation()
diver.move()