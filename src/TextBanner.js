class TextBanner {
  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.text = "";
    this.font = "";
    this.fill = "";

    this.pixels = [];
  }

  setScale (scale) {
    this.scale = scale;
  }

  setFillStyle (red = 0, green = 0, blue = 0, alpha = 1) {
    this.fill = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
  }

  setFont (font = "Arial", sizeInPixel = 100, weight = "normal") {
    this.font = weight + " " + sizeInPixel + "px " + font;
  }

  setText (text = "Hello World!") {
    this.text = text;
  }

  setBackground(red = 0, green = 0, blue = 0) {
    this.bg = "rgb(" + red + "," + green + "," + blue + ")";
  }

  paintBackground() {
    this.ctx.fillStyle = this.bg ? this.bg : "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  run () {
    this.getPixels();
    let time = 0;
    let that = this;
    setInterval(() => {
      that.paintBackground();
      for (let i=0; i<that.pixels.length; i++) {
        that.pixels[i].arrive();
        that.pixels[i].flee(that.mousePosition, 0.75 * that.textHeight);
        that.pixels[i].update();
        that.pixels[i].render(that, function () {
          that.fillRainbow(that.pixels[i].position.x, time / 34);
          that.ctx.fillStyle = that.fill;
        });
      }
      time++;
    }, 1000/60);
  }

  getPixels () {
    this.clearCanvas();

    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.font = this.font;
    this.ctx.fillText(this.text, this.width/2, this.height/2);

    let image = this.ctx.getImageData(0, 0, this.width, this.height).data;
    this.clearCanvas();

    let maxWidth = 0, maxHeight = 0;
    let minWidth = this.width, minHeight = this.height;

    for (let x=0; x<this.width; x+=this.scale) {
      for (let y=0; y<this.height; y+=this.scale) {
        let i = x*4+y*4*this.width;
        if (image[i] < 255 && image[i+1] < 255 && image[i+2] < 255) {
          minWidth = x < minWidth ? x : minWidth;
          minHeight = y < minHeight ? y : minHeight;
          maxWidth = x > maxWidth ? x : maxWidth;
          maxHeight = y > maxHeight ? y : maxHeight;

          let v = new Vehicle (x, y);
          v.setSeekTarget(x, y);
          this.pixels.push(v);
        }
      }
    }
    this.textWidth = maxWidth - minWidth;
    this.textHeight = maxHeight - minHeight;
  }

  fillRainbow (pixelX, offset = 0) {
    let r, g, b;
    r = Math.cos((2 * pixelX / this.textWidth - 2) * 3.14159265 - offset) * 255 + 67;
    g = Math.cos((2 * pixelX / this.textWidth - 0.66666667) * 3.14159265 - offset) * 255 + 67;
    b = Math.cos((2 * pixelX / this.textWidth - 1.33333334) * 3.14159265 - offset) * 255 + 67;
    this.setFillStyle(r, g, b, 1);
  }

  mouseMove () {
    this.mousePosition = new Vector2D(0, 0);
    let that = this;
    this.canvas.addEventListener('mousemove', function (event) {
      that.mousePosition.set(event.offsetX, event.offsetY);
    });
  }

  clearCanvas () {
    this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
