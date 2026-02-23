class Bird {

    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;

        this.baseY = y;

        this.speedX = 5;
        this.hopSpeed = 1;
        this.time = Math.random() * 10;

        this.birdImg = document.createElement("img");

        this.isInGrass = false;

        if (this.color === "white") {
            this.birdImg.src = "assets/white-bird.png";
        }
        else {
            this.birdImg.src = "assets/black-bird.png";
        }
    }

    renderBird() {
        this.birdImg.classList.add("bird");
        this.birdImg.style.position = "absolute";
        this.birdImg.style.width = this.size + "px";
        this.birdImg.style.height = "auto";

        // start in sky
        document.querySelector(".sky").appendChild(this.birdImg);
        this.isInGrass = false;

        this.updateDivPos();
    }

    updateDivPos() {
        this.birdImg.style.left = this.x + "px";
        this.birdImg.style.top = this.y + "px";
    }

    animateBird(weather) {
        let self = this;

        function move() {
            let state = weather.currentState;

            // hot
            if (state === weather.hotState) {
                if (self.isInGrass) {
                    document.querySelector(".sky").appendChild(self.birdImg);
                    self.isInGrass = false;
                    self.baseY = 60 + Math.random() * 140;
                }
                self.time += 0.1;
                self.x += self.speedX;
                self.y = self.baseY + Math.sin(self.time) * 20;
            }
            // rainy
            else if (state === weather.rainyState) {
                if (self.isInGrass) {
                    document.querySelector(".sky").appendChild(self.birdImg);
                    self.isInGrass = false;
                    self.baseY = 60 + Math.random() * 140;
                }
                // slower than sunny
                self.time += 0.05;
                self.x += self.speedX * 0.2;
                self.y = self.baseY + Math.sin(self.time) * 10;
            }
            // cold
            else if (state === weather.coldState) {
                if (!self.isInGrass) {
                    document.querySelector(".grass").appendChild(self.birdImg);
                    self.isInGrass = true;
                    self.y = 20;
                }
                self.time += 0.12;
                self.x += self.hopSpeed;
                self.y = 20 + Math.abs(Math.sin(self.time)) * 10;
            }

            // loop birds on screen
            if (self.x > window.innerWidth) {
                self.x = -50;
            }
            self.updateDivPos();
            requestAnimationFrame(move);
        }
        requestAnimationFrame(move);
    }
}