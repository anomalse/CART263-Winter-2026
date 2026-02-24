setup_E();
/** THEME: SARCASM  */
function setup_E() {
  console.log("in e");
  //Norah and Leah
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_E`, "ani_canvE", aniA, aniB, aniC, aniD);

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
    console.log("in ani-A -teamE");

    let circles = []; //empty array of circles

    //call to setup the animation before running
    setupSketch();
    //add event listener to the button

    function setupSketch() {
      //offset
      let offset = 40;

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          let circle = document.createElement("div");
          circle.classList.add("TEAM_E_circle");

          let offset = 40;
          circle.style.width = "18px";
          circle.style.height = "18px";
          circle.style.left = offset + i * 20 + "px";
          circle.style.top = offset + j * 20 + "px";

          // store grid position
          circle.dataset.x = i;
          circle.dataset.y = j;

          parentCanvas.appendChild(circle);
          circles.push(circle);

          // click listener
          circle.addEventListener("click", () => rippleEffect(i, j));
        }
      }
    }

    function rippleEffect(cx, cy) {
      const maxRadius = 30; // how far the wave spreads

      circles.forEach((circle) => {
        let x = parseInt(circle.dataset.x);
        let y = parseInt(circle.dataset.y);

        // distance from clicked circle
        let dist = Math.abs(cx - x) + Math.abs(cy - y);

        if (dist <= maxRadius) {
          setTimeout(() => {
            circle.classList.remove("ripple"); // reset
            void circle.offsetWidth; // force reflow
            circle.classList.add("ripple");
          }, dist * 40); // delay creates wave effect
        }
      });
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
  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations

  function aniB(parentCanvas) {
    console.log("in ani-B-teamE");
    // when it's called it produces an image
    function createImage() {
      let image = document.createElement("img");
      image.src = "assets/image/clown.png";
      image.style.left = Math.random() * 300 + "px";
      image.style.top = "10px";
      parentCanvas.appendChild(image);
      image.classList.add("TEAM_E_Image");
      return image;
    }

    let clownArray = [];

    for (let clownCounter = 0; clownCounter < 15; clownCounter += 1) {
      // stardropcounter gets bigger by 1 each time until it hits 300
      clownArray.push({
        // speed of the stardrop
        speed: Math.random() * 20 + 10,
        // size referece for stars
        // colour of the star drop—stardrops are lighter colour
        image: createImage(),
      });
    }

    window.requestAnimationFrame(draw);

    function draw() {
      // raindrops
      moveClownArray();
      //ctx.drawImage(clown)
      window.requestAnimationFrame(draw);
    }

    function moveClownArray() {
      //for loop - for each rainDrop in the group move each one
      for (let position = 0; position < 15; position++) {
        clownArray[position].image.style.top =
          parseFloat(clownArray[position].image.style.top) +
          clownArray[position].speed +
          "px";
        if (parseFloat(clownArray[position].image.style.top) > 300) {
          // resetting the raindrop to the top
          console.log(position);
          clownArray[position].image.style.top = "0px";
          // you need to add [position] to get particular raindrop
        }
        // checking if the height is greater than the canvas height
        // manipulating properties of each raindrop

        // instead of putting number 0 or 1, we put position
      }
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

//   function aniC(parentCanvas) {
//     console.log("in aniC -teamE");

//     windowKeyDownRef = function (e) {
//       console.log(e);

//       let emoji = document.createElement("span");
//       emoji.textContent = "😐";
//       emoji.classList.add("TEAM_E_emoji");

//       emoji.style.position = "absolute";
//       emoji.style.left = Math.random() * (parentCanvas.clientWidth - 30) + "px";
//       emoji.style.top = Math.random() * (parentCanvas.clientHeight - 30) + "px";
//       emoji.style.fontSize = "32px";

//       parentCanvas.appendChild(emoji);
//     };

//     windowKeyUpRef = function (e) {
//       console.log("key up:", e.code);
//     };

//     window.addEventListener("keydown", windowKeyDownRef);
//     window.addEventListener("keyup", windowKeyUpRef);
//   }

//   /****************ANI D************************************ */
//   /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
//   /****************ANI D************************************ */
//   /**************** TASK *******************************************
//    * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
//    * 1: create a creative, visual pattern using text, divs as shapes, images ...
//    * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
//    *
//    * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
//    * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
//    * this is so that your styles are not overriden by other teams.
//    * NOTE::: All your code is to be added here inside this function -
//    * remember you can define other functions inside....
//    * Do not change any code above or the HTML markup.
//    * **/

//   function aniD(parentCanvas) {
//     console.log("in ani-D-teamE");

//     let button = document.createElement("div");
//     button.classList.add("TEAM_E_box");
//     button.textContent = "Click for Sarcasm";
//     parentCanvas.appendChild(button);

//     const rect = parentCanvas.getBoundingClientRect();
//     console.log(rect);
//     console.log(rect.width, rect.height, rect.left, rect.top);
//     const buttonRect = button.getBoundingClientRect();
//     console.log(buttonRect);
//     let sarcasmStrings = [
//       "I’m not saying I hate you, what I’m saying is that you are literally the Monday of my life.",
//       "Silence is golden. Duct tape is silver",
//       "I am busy right now, can I ignore you some other time",
//       "Find your patience before I lose mine.",
//       "It’s okay if you don’t like me. Not everyone has good taste.",
//       "Cancel my subscription because I don’t need your issues.",
//       "No, you don’t have to repeat yourself. I was ignoring you the first time.",
//       "I don’t have the energy to pretend to like you today.",
//       "My imaginary friend says that you need a therapist.",
//       "Sometimes I wish I was an octopus so I could slap eight people at once.",
//       "I’ll get over it. I just need to be dramatic first.",
//       "You’re everything I want in someone I don’t want anymore.",
//       "You play the victim. I’ll play the disinterested bystander.",
//     ];

//     button.addEventListener("click", changeSarcasmRemarks);

//     function changeSarcasmRemarks() {
//       let randomIndex = Math.floor(Math.random() * sarcasmStrings.length);
//       button.textContent = sarcasmStrings[randomIndex];
//     }
//   }
// }

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

  // aniC: Interactive pattern - keyboard shapes
  function aniC(parentCanvas) {
    console.log("in aniC -teamE");
    let colors = ["#e74c3c", "#8e44ad", "#3498db", "#f1c40f", "#2ecc71", "#e67e22", "#1abc9c"];
    windowKeyDownRef = function (e) {
      let shape = document.createElement("div");
      shape.classList.add("TEAM_E_shape");
      shape.style.position = "absolute";
      shape.style.width = "40px";
      shape.style.height = "40px";
      shape.style.borderRadius = e.keyCode % 2 === 0 ? "50%" : "0";
      shape.style.background = colors[Math.floor(Math.random() * colors.length)];
      shape.style.left = Math.random() * (parentCanvas.clientWidth - 40) + "px";
      shape.style.top = Math.random() * (parentCanvas.clientHeight - 40) + "px";
      shape.style.transition = "transform 0.5s";
      parentCanvas.appendChild(shape);
      setTimeout(() => {
        shape.style.transform = "scale(0.2) rotate(180deg)";
        shape.style.opacity = "0.2";
      }, 100);
      setTimeout(() => {
        shape.remove();
      }, 1200);
    };
    window.addEventListener("keydown", windowKeyDownRef);
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

  // aniD: Interactive pattern - animated bouncing balls, click to add more
  function aniD(parentCanvas) {
    console.log("in ani-D-teamE");
    let balls = [];
    let colors = ["#e74c3c", "#8e44ad", "#3498db", "#f1c40f", "#2ecc71", "#e67e22", "#1abc9c"];

    function createBall() {
      let ball = document.createElement("div");
      ball.classList.add("TEAM_E_ball");
      ball.style.position = "absolute";
      ball.style.width = "30px";
      ball.style.height = "30px";
      ball.style.borderRadius = "50%";
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = Math.random() * (parentCanvas.clientWidth - 30) + "px";
      ball.style.top = Math.random() * (parentCanvas.clientHeight - 30) + "px";
      ball.dx = Math.random() * 4 + 1;
      ball.dy = Math.random() * 4 + 1;
      parentCanvas.appendChild(ball);
      balls.push(ball);
    }

    // Add initial balls
    for (let i = 0; i < 5; i++) createBall();

    parentCanvas.addEventListener("click", createBall);

    function animate() {
      balls.forEach(ball => {
        let left = parseFloat(ball.style.left);
        let top = parseFloat(ball.style.top);
        left += ball.dx;
        top += ball.dy;
        if (left <= 0 || left >= parentCanvas.clientWidth - 30) ball.dx *= -1;
        if (top <= 0 || top >= parentCanvas.clientHeight - 30) ball.dy *= -1;
        ball.style.left = left + "px";
        ball.style.top = top + "px";
      });
      window.requestAnimationFrame(animate);
    }
    animate();
  }
}