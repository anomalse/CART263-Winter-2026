
class Bird {
  constructor(x, y, size) {
    this.x = x;
    this.startY = y;   // original sky height
    this.y = y;
    this.size = size;

    this.vx = Math.random() * 3 + 1;
    this.angle = 0;

    this.isHiding = false;
    this.targetX = null;
    this.targetY = null;

    this.birdBody = document.createElement("img");
  }

  renderBird() {
    this.birdBody.src = "images/bird.png";
    this.birdBody.style.position = "absolute";
    this.birdBody.style.width = this.size + "px";
    this.birdBody.style.height = this.size + "px";

    document.querySelector(".sky").appendChild(this.birdBody);
    this.updatePosition();
  }

  animateBird() {
    this.move();
    requestAnimationFrame(this.animateBird.bind(this));
  }

  move() {

    if (this.isHiding) {
      this.moveTowardTarget();
      return;
    }

    this.x += this.vx;
    this.y = this.startY + Math.sin(this.angle) * 15;
    this.angle += 0.05;

    if (this.x > window.innerWidth) {
      this.x = -this.size;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.birdBody.style.left = this.x + "px";
    this.birdBody.style.top = this.y + "px";
  }

  hideBehindNearestFlower(flowers) {

    let closest;
    let minDist = 99999;

    for (let i = 0; i < flowers.length; i++) {

      let fx = flowers[i].x;
      let fy = window.innerHeight - flowers[i].stemLength;

      let dx = fx - this.x;
      let dy = fy - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDist) {
        minDist = dist;
        closest = flowers[i];
      }
    }

    if (closest) {
      this.isHiding = true;
      this.targetX = closest.x;
      this.targetY = closest.flowerPetalDiv.getBoundingClientRect().top;
    }
  }

  moveTowardTarget() {

    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;

    this.x += dx * 0.05;
    this.y += dy * 0.05;

    this.updatePosition();
  }

  returnToSky() {

    this.isHiding = false;
    this.targetX = null;
    this.targetY = null;

    this.startY = 50 + Math.random() * 100;
  }
}
