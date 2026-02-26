class Nut {

    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.nut = document.createElement("img");
        this.isPickedUp = false;

    }
    renderNut() {
        this.nut.src = "media/nut.png";
        this.nut.classList.add("nut");
        this.nut.style.left = this.x + "px";
        this.nut.style.top = this.y + "px";
        this.nut.style.width = this.size + "px";
        this.nut.style.position = "absolute";
        this.nut.style.filter = "hue-rotate(" + this.color + "deg)";
        console.log("rendering");
        document.getElementsByClassName("grass")[0].appendChild(this.nut);

    }
    pickUp(squirrel, squirrelNum) {
        let squirrelBody = squirrel.squirrelImg.getBoundingClientRect();
        let nutSpot = this.nut.getBoundingClientRect();
        if (Math.hypot((nutSpot.x + (nutSpot.width / 2)) - (squirrelBody.x + (squirrelBody.width / 2)), (nutSpot.y + (nutSpot.height / 2)) - (squirrelBody.y + (squirrelBody.height / 2))) < this.size / 2 + squirrel.size / 2 && this.isPickedUp == false) {
            this.isPickedUp = true;
            this.nut.style.filter = "brightness(" + 5000 + "%)";
            squirrel.nutsCollected ++;
            console.log("squirrel " + squirrelNum +  " has " + squirrel.nutsCollected + " nut(s)");
        }
        
    }
}