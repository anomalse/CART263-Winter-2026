class Bee {
    // Create a new Bee object
    constructor(x = 100, y = 100, width = 75, height = 75, tintColor = "transparent", returningBeehive = false, vx = 0, vy = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tintColor = tintColor;

        this.returningBeehive = false;

        // Make the wrapper div
        this.body = document.createElement("div");
        //velocitiy for bee
        this.vx = vx;
        this.vy = vy;
    }


    // Since I uploaded a PNG and we need to modify the color, I'll create a tint layer and mask out the transparent background
    renderBee() {
        // Wrapper div
        this.body.classList.add("bee");
        this.body.style.position = "absolute";
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";

        // Bee image
        let beeImg = document.createElement("img");
        beeImg.src = "./media/Bee.png";
        beeImg.style.width = "100%";
        beeImg.style.height = "100%";
        beeImg.style.objectFit = "contain";
        beeImg.style.position = "absolute"; // Stack it inside the wrapper

        // Tinted overlay
        let tintLayer = document.createElement("div");
        tintLayer.style.width = "100%";
        tintLayer.style.height = "100%";
        tintLayer.style.position = "absolute"; // Stack exactly on top of the image

        // Apply the color from the constructor parameter
        tintLayer.style.backgroundColor = this.tintColor;

        // Mask out the background so that only the bee is colored
        tintLayer.style.maskImage = "url('./media/Bee.png')";
        tintLayer.style.maskSize = "contain";
        tintLayer.style.maskRepeat = "no-repeat";//masks it so there isn't multiple masks
        tintLayer.style.maskPosition = "center";//centers the mask over the image

        // Blend the tint and bee colors
        tintLayer.style.mixBlendMode = "multiply";

        // Put it all together
        this.body.appendChild(beeImg);
        this.body.appendChild(tintLayer);
        document.getElementsByTagName("main")[0].appendChild(this.body);
    }

    returnBeehive(targetX, targetY) {
        console.log("returning");
        this.returningBeehive = true;

        //general input for beehive location, makes animate bee work
        this.targetX = targetX;
        this.targetY = targetY;

    }

    animateBee() {

        // returning movement
        if (this.returningBeehive) {
            //creates direction for returning movement
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.hypot(dx, dy);

            //how quickly return to beehive
            const speed = 4;

            //stops movement to beehive if arrived close enough
            if (dist < 5) {
                this.returningBeehive = false; // arrived
            }
            //nomal movement towards beehive
            else {
                this.x += (dx / dist) * speed;
                this.y += (dy / dist) * speed;
            }

        } else {
            // random movement around screen 

            this.vx += Math.random() * 0.4 - 0.2;
            this.vy += Math.random() * 0.4 - 0.2;

            this.x += this.vx;
            this.y += this.vy;
        }


        //update position
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";


        //keeping it inbound
        if (this.x < 0 || this.x > window.innerWidth - this.width) {
            this.vx *= -1;
        }

        if (this.y < 0 || this.y > window.innerHeight - this.height) {
            this.vy *= -1;
        }


        //callback so it keeps animating
        window.requestAnimationFrame(() => this.animateBee());

    }
}