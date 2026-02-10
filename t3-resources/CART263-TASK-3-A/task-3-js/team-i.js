setup_I();
function setup_I() {
  //Ima (was teamA changed to I) (A and B)
  //Yann (C) - ** small bugs but should be working now
  console.log("in i");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_I`, "ani_canvI", aniA, aniB, aniC, aniD);

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
    console.log("in ani-A -teamI");

    let calmWords = [
      "peaceful",
      "quiet",
      "soothe",
      "hush",
      "serene",
      "tranquil",
      "quiet",
      "calm",
      "appease",
      "lull",
      "still",
      "relax",
      "solace"
    ];

    let button = document.createElement("div")
    button.classList.add("TEAM_I_Btn");
    button.textContent = "CLICK";
    parentCanvas.appendChild(button);

    setupSketch();


    button.addEventListener("click", randomCalmWords);

    function setupSketch() {


      //setting the width and the height of the canvas
      let width = parentCanvas.clientWidth;
      let height = parentCanvas.clientHeight;

      //creating an element to allow the words to appear
      let clmWord = document.createElement("span");

      //Setting the word randomly starting with the top and left coordinates
      clmWord.style.top = Math.floor(Math.random() * (height - 21)) + "px";
      clmWord.style.left = Math.floor(Math.random() * (width - 62)) + "px";

      clmWord.textContent = calmWords[Math.floor(Math.random() * calmWords.length)];
      clmWord.classList.add("TEAM_I_Word");
      parentCanvas.appendChild(clmWord);

    }

    function randomCalmWords() {

      let oldWords = document.querySelectorAll(".TEAM_I_Word");

      for (let i = 0; i < oldWords.length; i++) {


        oldWords[i].remove()
      }

      setupSketch();


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
    console.log("in ani-B -teamI");

    let blueCircle = document.createElement("div");
    blueCircle.classList.add("TEAM_I_Blue_Cirle");
    parentCanvas.appendChild(blueCircle);

    let baseSize = 40;
    let maxSize = 400;
    let minOpacity = 0.3;

    parentCanvas.addEventListener("mousemove", (e) => {
      let rect = parentCanvas.getBoundingClientRect();

      // Mouse position relative to canvas
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      // Center of canvas
      let centerX = rect.width / 2;
      let centerY = rect.height / 2;

      // Distance from center
      let dx = mouseX - centerX;
      let dy = mouseY - centerY;
      let distance = dx * dx + dy * dy;

      // Max possible distance (corner)
      let maxDistance = centerX * centerX + centerY * centerY;

      // Normalize 0 → 1
      let ratio = Math.min(distance / maxDistance, 1);

      // Size & opacity based on distance
      let size = baseSize + ratio * (maxSize - baseSize);
      let opacity = 1 - ratio * (1 - minOpacity);

      blueCircle.style.width = `${size}px`;
      blueCircle.style.height = `${size}px`;
      blueCircle.style.opacity = opacity;
    });

    // Reset when mouse leaves canvas
    parentCanvas.addEventListener("mouseleave", () => {
      blueCircle.style.width = `${baseSize}px`;
      blueCircle.style.height = `${baseSize}px`;
      blueCircle.style.opacity = 1;
    });




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
    console.log("in ani-C -teamI");

    // /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    // windowKeyDownRef = function (e) {
    //   //code for key down in here
    //   console.log(e);
    //   console.log("i-down");
    // };

    // /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    // windowKeyUpRef = function (e) {
    //   console.log("i-up");
    //   console.log(e);
    // };
    // //DO NOT REMOVE
    // window.addEventListener("keydown", windowKeyDownRef);
    // window.addEventListener("keyup", windowKeyUpRef);


    // make sure stamps position correctly inside this canvas
    // parentCanvas.style.position = "relative";
    // parentCanvas.style.overflow = "hidden";

    // mousemove = paint
    parentCanvas.addEventListener("mousemove", paintGlow);

    function paintGlow(e) {
      // "this" is the parentCanvas because the event listener is attached to it
      const rect = this.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const stamp = document.createElement("div");
      stamp.classList.add("TEAM_A_glowStamp");

      // position the stamp
      stamp.style.left = x + "px";
      stamp.style.top = y + "px";

        //sabine added :)
      stamp.style.width = `15px`
      stamp.style.height = `15px`
      stamp.style.position = `absolute`

      // random color
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      stamp.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      // stamp.style.boxShadow = `0 0 12px rgb(${r}, ${g}, ${b})`;

      this.appendChild(stamp);

      // // fade out, then remove
      // setTimeout(() => {
      //   stamp.style.opacity = "0";
      // }, 10);

      // setTimeout(() => {
      //   stamp.remove();
      // }, 800);
    }

  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add 
   * 
   any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  function aniD(parentCanvas) {
    console.log("in ani-D -teamI");
  }
}
