setup_C();
/** THEME: SERENITY  */
function setup_C() {
  console.log("in c");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_C`, "ani_canvC",aniA,aniB,aniC,aniD);

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
    let Newbutton = document.createElement("button");

    Newbutton.id = 'cool-button';
    Newbutton.classList.add('stupid-button');



    Newbutton.textContent= 'Click';
    parentCanvas.appendChild(Newbutton);
    console.log("in ani-A -teamC");

    //changing button textContent
    let guuNumberCounter = 1;
    //creating container
    let guuContainer = document.createElement("div");
    
    
    //creating grid
    guuContainer.classList.add("guuGrid")
    guuContainer.style.width = "100%"
    guuContainer.style.height = "auto"
    guuContainer.style.display = "grid"
    
    
    Newbutton.addEventListener("click", function (e){
      
      //creating image
      let guu = document.createElement("img");
      //chaging attributes
      guu.classList.add("guuImage")      
      guu.style.display = "block"
      guu.style.width = "100%"
      guu.style.height = "100%"
      guu.setAttribute("src","guu.gif");
      

      

      //increasing gridsize along with clicks
      let gridSize = Math.ceil(Math.sqrt(guuNumberCounter));
      guuContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

      //parenting
      guuContainer.appendChild(guu)
      parentCanvas.appendChild(guuContainer);
      
      Newbutton.textContent = guuNumberCounter
      //fucntion to update button
      function updateStupidButton(){
        document.getElementById("cool-button").innerHTML = guuNumberCounter
      }
      
      //increasing number on button
      function incrementAC(){
        guuNumberCounter++
        updateStupidButton();
        console.log("shit is updated")
      }

      incrementAC();

    })
    
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

  console.log("in ani-B -teamC");

  const container = document.querySelector("#ani_canvC_B");
  const can = document.querySelector("aniCanvas");
  const sun = document.createElement("div"); 
  container.appendChild(sun)
  sun.classList.add("aniCanvas"); 

  /* set scene */
  // canvas 
  container.style.background="cornflowerblue";
  container.style.filter="brightness(150%);"

  // sun 
    let scale = 0.5; 
    sun.style.width = `0`+"px";
    sun.style.height = `10`+"px";
    sun.style.borderRadius = `50%`;
    sun.style.position=`absolute`; 
    sun.style.top=`50%`;
    sun.style.left=`50%`; 
    sun.style.transform="translate(-50%, -50%)";
    sun.style.boxShadow =
      '0 0 60px 50px #fff, ' +
      '0 0 140px 90px #0ff,' +
      '0 0 10px 30px #f0f';
    sun.style.border=`none`;
    sun.style.background="white";//`linear-gradient(rgba(${255}, ${240}, ${32}), rgba(${255}, ${85}, ${0}))`;


  // listen for mouse movement
  container.addEventListener('mousemove', function(event) {

      // get canvas
      const world = container.getBoundingClientRect(); // gets ani_canvC_B

      // get mousex, mousey, and distance from orgin 
      const mouseX = event.clientX - world.left; // left is the left pos of container. serves as point 0 for the grid
      const mouseY = event.clientY - world.top;
      const dist = getDistance(mouseX, mouseY, (container.offsetWidth/2), (container.offsetWidth/2))
      
      // live update the scene 
      scale = 2.5-dist/100; // the amount of change that happens for the distance 
      console.log(scale)
      sun.style.boxShadow =
      `0 0 ${90*scale}px ${50*scale}px #fff,` +
      `0 0 ${60*scale}px ${60*scale}px #0ff,` +
      `0 0 ${140*scale}px ${30*scale}px #f0f`;
      //sun.style.width = `${30*scale}`+"px";    

      let mappedCol = 250-(mouseY*(250/container.offsetWidth)); // maps the mouseY from 0 - 250 
      let alph = (container.offsetWidth-world.left)
      container.style.background =`linear-gradient(
      rgba(${20},${0},${30}),  
      rgba(${100},${149},${237}),  
      rgba(${20},${0},${30}) )`;//`rgba(${100},${100},${40})`;

    });

  
    /* Gets distance between x1, y1 and point x2, y2 using pythagorean theorem */
    function getDistance(x1, y1, x2, y2) { 
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); // gets positive distance between x1, x2, & y1, y2 then finds length of hypotenues of the two to get diagonal distance 
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
      console.log("in ani-C -teamC");

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("c-down");
      if (e.code === "Space") holdingSpace = true;
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");
      if (e.code === "Space") holdingSpace = false;
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);

    drawScene();
    animate();
  }


  let waves;

  function drawScene(){
    var c = document.getElementById("ani_canvC_C");
    c.classList.add("TEAM_C_SKY");
    c.style.display = "block";
    
    var sand = document.createElement('div');
    sand.classList.add("TEAM_C_SAND");
    c.appendChild(sand);

    var sun = document.createElement('div');
    sun.classList.add("TEAM_C_SUN");
    c.appendChild(sun);

    var dark = document.createElement('div');
    dark.classList.add("TEAM_C_DARK");
    c.appendChild(dark);

    var med = document.createElement('div');
    med.classList.add("TEAM_C_MED");
    c.appendChild(med);

    var light = document.createElement('div');
    light.classList.add("TEAM_C_LIGHT");
    c.appendChild(light);

    var white = document.createElement('div');
    white.classList.add("TEAM_C_WHITE");
    c.appendChild(white);

    // store the divs in global var
    waves = [
      { level: med, offset: 0, delay: 0 },
      { level: light, offset: 0, delay: 120 },
      { level: white, offset: 0, delay: 240 }
    ];
  }


  const MAX_MOVE = 40;   // how far waves move
  const SPEED = 0.12;   // easing speed
  let holdingSpace = false;
  let wasHoldingSpace = false; 
  let startTime = null; // the time since the animation began

