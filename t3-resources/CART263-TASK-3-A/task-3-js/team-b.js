setup_B();
/** THEME: CHAOS  */
function setup_B() {
  //Émile, Dyna,Jeany
  console.log("in b");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_B`, "ani_canvB", aniA, aniB, aniC, aniD);

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
    console.log("in ani-A -teamB");


    // square grid
    let index = 0
    for (let r = 0; r < 2; r++) {
      for (let e = 0; e < 2; e++) {
        let parent = document.getElementById("ani_canvB_A");
        let back = document.createElement("div");
        back.classList.add("TEAM_B_backSquare" + index);
        back.style.width = `187.5px`;
        back.style.height = `187.5px`;
        parent.appendChild(back);
        index++
        back.style.left = ((r + 1) * 187.5) - 187.5 + "px";
        back.style.top = ((e + 1) * 187.5) - 187.5 + "px";
      }
    }

    // nested for loop for circles grid
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        //create a grid cell with a div
        let parent = document.getElementById("ani_canvB_A");
        let d = document.createElement("div");
        d.classList.add("TEAM_B_circle");
        d.style.width = `20px`;
        d.style.height = `20px`;
        parent.appendChild(d);


        d.style.left = (i + 1) * 25 + "px";
        d.style.top = (j + 1) * 25 + "px";
      }
    }

    let canvas = document.querySelector("#ani_canvB_A")
    canvas.addEventListener("click", changeDotColor)

    function changeDotColor(event) {

      let bounds = canvas.getBoundingClientRect();
      console.log(bounds)

      let mouseX = event.clientX - bounds.left
      let mouseY = event.clientY - bounds.top


      let color = "undefined";


      console.log(mouseX, mouseY, (bounds.width / 2), (bounds.height / 2))

      if (mouseX < (bounds.width / 2) && mouseY < (bounds.height / 2)) {
        color = 0
      }

      else if (mouseX < (bounds.width / 2) && mouseY > (bounds.height / 2)) {
        color = 1
      }

      else if (mouseX > (bounds.width / 2) && mouseY < (bounds.height / 2)) {
        color = 2
      }

      else if (mouseX > (bounds.width / 2) && mouseY > (bounds.height / 2)) {
        color = 3
      }


      for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 14; j++) {
          //create a grid cell with a div
          let parent = document.getElementById("ani_canvB_A");
          let d = document.createElement("div");
          d.classList.add("TEAM_B_circle" + color);
          d.style.width = `20px`;
          d.style.height = `20px`;
          parent.appendChild(d);
          console.log()

          d.style.left = (i + 1) * 25 + "px";
          d.style.top = (j + 1) * 25 + "px";
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
    console.log("in ani-B -teamB");

    // Set canvas bg colour +position
    parentCanvas.style.backgroundColor = "rgb(177, 194, 231)";//bg background so you can see what we working with+squares
    parentCanvas.style.position = "relative"; //to emile/dyna: maybe the circle issues with the first one was because we use absolute instead of relative?

    //random number ( this is what pick square size+random position+colour )
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    //create a square div 
    function createSquare(colorClass) {
      const square = document.createElement("div");
      square.className = colorClass; //choose a color from palette beore

      //assign random width and height to square
      const size = random(20, 60);
      square.style.width = size + "px";
      square.style.height = size + "px";

      //random position inside the container aka the parent
      const x = random(0, parentCanvas.clientWidth - size);//so no  overflow out canvas but could i remove for more chaoctic feel?
      const y = random(0, parentCanvas.clientHeight - size);
      square.style.left = x + "px";
      square.style.top = y + "px";

      parentCanvas.appendChild(square);
    }

    //draw random squares using colour classes made from first exercise
    function drawRandomSquares(amount) {
      const colorClasses = [
        "TEAM_B_backSquare0",
        "TEAM_B_backSquare1",
        "TEAM_B_backSquare2",
        "TEAM_B_backSquare3",
      ];
      //loop  to create multiple squares.
      for (let i = 0; i < amount; i++) {
        const colorClass = colorClasses[Math.floor(random(0, colorClasses.length))];//random pick colour
        createSquare(colorClass);
      }
    }

    //mouseover will be doing random squares
    parentCanvas.addEventListener("mouseover", function () {
      drawRandomSquares(10);//add 10 new square each time
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
    console.log("in ani-C -teamB");

    // selects the canvas and stores it in a variable
    let can = document.getElementById("ani_canvB_C")

    // gets the bounding info of the canvas zone
    let bounds = can.getBoundingClientRect();
    console.log(bounds)

    // info for the base grid
    let shapeNb = 25;
    let shapeRows = 5;
    let shapeCols = 5;

    // base grid nested for loop
    for (let i = 0; i < shapeCols; i++) {

      let shape = document.createElement("div");
      shape.classList.add("TEAM_B_shape");
      shape.style.width = bounds.width / 5 + "px"
      shape.style.height = bounds.height / 5 + "px"
      can.appendChild(shape);
      let topDist = i * bounds.height / 5 + "px"
      shape.style.top = topDist

      for (let y = 0; y < shapeRows; y++) {
        let shape = document.createElement("div");
        shape.classList.add("TEAM_B_shape");
        shape.style.width = bounds.width / 5 + "px"
        shape.style.height = bounds.height / 5 + "px"
        can.appendChild(shape);
        shape.style.top = topDist
        shape.style.left = y * bounds.width / 5 + "px"
      }

    }

    // text to explain the different keys
    let text = document.createElement("div")
    text.innerHTML = "<h4>'C' for Chaos & 'O' for Order</h4>";
    text.classList.add("TEAM_B_text");
    can.appendChild(text);

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {

      if (e.key === "c") {

        for (let i = 0; i < shapeNb; i++) {



          let shape = document.createElement("div");
          shape.classList.add("TEAM_B_chaosShape");
          shape.style.width = Math.random() * 30 + "px"
          shape.style.height = (bounds.bottom - bounds.top) / 30 + "px"
          shape.style.left = (Math.random() * ((bounds.right - 30) - bounds.left)) + "px"; // formula found on stackoverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
          shape.style.top = (Math.random() * ((bounds.bottom - 30) - bounds.top)) + "px";
          can.appendChild(shape)

        }

      }

      if (e.key === "o") {

        // info for the orderly grid
        let vertical = 10
        let horizontal = 10

        // nested for loop for the order grid.
        for (let i = 0; i < vertical; i++) {

          let shape = document.createElement("div");
          shape.classList.add("TEAM_B_orderShape");
          shape.style.width = "30px"
          shape.style.height = "30px"
          let topDist = i * 30 + (((bounds.bottom - bounds.top) / 5) / 2) + "px"
          let leftOffst = (((bounds.right - bounds.left) / 5) / 2)
          shape.style.top = topDist
          shape.style.left = leftOffst + "px"
          can.appendChild(shape);

          for (let y = 0; y < horizontal; y++) {
            let shape = document.createElement("div");
            shape.classList.add("TEAM_B_orderShape");
            shape.style.width = "30px"
            shape.style.height = "30px"
            can.appendChild(shape);
            shape.style.top = topDist
            shape.style.left = y * 30 + leftOffst + "px"
          }

        }

      }
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {

      // nested for loop for the base grid to hide what we already drew.
      for (let i = 0; i < shapeCols; i++) {

        let shape = document.createElement("div");
        shape.classList.add("TEAM_B_shape");
        shape.style.width = bounds.width / 5 + "px"
        shape.style.height = bounds.height / 5 + "px"
        can.appendChild(shape);
        let topDist = i * bounds.height / 5 + "px"
        shape.style.top = topDist

        for (let y = 0; y < shapeRows; y++) {
          let shape = document.createElement("div");
          shape.classList.add("TEAM_B_shape");
          shape.style.width = bounds.width / 5 + "px"
          shape.style.height = bounds.height / 5 + "px"
          can.appendChild(shape);
          shape.style.top = topDist
          shape.style.left = y * bounds.width / 5 + "px"
        }

      }

      // text to explain the different keys + the hold options appear here
      let text = document.createElement("div")
      text.innerHTML = "<h4>'C' for Chaos & 'O' for Order <br> HOLD FOR MORE CHAOS</h4>";
      text.classList.add("TEAM_B_text");
      can.appendChild(text);

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
    console.log("in ani-D -teamB");
    //put color in array so i can reuse them 
    let colors = [
      "black",
      "black",
      "gray",
      "red"
    ];
    //size of the grid 
    let cols = 14;  // across
    let rows = 14;   // how many down

    let cellSize = 25;   //size of each square 

    let gap = 2; //space between squares 
    let time = 0; // keep track animation time 
    let cells = parentCanvas.children;

    //repeat  loop left to right 
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {

        // test : make one square appear
        let d = document.createElement("div"); //create div element (square)
        d.classList.add("TEAM_B_ANI_D_cell"); //so css can style 
        parentCanvas.appendChild(d);

        d.style.width = cellSize - (i % 3) * 3 + "px";
        d.style.height = cellSize - (i % 3) * 3 + "px";

        //place it so i can see it
        // move square to the rigth using i  
        d.style.left = i * (cellSize + gap) + "px"; //move rigth
        d.style.top = j * (cellSize + gap) + "px"; // move down
        //repeat colors by column 
        let colorIndex = i % colors.length; // base color per column  
        d.style.backgroundColor = colors[colorIndex];
      }
    }
    function animate() {
      //move time forward slowly 
      time += 0.008;
      //update every square frame   
      for (let i = 0; i < cells.length; i++) {
        let d = cells[i];
        // move  colors over time modulo 
        let colorIndex = (i + Math.floor(time * 2)) % colors.length;
        d.style.backgroundColor = colors[colorIndex];
      }

      requestAnimationFrame(animate);
    }
    // start animation once 
    animate();
  }

}