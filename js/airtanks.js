class Airtanks {
  constructor (canvasWidth,canvasHeight,randomPos){
    this.img = new Image()
    this.img.src = "../images/airtank.png"
    this.width = 70
    this.height = 30
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
