class Diver {
  constructor(canvasHeight, canvasWidth) {
    this.img = new Image()
    this.img.src = "../images/diver.png"
    this.width = 100
    this.height = 20
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = ((this.canvasWidth - this.width) / 2) - 50
    this.y = (this.canvasHeight - this.height) / 2
    this.speedY = 0
    this.gravity = 0
    this.health = 5
    this.airSupply = 5000
    this.score = 0
  }
  update() {
    this.speedY += this.gravity;
    this.y += this.speedY;

    if (this.y < 0) {
      this.speedY = 5;
      this.y += this.speedY;
    }
  }

  drawDiver(ctx) {
    ctx.drawImage(this.img, this.x, this.y)
  }

  reset() { }
}