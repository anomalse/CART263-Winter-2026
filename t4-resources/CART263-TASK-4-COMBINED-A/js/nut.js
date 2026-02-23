class Nut {
    // Create a new nut object
    constructor(x, y, width, height, imageSrc = "assets/image/nut.jpg") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageSrc = imageSrc;
        this.vx = Math.random() * 5 + 1;
        this.vy = 0;
        this.nutBody = document.createElement("div");
        this.nutImage = document.createElement("img");
        this.picked = false;
    }

    // Display the nut and append its image
    renderNut() {
        if (this.picked) {
            this.nutBody.style.display = "none";
            return;
        }
        this.nutBody.classList.add("nut");
        this.nutBody.style.width = this.width + "px";
        this.nutBody.style.height = this.height + "px";
        this.nutBody.style.left = this.x + "px";
        this.nutBody.style.top = this.y + "px";
        this.nutBody.style.borderRadius = this.width + "px";

        this.nutImage.classList.add("nut-image");
        this.nutImage.src = this.imageSrc;
        if (!this.nutBody.contains(this.nutImage)) {
            this.nutBody.appendChild(this.nutImage);
        }

        // Add to the DOM
        if (!document.getElementsByClassName("grass")[0].contains(this.nutBody)) {
            document.getElementsByClassName("grass")[0].appendChild(this.nutBody);
        }
    }

    // Mark nut as picked up by a squirrel
    pickup() {
        this.picked = true;
        this.nutBody.style.display = "none";
    }
}