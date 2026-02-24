setup_C();
/** THEME: SERENITY  */
function setup_C() {
  //Philippe,Amélie,Joyce
  console.log("in c");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_C`, "ani_canvC", aniA, aniB, aniC, aniD);

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

    let bounds = parentCanvas.getBoundingClientRect();
    let numClicks = 0; // for number of clicks
    let circles = []; // empty array of circles
    let colors = [
      "#ff7474",
      "#5b4747",
      "#508d0a",
      "#1c6399",
      "#ff7474",
      "#5b4747",
      "#508d0a",
      "#1c6399",
      "#ff7474",
      "#5b4747",
      "#508d0a",
      "#1c6399"];

    setupSketch();
    parentCanvas.addEventListener("click", colourHandler);

    function setupSketch() {
      for (let i = 12; i > 0; i--) {
        let circle = document.createElement("div");
        circle.classList.add("TEAM_C_circle");
        circle.style.width = i * 30 + "px";
        circle.style.height = i * 30 + "px";
        circle.style.borderRadius = i * 30 / 2 + "px";
        circle.style.left = bounds.width / 2 + "px";
        circle.style.top = bounds.height / 2 + "px";
        circle.style.backgroundColor = colors[i];
        circle.style.transform = "translate(-50%, -50%)";
        parentCanvas.appendChild(circle);
        circles.push(circle);
      }
    }
    // when mouse is clicked
    function colourHandler() {
      if (numClicks < 10) {
        numClicks++;
      } else {
        numClicks = 0;
      }
      console.log(numClicks)

      for (let i = 0; i < circles.length; i++) {
        if (i % numClicks === 0) {
          circles[i].style.opacity = 0.5;
        } else {
          circles[i].style.opacity = 1;
        }
      }
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
    //check with others

    //gradient colours
    let gradiantColours = [
      "rgb(9, 40, 20)",
      "rgb(9, 50, 20)",
      "rgb(9, 60, 20)",
      "rgb(9, 70, 20)",
      "rgb(9, 80, 20)",
      "rgb(9, 90, 20)",
      "rgb(9, 100, 20)",
      "rgb(9, 100, 40)",
      "rgb(9, 100, 60)",
      "rgb(9, 100, 80)",
      "rgb(9, 100, 100)",
      "rgb(9, 100, 120)",
      "rgb(9, 100, 140)",
      "rgb(29, 100, 140)",
      "rgb(49, 100, 140)",
      "rgb(69, 100, 140)",
      "rgb(89, 100, 140)",
      "rgb(109, 100, 140)",
      "rgb(129, 100, 140)",
      "rgb(149, 100, 140)",
      "rgb(169, 100, 140)",
      "rgb(189, 100, 140)",
      "rgb(209, 100, 140)",
      "rgb(229, 100, 140)"
    ];

    let circles = [];
    let bounds = parentCanvas.getBoundingClientRect();
    let offset = 30;
    // let lastHovered = undefined;

    //calls grid of circles
    for (let i = 0; i < bounds.width / 30; i++) {
      circles.push([]); // create rows
      for (let j = 0; j < bounds.height / 30; j++) {
        let circle = document.createElement("div");
        circle.classList.add("TEAM_C_grid");
        circle.style.left = offset + i * 25 + "px";
        circle.style.top = offset + j * 25 + "px";
        circle.style.width = "18px";
        circle.style.height = "18px";
        circle.style.opacity = 1;
        parentCanvas.appendChild(circle);
        circles[i].push(circle); // create columns

        circle.setAttribute("gradiantchange", 0);
        circle.addEventListener("mousemove", hoverHandler(i, j));
      }
    }

    //handles the mouseover/mousemove that triggers the gradient change
    function hoverHandler(thisI, thisJ) {
      return function () {
        // if (lastHovered === undefined) {
        //   lastHovered = [thisI, thisJ];
        // }
        // if (lastHovered[0] !== thisI || lastHovered[1] !== thisJ) {
        //   lastHovered = [thisI, thisJ];
        //   for (let i = 0; i < circles.length; i++) {
        //     for (let j = 0; j < circles[0].length; j++) {
        //        resetGradient(i, j);
        //     }
        //   }
        // }
        for (let i = 0; i < circles.length; i++) {
          for (let j = 0; j < circles[0].length; j++) {
            if (isSelf(thisI, thisJ, i, j) || isNeighbour(thisI, thisJ, i, j)) {
              changeGradient(i, j);
              if (isSelf(thisI, thisJ, i, j)) {
                changeSize(i, j, 2)
              }
              if (isNeighbour(thisI, thisJ, i, j)) {
                changeSize(i, j, 1)
              }
            }
            // else {
            //   resetGradient(i, j);
            // }
          }
        }
      }
    };

    function isSelf(thisI, thisJ, i, j) {
      return (
        (i === thisI) &&
        (j === thisJ)
      )
    }

    function isNeighbour(thisI, thisJ, i, j) {
      return (
        (i === thisI - 1 || i === thisI || i === thisI + 1) &&
        (j === thisJ - 1 || j === thisJ || j === thisJ + 1) && !(isSelf(thisI, thisJ, i, j))
      )
    }

    function changeGradient(i, j) {
      let gradientAtt = parseInt(circles[i][j].getAttribute("gradiantchange"));
      circles[i][j].setAttribute("gradiantchange", gradientAtt + 1);
      //help cycling through the gradiantColours infinitely
      circles[i][j].style.background = gradiantColours[Math.min(gradientAtt, gradiantColours.length - 1)];
      // circles[i][j].innerHTML = circles[i][j].getAttribute("gradiantchange")
      // console.log("gradiantchange", i, j)
    }

    // function resetGradient(i, j) {
    //   circles[i][j].style.background = gradiantColours[0];
    //   circles[i][j].setAttribute("gradiantchange", 0);
    // }

    function changeSize(i, j, delta) {
      let sizeAtt = parseInt(circles[i][j].style.width.replace("px", ""))
      let maxSize = 60;

      if (sizeAtt < maxSize) {
        circles[i][j].style.width = `${sizeAtt + delta}px`;
        circles[i][j].style.height = `${sizeAtt + delta}px`;
        circles[i][j].style.borderRadius = `${sizeAtt + 10 + delta}px`;
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

  function aniC(parentCanvas) {
    console.log("in ani-C -teamC");

    let drops = [];
    let bounds = parentCanvas.getBoundingClientRect();
    let offset = 30;

    // rgba for a white background
    let r = 255;
    let g = 255;
    let b = 255;
    let a = 1;

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("c-down");
      e.preventDefault()

      let droplet = document.createElement("div");
      droplet.classList.add("TEAM_C_droplet");
      droplet.style.left = Math.random() * bounds.width - 10 + "px";
      droplet.style.top = Math.random() * bounds.height - 10 + "px";
      droplet.style.width = "18px";
      droplet.style.height = "20px";
      droplet.style.opacity = 1;
      parentCanvas.appendChild(droplet);
      drops.push(droplet);

    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");

      let dropletTwo = document.createElement("div");
      dropletTwo.classList.add("TEAM_C_droplet_two");
      dropletTwo.style.left = Math.random() * bounds.width - 10 + "px";
      dropletTwo.style.top = Math.random() * bounds.height - 10 + "px";
      dropletTwo.style.width = "9px";
      dropletTwo.style.height = "11px";
      dropletTwo.style.opacity = 1;
      parentCanvas.appendChild(dropletTwo);
      drops.push(dropletTwo);

      // background starts off white
      document.querySelector("#ani_canvC_C").style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;

      // transitions slowly to very dark blue with a nice little purple moment
      // uses math.max as a protection so that r,g and b don't go under 0
      r = Math.max(r - 2, 0)
      g = Math.max(g - 4, 0)
      b = Math.max(b - 1.5, 0)
      console.log(r)
      console.log(g)
      console.log(b)
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
    console.log("in ani-D -teamC");
    // reference code from https://codingtechroom.com/question/make-object-move-in-circle 

    // //gradient colours
    // let gradiantColours = [
    //   "rgb(30, 39, 145)",
    //   "rgb(44, 67, 176)",
    //   "rgb(51, 100, 192)",
    //   "rgb(66, 123, 210)",
    //   "rgb(76, 154, 221)",
    //   "rgb(100, 182, 238)",
    // ];

    let circles = [];
    let bounds = parentCanvas.getBoundingClientRect();
    let offset = 30;

    //calls grid of circles
    for (let i = 0; i < bounds.width / 30; i++) {
      circles.push([]); // create rows
      for (let j = 0; j < bounds.height / 30; j++) {
        let circle = document.createElement("div");
        circle.classList.add("TEAM_C_c_grid");
        circle.style.left = offset + i * 25 + "px";
        circle.style.top = offset + j * 25 + "px";
        circle.style.width = "18px";
        circle.style.height = "18px";
        circle.style.opacity = 1;
        // circle.style.transform = "translate(-50%, -50%)";
        parentCanvas.appendChild(circle);
        circles[i].push(circle); // create columns

        // circle.setAttribute("gradiantchange", 1);
      }
    }

    // simple ripple animator: compute radial offset on the fly
    requestAnimationFrame(animate);

    function animate(time) {
      bounds = parentCanvas.getBoundingClientRect();
      const cx = bounds.width / 2;
      const cy = bounds.height / 2;

      const speed = 0.005; // ripple speed
      const amplitude = 4; // pixels to move in/out
      const wavelength = 20; // spacing of wavefront

      for (let i = 0; i < circles.length; i++) {
        for (let j = 0; j < circles[0].length; j++) {
          const el = circles[i][j]; //circle element
          const gx = offset + i * 25; //grid x
          const gy = offset + j * 25; //grid y
          const dx = gx - cx; // distance x
          const dy = gy - cy; // distacnme y
          const baseD = Math.sqrt(dx * dx + dy * dy); // calculates the squareroot for the base distance
          const angle = Math.atan2(dy, dx); // calculates the angle 

          const phase = time * speed - baseD / wavelength; // calculates the anim phase
          const r = baseD + Math.sin(phase) * amplitude; // calculates radius
          const x = cx + r * Math.cos(angle); // calculates x position
          const y = cy + r * Math.sin(angle); // calvulates y position

          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        }
      }

      requestAnimationFrame(animate);
    }
  }
}