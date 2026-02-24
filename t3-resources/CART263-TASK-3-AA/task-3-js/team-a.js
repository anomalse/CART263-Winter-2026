setup_A();
/** THEME: CALM  */
/*Lanna, Aliyah, Sophia*/
function setup_A() {
  console.log("in a");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_A`, "ani_canvA",aniA,aniB,aniC,aniD);
  
  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas) {
    let newParticle = [];
    let dir = [1, -1];
    let prtclNum = 0;
    let prtclSpeed = []
    let pinkShades = [
      "#FFC0CB", //grey blue first
      "#E94196",
      "#FF69B4",
      "#FF00FF",
      "#F4C2C2",
      "#F88379",
      "#FFB7C5 ",
      "#FF1493",
      "#E30B5C"
    ];
    console.log("in ani-A -teamA");
    parentCanvas.addEventListener("click", displayParticle);

    window.requestAnimationFrame(animate);
    function animate() {
      if (newParticle.length > 0) {
        for (let i = 0; i < newParticle.length; i++) {
          moveParticles(newParticle[i], prtclSpeed[i]);
          checkBounds(parentCanvas, newParticle[i], prtclSpeed[i]);
          // console.log(newParticle[i].style.left)
          // console.log(newParticle[i].style.left);
        }
      }
      ;
      window.requestAnimationFrame(animate);
    }
    /**
     * Triggered on Mouse Clicked
     */
    function displayParticle(eventObj) {
      let canvasBounds = parentCanvas.getBoundingClientRect();
      let x = eventObj.clientX - canvasBounds.x;
      let y = eventObj.clientY - canvasBounds.y;

      prtclSpeed.push(createParticleSpeed());
      newParticle.push(createParticles());
      newParticle[prtclNum].style.left = `${x}px`;
      newParticle[prtclNum].style.top = `${y}px`;
      newParticle[prtclNum].style.background = `${pinkShades[Math.floor(Math.random() * pinkShades.length)]}`;
      prtclNum++;
      // console.log(document.querySelectorAll(".TEAM_A_ANI_A_particle"))
    }

    function moveParticles(particles, s) {
      particles.style.left = parseInt(particles.style.left) + s.speedX + "px";
      particles.style.top = parseInt(particles.style.top) + s.speedY + "px";

    }
    function createParticleSpeed() {
      let newSpeed = {
        speedX: (Math.floor(Math.random() * (3 - 1)) + 1) * dir[Math.floor(Math.random() * dir.length)],
        speedY: (Math.floor(Math.random() * (3 - 1)) + 1) * dir[Math.floor(Math.random() * dir.length)]
      }
      return newSpeed
    }
    function checkBounds(parent, p, s) {
      let bounds = parent.getBoundingClientRect();
      let pWidth = p.getBoundingClientRect().width;
      let pHeight = p.getBoundingClientRect().height;
      if (parseInt(p.style.left) > (bounds.right - bounds.x - pWidth)) {
        s.speedX *= -1;

      } else if (parseInt(p.style.left) < bounds.left - bounds.x) {
        s.speedX *= -1;
      }

      if (parseInt(p.style.top) > bounds.bottom - bounds.y - pHeight) {
        s.speedY *= -1;

      } else if (parseInt(p.style.top) < bounds.top - bounds.y) {
        s.speedY *= -1;
      }
    }

    function createParticles() {
      let particleDiv = document.createElement("div")
      particleDiv.classList.add("TEAM_A_ANI_A_particle");
      document.querySelector("#ani_canvA_A").appendChild(particleDiv);
      return particleDiv;
    }

  }


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
      console.log("in ani-B -teamA");
      document.addEventListener("mousemove", mouseMove);

    function mouseMove(eventObj) {
      //get the rendered bounding Box of parent and use the width and height
      let boundingBoxParent = parentCanvas.getBoundingClientRect();
      // console.log(boundingBoxParent);

      // To track the mouse positions
      let offsetX = eventObj.clientX - boundingBoxParent.x;
      let offsetY = eventObj.clientY - boundingBoxParent.y;

      // if statement to keep the log from checking outside of bounds
      if (
        offsetX >= 0 &&
        offsetX <= boundingBoxParent.width &&
        offsetY >= 0 &&
        offsetY <= boundingBoxParent.height
      ) {
        createHearts(offsetX, offsetY);
      }
    }

    // function to create the heart
    function createHearts(offsetX, offsetY) {
      let heart = document.createElement("div");
      heart.className = "arrow-heart";
      heart.textContent = "💘 ";
      heart.style.left = offsetX + "px";
      heart.style.top = offsetY + "px";
      parentCanvas.appendChild(heart);
    }
    
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
      console.log("in ani-C -teamA");

    let chocolate = document.createElement("div"); //creates a new div calls it button, not yet visible
    chocolate.classList.add("TEAM_A_chocolate"); //connects css to this new div and variable named button
    chocolate.id = "chocolate"; //assign id
    chocolate.setAttribute("draggable", true);
    parentCanvas.appendChild(chocolate); //parent canvas is a placeholder variable for canvas in buttonsAndFrame, adds child node to existing DOM element i.e. to canvas we def in CSS, now our shit pops up on canvas

    let lips = document.createElement("div"); //creates a new div calls it button, not yet visible
    lips.classList.add("TEAM_A_lips"); //connects css to this new div and variable named button
    lips.id = "lips"; //assign id
    parentCanvas.appendChild(lips); //parent canvas is a placeholder variable for canvas in buttonsAndFrame, adds child node to existing DOM element i.e. to canvas we def in CSS, now our shit pops up on canvas

    let handleDragging = function (event) {
      //same as function handleDragging(event) {}, event makes it so an event object is created w a lot of info w what happened
      console.log("on drag");
      console.log(event.target.id); //what has started to be dragged

      // Clear all prev drag data in cache (for all formats/types)
      event.dataTransfer.clearData();
    };
    window.addEventListener("dragstart", handleDragging); //when dragstart (this is a javascript thing) run handleDragging

    //combined the function and event listener can seperate them if you even want to do something complicated to dragover
    window.addEventListener("dragover", function (event) {
      //dragover fire as you drag an element over a target, it's like hover while dragging, what is happening when an element is being dragged, need to have this if you want drop to work
      console.log("over");
      event.preventDefault(); //allows the drop to happen
    });

    let handleDrop = function (event) {
      event.preventDefault(); //tells brower to override default, default allows for no drops
      console.log("dropped");
      console.log(event); //gives info on Drag Event

      if (event.target.id === "lips") {
        //if our draggable obj is dropped over the HTML and CSS dropTarget then do this stuff
        let theObj = event.dataTransfer.getData("objDraggedID"); //get the data from drag start i.e. the name of the obj and call this obj
        console.log(theObj); //write the name of the obj

        //stores prev lip position
        const oldLeft = lips.offsetLeft;
        const oldTop = lips.offsetTop;

        //move chocolate to lip spot
        chocolate.style.left = oldLeft + "px";
        chocolate.style.top = oldTop + "px";

        //move lips somewhere random
        const randomLeft = Math.floor(
          Math.random() * (parentCanvas.clientWidth - lips.offsetWidth),
        );
        const randomTop = Math.floor(
          Math.random() * (parentCanvas.clientHeight - lips.offsetHeight),
        );

        lips.style.left = randomLeft + "px";
        lips.style.top = randomTop + "px";
      }
    };
    window.addEventListener("drop", handleDrop); //when drop (Javascript thing) run handleDrop

    let handleDraggingStop = function (event) {
      console.log("on stop");
      //HERE :: the event target refers to the object being dragged...
      console.log(event.target.id);
      // HERE - this refers to the window
      console.log(this); //this about what object the listener was attached to
    };
    window.addEventListener("dragend", handleDraggingStop);

    // Create the overlay inside the chocolate div
    let overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(255,255,255,1)"; // solid white
    overlay.style.mixBlendMode = "luminosity"; // makes the overlay control brightness
    overlay.style.pointerEvents = "none"; // allows drag through
    chocolate.appendChild(overlay);

    // --- Key callbacks ---
    windowKeyDownRef = function (e) {
      if (e.key === "ArrowDown") {
        overlay.style.filter = "grayscale(100%)"; // instantly B&W
        overlay.style.opacity = "0.5"; // control visibility of the overlay
      }
    };

    windowKeyUpRef = function (e) {
      if (e.key === "ArrowUp") {
        overlay.style.filter = "none"; // back to color
        overlay.style.opacity = "0"; // hide overlay
      }
    };

    // register listeners
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
   function aniD(parentCanvas) {
  console.log("in ani-D -teamA");
    let numOfDots = 80;
    let heart = {
      size: 100,
      growthRate: 1,
      minSize: 30,
      maxSize: 100,
      growing: false,
      colorFactor: 2,
      g: 24,
      b: 101
    }
    //let heartSize = 100;
    let newHeartParticles = [];


    let canvasBounds = parentCanvas.getBoundingClientRect();
    console.log("in ani-D -teamA");

    window.requestAnimationFrame(animate);

    function animate() {
      moveHeart();
      // for (let i = 0; i < numOfDots; i++) {
      //   let angle = 360 / numOfDots * i
      //   let x = ((Math.sqrt(2) * Math.pow(Math.sin(angle), 3)) * heart.size) + canvasBounds.width / 2 - heart.size / 10
      //   let y = ((Math.pow(-Math.cos(angle), 3) - (Math.pow(Math.cos(angle), 2)) + 2 * Math.cos(angle)) * -heart.size) + canvasBounds.height / 2 - heart.size / 2
      //   newHeartParticles.push(createHeartParticles());
      //   newHeartParticles[i].style.left = x + "px"
      //   newHeartParticles[i].style.top = y + "px"
      //   // console.log(newHeartParticles[i].style.left)
      //   // console.log(heart.size)
      // }
      // for (let i = 0; i < newHeartParticles.length; i++) {
      //   moveHeart(newHeartParticles[i]);
      // }
      for (let i = 0; i < numOfDots; i++) {
        let angle = 360 / numOfDots * i
        let x = ((Math.sqrt(2) * Math.pow(Math.sin(angle), 3)) * heart.size) + canvasBounds.width / 2 - heart.size / 10
        let y = ((Math.pow(-Math.cos(angle), 3) - (Math.pow(Math.cos(angle), 2)) + 2 * Math.cos(angle)) * -heart.size) + canvasBounds.height / 2 - heart.size / 2
        newHeartParticles[i].style.left = x + "px"
        newHeartParticles[i].style.top = y + "px"
        newHeartParticles[i].style.background = `rgb(235,${heart.g},${heart.b})`
      }
      window.requestAnimationFrame(animate);
    }
    for (let i = 0; i < numOfDots; i++) {
      let angle = 360 / numOfDots * i
      let x = ((Math.sqrt(2) * Math.pow(Math.sin(angle), 3)) * heart.size) + canvasBounds.width / 2 - heart.size / 10
      let y = ((Math.pow(-Math.cos(angle), 3) - (Math.pow(Math.cos(angle), 2)) + 2 * Math.cos(angle)) * -heart.size) + canvasBounds.height / 2 - heart.size / 2
      newHeartParticles.push(createHeartParticles());
      newHeartParticles[i].style.left = x + "px"
      newHeartParticles[i].style.top = y + "px"
      // console.log(newHeartParticles[i].style.left)
      // console.log(heart.size)
    }

    function moveHeart() {
      if (heart.size >= heart.maxSize) {
        heart.growing = false;
      }
      if (heart.size <= heart.minSize) {
        heart.growing = true;
      }
      if (!heart.growing) {
        heart.size -= heart.growthRate;
        heart.g += heart.colorFactor;
        heart.b += heart.colorFactor;
      }
      if (heart.growing) {
        heart.size += heart.growthRate;
        heart.g -= heart.colorFactor;
        heart.b -= heart.colorFactor;
      }
    }
    function createHeartParticles() {
      let particleDiv = document.createElement("div")
      particleDiv.classList.add("TEAM_A_ANI_A_heartPoint");
      parentCanvas.appendChild(particleDiv);
      return particleDiv;
    }

    }
}