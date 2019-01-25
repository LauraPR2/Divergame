class Diver {
  constructor(canvasHeight, canvasWidth) {
    // this.img = new Image()
    // this.img.src = "../images/diver.png"

    this.nbOfSprites = 9
    this.imgs = []
    for (let i = 0; i < this.nbOfSprites; i++) {
      let img = new Image()
      img.src = `images/final-diver-sprites/Diver${i}.png`
      this.imgs.push(img)
    }
    this.iImg = 4

    this.width = 240
    this.height = 95
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = 100
    this.y = 250
    // this.x = ((this.canvasWidth - this.width) / 2) - 50
    // this.y = (this.canvasHeight - this.height) / 2
    this.speedY = 0
    this.gravity = 0
    this.health = 1
    this.airSupply = 150
    this.score = 0

    this.transparencyTtl = 0 // Always a number
  }
  update() {
    this.speedY += this.gravity;
    this.y += this.speedY;

    this.iImg = (this.iImg + 0.05) % this.nbOfSprites
    if (this.transparencyTtl > 0) this.transparencyTtl--

    // bounce
    if (this.y < 0) {
      this.speedY = 1;
      this.y += this.speedY;
    }
    if (this.y > (canvasHeight - 200)) {
      this.speedY = 1;
      this.y -= this.speedY;
    }
  }

  draw(ctx) {

    // ctx.save()
    // ctx.globalCompositeOperation = 'source-atop';
    // ctx.fillStyle = 'black';
    // ctx.fillText("source-atop", 350, 80)
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(400, 120, 100, 100);
    // ctx.globalCompositeOperation = 'source-atop';
    // ctx.beginPath();
    // ctx.fillStyle = 'green';
    // ctx.arc(400, 170, 50, 0, 2 * Math.PI);
    // ctx.fill();

    // ctx.restore()


    ctx.save()
    if (this.transparencyTtl > 0) {

      ctx.globalAlpha = 1 - this.transparencyTtl / 100;


      // if (this.transparencyTtl > 50)
      //   ctx.globalAlpha = this.transparencyTtl / 100;
      // else
      //   ctx.globalAlpha = 1 - this.transparencyTtl / 100;

    }

    ctx.drawImage(this.imgs[Math.floor(this.iImg)], this.x, this.y, this.width, this.height)

    // ctx.beginPath()
    // ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI)
    // ctx.fill()

    // ctx.globalAlpha = 0.5
    // ctx.fillStyle = "red"
    // ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.restore()
  }

  collide() {
    this.transparencyTtl = 100
    this.health--
  }

  reset() { }
}

