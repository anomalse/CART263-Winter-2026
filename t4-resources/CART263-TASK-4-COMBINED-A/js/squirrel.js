/**TO DO:
// 1. Create a file to hold a Squirrel Class (i.e. Squirrel.js)
2. Create the Squirrel Class : a constructor which takes a position, size and color as parameters
3. Create a renderSquirrel() method -> which essentially creates a HTML element(s) - could be
an image element :) or an svg .... representing a Squirrel... (see Sun or Flower for inspiration)
4. Create an animateSquirrel() method in the Squirrel class - which will make a given Squirrel move around the garden - use the requestAnimationFrame()
5. In garden.js add 5 new Squirrels to the garden (in an array) - all different sizes and colors and in different positions
and then call the animateSquirrel() method on all the Squirrels
6. Implement a counter to keep track of how many nuts any given squirrel has picked up (SEE TEAM D for collab)  
*/

class Squirrel {

    constructor(x, y, width, height, path) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.squirrelBody = document.createElement("img");
        this.squirrelBody.src = path
        this.vx = Math.random() * 2 + 1;
        this.vy = Math.random() * 2 + 1;
        this.nutsCollected = 0;
    }

    renderSquirrel() {
        this.squirrelBody.classList.add("squirrel");
        this.squirrelBody.style.width = this.width + "px";
        this.squirrelBody.style.height = this.height + "px";
        this.squirrelBody.style.left = this.x + "px";
        this.squirrelBody.style.top = this.y + "px";
        // this.squirrelBody.style.background = `rgb(${this.color.r},${this.color.g},${this.color.b})`; ---- commented out because not using color anymore

        //add to the DOM
        document.getElementsByClassName("grass")[0].appendChild(this.squirrelBody);
    }

  // Check collision and pick up nut
    tryPickupNut(nut) {
        if (nut.picked) return;
        let nutRect = nut.nutBody.getBoundingClientRect();
        let squirrelRect = this.squirrelBody.getBoundingClientRect();
        let d = distance(nutRect.x, nutRect.y, squirrelRect.x, squirrelRect.y);
        if (d < Math.max(this.width, nut.width)) {
            nut.pickup();
            this.nutsCollected++;
        }
    }
    
    // Move the squirrel according to its velocity
    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off right edge
        if (this.x + this.width >= window.innerWidth) {
            this.vx *= -1; // flips to negative so the squirrel goes left now
        }

        // Bounce off left edge
        if (this.x <= 0) {
            this.vx = this.vx * -1; // flips to positive so the squirrel goes right now
        }

        let bottomOfGrass = document.querySelector(".grass").getBoundingClientRect().height

        // Bounce off bottom edge
        if (this.y + this.width >= bottomOfGrass) {
            this.vy *= -1; // flips to negative so the squirrel goes up now
            this.y += this.vy;
        }

        // Bounce off top edge of grass
        if (this.y + (this.width / 2) < 0) {
            this.vy *= -1; // flips to negative so the squirrel goes down now
            this.y += this.vy;
        }

        this.squirrelBody.style.left = this.x + "px";
        this.squirrelBody.style.top = this.y + "px";
    }

}


function distance(x0, y0, x1, y1) {
  return Math.hypot(x1 - x0, y1 - y0);
}