class Background {
  constructor (canvasWidth) {
  this.img = new Image()
  this.img.src = "../images/bg.png"
  this.width = 800
  this.x = 0
  this.vx = -3
  this.canvasWidth = canvasWidth
  }
  draw (ctx){
    ctx.drawImage(this.img, this.x, 0)
    ctx.drawImage(this.img, this.x+this.width, 0)
    ctx.drawImage(this.img, this.x+this.width*2, 0)

  }
  
  update(){
    this.x += this.vx
    if (this.x == (-this.width)){
      this.x += (this.width)
    }
  }
} 