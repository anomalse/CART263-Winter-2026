setup_F();
//Ray and Jason
/** THEME: JOY  */
function setup_F() {
  console.log("in f");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_F`, "ani_canvF", aniA, aniB, aniC, aniD);

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
    console.log("in ani-A -teamF");
    const imgUrls = [];
    for (let i = 0; i < 10; i++) {
      imgUrls.push(`assets/${i}.jpg`)
    }
    let newElement = document.createElement('img');
    newElement.src = imgUrls[1];
    newElement.classList.add('TEAM_F_joyImg');
    parentCanvas.appendChild(newElement);
    parentCanvas.addEventListener('click', changeImgHandler);

    function changeImgHandler() {
      newElement.src = imgUrls[Math.floor(Math.random() * 10)];
    }
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
    console.log("in ani-B -teamF");

    // keep it inside the canvas
    parentCanvas.style.position = "relative";
    parentCanvas.style.overflow = "hidden";

    parentCanvas.addEventListener("mousemove", paintRainbow);

    function paintRainbow(e) {
      let canvas = this.getBoundingClientRect();
      let x = e.clientX - canvas.left;
      let y = e.clientY - canvas.top;

      // create dot
      let dot = document.createElement("div");
      dot.classList.add("TEAM_F_paintDot");
      dot.textContent = "🙂";

      // dot position
      dot.style.left = x + "px";
      dot.style.top = y + "px";

      // randomize colors
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      dot.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      this.appendChild(dot);

      setTimeout(() => {
        dot.style.opacity = "0";
      }, 10);

      setTimeout(() => {
        dot.remove();
      }, 1000);
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
    console.log("in ani-C -teamF");
    parentCanvas.style.overflow = "hidden";
    parentCanvas.style.background = "linear-gradient(to bottom, #1b0ce8 0%, #463bea 50%, #6157ec 70%, #ecdd7b 100%)";
    let sunY = 340;
    let sun = document.createElement('div');
    sun.classList.add('TEAM_F_sun');
    let rays = document.createElement('div');
    rays.classList.add('TEAM_F_rays');
    sun.appendChild(rays);
    parentCanvas.appendChild(sun);
    function updateSunPosition() {
      sun.style.top = sunY + "px";
    }
    updateSunPosition();

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //
      console.log(e);
      console.log("f-down");
      if (e.code === 'Space') {
        console.log('Space is pressed');
        e.preventDefault();
        sun.classList.add("active");
        if (sunY >= 40) {
          sunY = sunY - 20;
          updateSunPosition();
        };
      } else if (e.code === 'Backspace') {
        e.preventDefault();
        sun.classList.add("active");
        if (sunY <= 280) {
          sunY = sunY + 20;
          updateSunPosition();
        };
      }
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      if (e.code === 'Space' || e.code === 'Backspace') {
        sun.classList.remove("active");
      }
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
    console.log("in ani-D -teamF");

    // make sure canvas area is clean
    parentCanvas.innerHTML = "";

    // create canvas
    let canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    parentCanvas.appendChild(canvas);

    let ctx = canvas.getContext("2d");
    let t = 0; // time for animation

    // animation loop
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // face color
      ctx.fillStyle = "#FFD966";
      ctx.beginPath();

      // draw face not perfect so look hand made
      let cx = 200;
      let cy = 200;
      let r = 150;
      for (let a = 0; a < Math.PI * 2; a += 0.1) {
        let x = cx + (r + (Math.random() - 0.5) * 4) * Math.cos(a);
        let y = cy + (r + (Math.random() - 0.5) * 4) * Math.sin(a);
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // eyes move little bit
      let eyeMove = Math.sin(t * 3) * 2;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(140 + (Math.random() - 0.5) * 2, 150 + eyeMove, 20, 0, Math.PI * 2);
      ctx.arc(260 + (Math.random() - 0.5) * 2, 150 + eyeMove, 20, 0, Math.PI * 2);
      ctx.fill();

      // mouth change sad to happy
      let mouthCurve = Math.sin(t) * 50;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4 + Math.random();
      ctx.beginPath();
      ctx.moveTo(120, 270);
      ctx.quadraticCurveTo(200, 270 + mouthCurve, 280, 270);
      ctx.stroke();

      // update time and loop
      t += 0.02;
      requestAnimationFrame(draw);
    }

    // start animation
    draw();
  }
}