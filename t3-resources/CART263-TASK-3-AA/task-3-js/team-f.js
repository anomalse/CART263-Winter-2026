setup_F();
/** THEME: JOY 
 * A: abi
 * B: Noureddine
 * C: Ahmad
 */
function setup_F() {
  console.log("in f");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_F`, "ani_canvF",aniA,aniB,aniC,aniD);

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

    parentCanvas.style.position = "relative";
    parentCanvas.style.overflow = "hidden";
    parentCanvas.innerHTML = ""; 

    let currentY=10;

    parentCanvas.addEventListener("mouseover", ()=>{
    parentCanvas.style.backgroundColor = "#000000";
    });

    parentCanvas.addEventListener("mouseout", ()=>{
    parentCanvas.style.backgroundColor = "white";
    });
    
    parentCanvas.addEventListener("click", ()=>{

      const randomColor= `rgb(
      ${Math.floor(Math.random()* 256)},
      ${Math.floor(Math.random()* 256)},
      ${Math.floor(Math.random()* 256)}
    )`;

    for (let x=0; x< parentCanvas.offsetWidth; x+=50){
      const ellipse = document.createElement("div");

      ellipse.style.width = "10px";
      ellipse.style.height = "10px";
      ellipse.style.borderRadius = "50%";
      ellipse.style.position = "absolute";
      ellipse.style.left = x+ "px";
      ellipse.style.top = currentY + "px";
      ellipse.style.backgroundColor = randomColor;
      
  
      parentCanvas.appendChild(ellipse);

    }
    currentY += 20;

    });
  }



  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ... 
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
  console.log("team F aniB running");

  // waits mouse clicks on the canvas
  parentCanvas.addEventListener("click", function (e) {
    // createss  new div
    const emoji = document.createElement("div");

    // emoji 
    const emojis = ["🎉", "✨", "😄", "💛", "⭐️", "🎈"]; ;
    // randomizes the text content to the random emoji
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
// puts emoji inside mycanvas
    emoji.style.position = "absolute";
    //emoji size (made it bigger)
    emoji.style.fontSize = "40px";

    // puts emoji where mouse was clicked (theres a bug where if you click on the emoji it will place on the top left corner)
    emoji.style.left = e.offsetX + "px";
    emoji.style.top = e.offsetY + "px";
    // draws emoji
    parentCanvas.appendChild(emoji);
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
      console.log("in ani-C -teamE");
      //const container = document.querySelector("#ani_canvE_C")
      parentCanvas.style.overflow = "hidden";

      let size = 25;

      function randomColor(){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
            
    /*** CALLBACK FOR KEY DOWN */
    windowKeyDownRef = function (e) {
      if (e.key === "ArrowUp"){
        size += 5;
        e.preventDefault()
      }
      else if (e.key === "ArrowDown"){
        if (size < 5){
          size = 5;
        }
        size -= 5;
        e.preventDefault()
      }
      else if (e.key === " "){
        parentCanvas.innerHTML = "";
        e.preventDefault()
      }
      else if (e.key === "Enter"){
        parentCanvas.style.backgroundColor = randomColor();
      }
      else {
        const box = document.createElement("div");
        box.style.width = size + "px";
        box.style.height = size + "px";
        box.style.backgroundColor = randomColor();
        box.style.position = "absolute";
        box.style.left = Math.random() * (parentCanvas.offsetWidth - size) + "px";
        box.style.top = Math.random() * (parentCanvas.offsetHeight - size) + "px";
        parentCanvas.appendChild(box);
      }

  };

    /*** CALLBACK FOR KEY UP */
    windowKeyUpRef = function (e) {

    };

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
      console.log("in ani-D -teamF");
    }

}