class Airtanks {
  constructor(canvasWidth, canvasHeight, randomPos) {
    this.img = new Image()
    this.img.src = "../images/airtank.png"
    this.width = 60
    this.height = 55
    this.x = canvasWidth
    this.y = 0
    //this.y = randomPos
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.vx = -2
    this.vy = 1
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  update() {
    this.x += this.vx
    this.y += this.vy
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }


}
