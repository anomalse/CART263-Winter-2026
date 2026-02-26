class Weather {
  constructor(state, temp) {
    this.state = state;
    this.temp = temp;     
  }

  renderWeather() {
    if (this.state === "rainy") {
      this.renderRainy();
    }
    else if (this.state === "sunny") {
      this.renderSunny();
    }
    else if (this.state === "cloudy") {
      this.renderCloudy();
    }
  }

  renderRainy() {
    // Remove old rain if exists
    const oldRain = document.querySelector(".rain-layer");
    if (oldRain) oldRain.remove();
    // Remove old clouds if exists
    const oldClouds = document.querySelectorAll(".cloud");
    oldClouds.forEach(cloud => cloud.remove());

    // Darken sky
    const sky = document.querySelector(".sky");
    if (sky) {
      sky.style.background = "rgb(40, 60, 90)";
    }

    // Create full screen rain layer
    const rainLayer = document.createElement("div");
    rainLayer.classList.add("rain-layer");

    // Heavy rain (300 drops)
    for (let i = 0; i < 300; i++) {
      const drop = document.createElement("div");
      drop.classList.add("raindrop");

      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = 0.3 + Math.random() * 0.4 + "s";
      drop.style.animationDelay = Math.random() * 2 + "s";

      rainLayer.appendChild(drop);
    }
    //
    document.body.appendChild(rainLayer);
  }

  renderSunny() {
    // Remove rain layer if exists
    const oldRain = document.querySelector(".rain-layer");
    if (oldRain) oldRain.remove();
    // Remove old clouds if exists
    const oldClouds = document.querySelectorAll(".cloud");
    oldClouds.forEach(cloud => cloud.remove());

    // Brighten sky
    const sky = document.querySelector(".sky");
    if (sky) {
      sky.style.background = "rgb(83, 154, 240)";
    }
  }

  renderCloudy() {
    // Remove rain layer if exists
    const oldRain = document.querySelector(".rain-layer");
    if (oldRain) oldRain.remove();
    // Remove old clouds if exists
    const oldClouds = document.querySelectorAll(".cloud");
    oldClouds.forEach(cloud => cloud.remove());
    // Gray sky
    const sky = document.querySelector(".sky");
    if (sky) {
      sky.style.background = "rgb(120, 120, 120)";
    }
    // Add clouds
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
      cloud.style.left = Math.random() * 100 + "vw";
      cloud.style.top = Math.random() * 50 + "px";
      cloud.style.width = 100 + Math.random() * 100 + "px";
      cloud.style.height = 60 + Math.random() * 40 + "px";
      document.body.appendChild(cloud);
    } 
  }

  
}