class Obstacles {
  constructor (canvasWidth,canvasHeight,randomPos){
    this.img = new Image()
    this.img.src = "../images/jellyfish.png"
    this.width = 50
    this.height = 70
    this.x = canvasWidth
    this.y = randomPos
    this.canvasWidth = canvasWidth
    this.canvasHeight =canvasHeight
    this.vx = -2
  }
  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  update(){
    this.x += this.vx
  }
}