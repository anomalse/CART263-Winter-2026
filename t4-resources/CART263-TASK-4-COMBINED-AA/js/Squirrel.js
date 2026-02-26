class Squirrel
{
    constructor(x, y, size, color)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.waiting = true;
        this.waitTimer = this.randomInt(50, 250);
        this.speed = this.randomInt(2, 8);
        this.targetCoordinates = 
        {
            x: 400,
            y: 400
        }

        this.squirrelImg = document.createElement("img");
        this.squirrelImg.src = "assets/images/squirrel.png";
        this.squirrelImg.classList.add("squirrelImg");

        // This is for TEAM D
        this.nutsCollected = 0;

        let self = this;
    }
    renderSquirrel()
    {
        this.squirrelImg.style.position = "absolute";
        this.squirrelImg.style.width = this.size + "px";
        this.squirrelImg.style.width = this.size + "px";
        this.squirrelImg.style.color = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        this.squirrelImg.style.left = this.x + "px";
        this.squirrelImg.style.top = this.y - this.size + "px";
        document.getElementsByClassName("grass")[0].appendChild(this.squirrelImg);
    }
    animateSquirrel()
    {
        if (this.waitTimer <= 0)
        {
            this.waiting = false;
            this.waitTimer = this.randomInt(50, 250);
            this.targetCoordinates.x = this.randomInt(0, window.screen.width);
            this.targetCoordinates.y = this.randomInt(400, window.innerHeight - 400);
            this.speed = this.randomInt(2, 8);
        }

        if (this.waiting)
            this.waitTimer--;
        else
        {
            let dx = this.targetCoordinates.x - this.x;
            let dy = this.targetCoordinates.y - this.y;

            let distance = Math.sqrt(dx * dx + dy * dy)

            if (distance <= this.speed) {
                // Snap to target
                this.x = this.targetCoordinates.x;
                this.y = this.targetCoordinates.y;
                this.waiting = true;
            } else {
                // Normalize direction
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
    
            if (this.x === this.targetCoordinates.x && this.y === this.targetCoordinates.y)
                this.waiting = true;
        }


        requestAnimationFrame(() => 
        {
            this.animateSquirrel();
            this.renderSquirrel();
        });
    }

    randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min) ) + min
    }
}