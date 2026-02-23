class BeeHive {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.height = Math.round(size * 1.35);
    this.color = color;
    this.beehiveDiv = document.createElement("div");
    this.stripes = [];
    this.holeDiv = document.createElement("div");
    this.rotation = 0; // actual hive rotation
    this.angle = 1; // x in sine function
    this.beeCounter = 0;
  }
  beeEntered() {
    this.beeCounter++; // increase number of bees inside
  }
  displayBeeCount() {//will display number of bee in
    const h3 = this.holeDiv.querySelector("h3");//find h3 element inside the hole of beehiveeeeee
    h3.textContent = this.beeCounter;//update text to match current bee count
    h3.style.color = "rgba(244, 195, 110, 1)";/// make the text visible once you click on hive like emile said(alpha from 0 → 1 to over css )
  }

  rotateHives() {
    this.rotation = Math.sin(this.angle) * 10; // last multiplier = amplitude
    this.angle += 0.02; // rythm

    this.beehiveDiv.style.rotate = this.rotation + "deg"; //updates the rotation of the hives
  }

  renderBeeHive() {
    this.beehiveDiv.classList.add("beehive");
    this.beehiveDiv.style.width = this.size + "px";
    this.beehiveDiv.style.height = this.height + "px";
    this.beehiveDiv.style.left = this.x + "px";
    this.beehiveDiv.style.top = this.y + "px";
    this.beehiveDiv.style.background = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
    this.beehiveDiv.style.rotate = this.rotation + "deg";

    this.beehiveDiv.innerHTML = "";
    this.stripes = [];
    const stripeCount = 5;
    for (let i = 0; i < stripeCount; i++) {
      const stripe = document.createElement("div");
      stripe.classList.add("beehive__stripe");
      stripe.style.top = i * (this.height / stripeCount) + "px";
      this.beehiveDiv.appendChild(stripe);
      this.stripes.push(stripe);
    }

    this.holeDiv.innerHTML = `<h3>${this.beeCounter}</h3>`;

    this.holeDiv.classList.add("beehive__hole");
    this.beehiveDiv.appendChild(this.holeDiv);
    //STEP 6
    this.beehiveDiv.addEventListener("click", () => {
      this.displayBeeCount(); //call function that displays number
    });
    const grass = document.querySelector(".grass");
    const sky = document.querySelector(".sky");
    (sky || grass)?.appendChild(this.beehiveDiv);
  }


}