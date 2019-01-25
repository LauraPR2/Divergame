class Background {
  constructor(canvasWidth) {
    this.img = new Image()
    this.img.src = "../images/bg.png"
    this.width = 900
    this.length = 500
    this.x = 0
    this.vx = -3
    this.canvasWidth = canvasWidth
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, 0, this.width, this.length)
    ctx.drawImage(this.img, this.x + this.width, 0, this.width, this.length)
    // ctx.drawImage(this.img, this.x + this.width * 2, 0)

  }

  update() {
    this.x += this.vx
    //this.x = this.x % this.width
    if (this.x < (-this.width)) {
      this.x += (this.width)
    }
  }
} 