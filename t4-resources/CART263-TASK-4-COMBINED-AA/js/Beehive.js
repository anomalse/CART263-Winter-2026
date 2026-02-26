class Beehive {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hiveDiv = document.createElement("img");
        // Rotation increment
        this.rotationInc = (Math.random() * (0.8 - 0.6)) + 0.6;
        // Rotation value
        this.rotation = 0;
        // Rotation direction(either right or left)
        this.rotatingDir = "right";
    }

    renderHive() {
        this.hiveDiv.src = "media/beehive.png"
        this.hiveDiv.style.position = "absolute"
        this.hiveDiv.style.left = this.x + "px";
        this.hiveDiv.style.top = this.y + "px";
        this.hiveDiv.style.width = this.width + "px";
        this.hiveDiv.style.height = this.height + "px";
        // Add to the DOM
        document.querySelector(".sky").appendChild(this.hiveDiv);
    }

    move() {
        if (this.rotation <= -10) {
            this.rotatingDir = "right"
        }
        if (this.rotation >= 40) {
            this.rotatingDir = "left"
        }
        if (this.rotatingDir === "right") {
            this.rotation += this.rotationInc
        }
        if (this.rotatingDir === "left") {
            this.rotation -= this.rotationInc
        }
        //console.log(this.rotation);
        this.hiveDiv.style.transform = `rotate(${this.rotation}deg)`
    }

}