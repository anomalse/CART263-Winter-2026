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
    console.log("in ani-A -teamC");
    let Newbutton = document.createElement("button");

    Newbutton.id = 'cool-button';
    Newbutton.classList.add('stupid-button');

    Newbutton.textContent= 'Click';
    parentCanvas.appendChild(Newbutton);
    console.log("in ani-A -teamC");

    Newbutton.addEventListener("click", function (e){
      //creating div
      let guuContainer = document.createElement("div");
      //creating image
      let guu = document.createElement("img");
      //chaging attributes
      guu.id = "guu"
      guu.setAttribute("src","guu.gif");
      guu.setAttribute("width","350px")
      guu.setAttribute("height","100%")

      
      guuContainer.setAttribute("width","100%")
      guuContainer.setAttribute("height","100%")
      guuContainer.id = "guuGrid"

      //parenting
      parentCanvas.appendChild(guuContainer);
      guuContainer.appendChild(guu)

      //changing button textContent
      Newbutton.textContent = '1'


    })
    for (let i= 1; i<2; i++){


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
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");
    };
    //DO NOT REMOVE
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
   