function animate(time) {
  // time = milliseconds since the page started rendering
  // provided by browser when requestAnimationFrame is called

  // Initialize startTime the first frame
  if (startTime === null) {
    startTime = time;
  }

  // check if the user has changed holding/not holding space and if so, restart the animation
  if (wasHoldingSpace !== holdingSpace) {
    startTime = time; 
  }

  // move the waves 
  for (var i = 0; i < waves.length; i++) {

    var wave = waves[i];

    // calculate the time that has passed since the animation started 
    var elapsedTime = time - startTime;

    // subtracts the wave’s individual delay, waves move staggered
    var timeAfterDelay = elapsedTime - wave.delay;

    // only move if it is this wave's turn to move (delay is over) 
    if (timeAfterDelay > 0) {
      // move in different directions depending on space bar 
      if (holdingSpace) {
        // pull toward ocean (up)
        var distanceToTarget = MAX_MOVE - wave.offset;
        var moveAmount = distanceToTarget * SPEED; // move SPEED% of distance remaining, creates smooth transition bcs distance is smaller and smaller every frame 
        wave.offset = wave.offset + moveAmount;
      } else {
        // push toward sand (down)
        var distanceBack = 0 - wave.offset;
        var moveBackAmount = distanceBack * SPEED;
        wave.offset = wave.offset + moveBackAmount;
      }
    }

    // move the wave 
    wave.level.style.transform = "translateY(" + (-wave.offset) + "px)";
  }

  // Remember previous state for next frame
  wasHoldingSpace = holdingSpace;

  requestAnimationFrame(animate);
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
    console.log("in aniD -teamC");
     
    const container = document.querySelector("#ani_canvC_D");
    container.classList.add("aniCanvas"); 
    container.style.overflow="hidden"; // hides extra dots 
    container.style.background="black"

    const dotCount = 90; 
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");

      dot.style.position = "absolute";
     //dot.style.width = 1 + "px";
     // dot.style.height = 1 + "px";
      dot.style.borderRadius = "50%";
      dot.style.background="cornflowerblue"; // color of dots 
      dot.style.left = "50%";
      dot.style.top = "50%";
      dot.style.transform = "translate(-50%, -50%)";
      dot.style.opacity = "0.8";
      dot.style.boxShadow =
          `0 0 ${30}px ${30}px cornflowerblue,` +
          `0 0 ${30}px ${30}px rgba(229, 115, 255, 1)`; 
       

      container.appendChild(dot);
      dots.push(dot);
    }

    let time = 0; 
    const r = 100;

    function animate() {
      time += 0.02; // speed 

      for (let i = 0; i < dots.length; i++) {
        const angle = (i / dotCount) * Math.PI * 4;

        const x = Math.cos(angle) *r + (container.offsetWidth / 2); // to centre it
        const y = Math.tan(angle) * r + (container.offsetHeight / 2);

        const wave = Math.cos(angle+time*0.5); // the angle changes 
        const scale = (wave)*0.8;
        const factor = 0.9; 

        // position the dots 
        dots[i].style.left = x + "px";
        dots[i].style.top = y + "px";
        dots[i].style.transform =`scale(${scale*1.8})`;
        dots[i].style.boxShadow =
          `0 0 ${100*scale*factor}px ${30*scale*factor}px cornflowerblue,` +
          `0 0 ${10*scale*factor}px ${30*scale*factor}px rgba(229, 115, 255, 1)`; 
       
      
      }
      requestAnimationFrame(animate);
    }

    animate();
    }
}
   