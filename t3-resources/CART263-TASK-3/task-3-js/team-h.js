setup_H();
function setup_H() {
  console.log("in h");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_H`, "ani_canvH", aniA, aniB, aniC, aniD);

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
    console.log("in aniA -teamH");

    // //create a button element
    let button = document.createElement("div");
    button.classList.add("TEAM_H_box");
    button.textContent = "CLICK";
    parentCanvas.appendChild(button);

    let numClicks = 0; // for number of clicks
    // let aniRef = null;
    let circles = []; //empty array of circles
    // let aniSpeed = 1;

    //call to setup the animation before running
    setupSketch();
    //add event listener to the button
    button.addEventListener("click", changeGridHandler);

    function setupSketch() {
      //offset
      let offset = 60;
      //make a grid of circles - STATIC
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          //make some shapes ;) - using divs
          let circle = document.createElement("div");
          circle.classList.add("TEAM_H_circle");
          circle.style.width = `20px`;
          circle.style.height = `20px`;
          circle.style.left = offset + i * 25 + "px";
          circle.style.top = offset + j * 25 + "px";
          parentCanvas.appendChild(circle);
          circles.push(circle);
        }
      }
    }

    //when mouseiSClicked
    function changeGridHandler() {
      if (numClicks < circles.length - 2) {
        numClicks++;
      } else {
        numClicks = 0;
      }

      this.textContent = numClicks;

      //only animate evry second one
      for (let i = 0; i < circles.length; i++) {
        if (i % numClicks === 0) {
          console.log("here");
          circles[i].style.opacity = 0;
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
    console.log("in aniB -teamH");

    let sampleColors = [
      "red",
      "purple",
      "orange",
      "magenta",
      "black",
      "white",
      "green",
      "yellow",
      "pink",
      "lime",
      "maroon",
      "teal",
      "navy",
      "olive",
      "grey",
      "fuchsia",
    ];

    //get the rendered bounding Box of parent and use the width and height
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    console.log(boundingBoxParent);

    //make a grid of cells
    for (let i = 20; i < boundingBoxParent.width; i += 20) {
      for (let j = 20; j < boundingBoxParent.height; j += 20) {
        //create a div and place in the grid
        let rect = document.createElement("div");
        rect.classList.add("TEAM_H_h_cell");
        parentCanvas.appendChild(rect);
        rect.style.left = `${j}px`;
        rect.style.top = `${i}px`;
        rect.style.width = "10px";
        rect.style.height = "10px";
        rect.style.opacity = 1;
        rect.setAttribute("activenum", 0);

        //add an event listener to each div...
        rect.addEventListener("mousemove", clickEventHandlerOnRec);
      }
    }

    /****** callback for click on a rect in the grid **********/
    function clickEventHandlerOnRec() {
      // //"this" is the element that the mouse is over on

      let activenumAtt = parseInt(this.getAttribute("activenum"));
      if (activenumAtt < sampleColors.length) {
        //add ONE set interval call for each rect when it is clicked
        this.setAttribute("activenum", activenumAtt + 1);
        this.style.background = sampleColors[activenumAtt];
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
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
    console.log("in aniC -teamH");

    //set background color  of canvas
    parentCanvas.style.backgroundColor = "rgb(175, 47, 83)";
    let randomWords = ["dew", "more", "hoops", "now", "super", "kick"];

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      //add a new word when we press space
      if (e.code === "Space") {
        console.log("h-space down");
        let newWord = document.createElement("span");
        let randomIndex = Math.floor(Math.random() * randomWords.length);

        newWord.textContent = randomWords[randomIndex];
        newWord.classList.add("TEAM_H_h_word");
        parentCanvas.appendChild(newWord);
      }
      //remove a word when we press backspace
      else if (e.code === "Backspace") {
        console.log("h-backspace down");
        let words = document.querySelectorAll(".TEAM_H_h_word");
        if (words.length !== 0) {
          words[words.length - 1].remove();
        }
      }
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      //code for key down in here
      if (e.code === "Space") {
        console.log("space up");
        console.log("h-space up");
      }
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D ************************************ */
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
    console.log("in aniD -teamH");

    let sampleColors = [
      "red",
      "purple",
      "orange",
      "magenta",
      "black",
      "green",
      "yellow",
      "pink",
      "lime",
      "maroon",
      "teal",
      "navy",
      "olive",
      "grey",
      "fuchsia",
    ];

    //get the rendered bounding Box of parent and use the width and height
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfellipses = [];

    //make a grid of cells
    for (let i = 20; i < boundingBoxParent.width; i += 20) {
      for (let j = 20; j < boundingBoxParent.height; j += 20) {
        //create a div and place in the grid
        let ellipse = document.createElement("div");
        ellipse.classList.add("TEAM_H_h_cell_D");
        parentCanvas.appendChild(ellipse);
        ellipse.style.left = `${j}px`;
        ellipse.style.top = `${i}px`;
        ellipse.style.width = "10px";
        ellipse.style.height = "10px";
        ellipse.style.opacity = 1;
        ellipse.style.background =
          sampleColors[parseInt(Math.random() * sampleColors.length)];
        ellipse.setAttribute("ani-dir", "1");
        ellipse.setAttribute("ani-go", "false");
        arrayOfellipses.push(ellipse);
        setTimeout(function(){ellipse.setAttribute("ani-go","true")},Math.random()*5000)
      }
    }

  requestAnimationFrame(animate)


    /****** callback for requestAnimationFrame **********/
    function animate() {
      for (let i = 0; i < arrayOfellipses.length; i++) {
        if (arrayOfellipses[i].getAttribute("ani-go") === "true") {
          let dir_of_ani = parseInt(arrayOfellipses[i].getAttribute("ani-dir"));
          let currentSize = parseInt(arrayOfellipses[i].style.width);
          //console.log(currentSize)
          if (currentSize > 25 || currentSize < 2) {
            dir_of_ani *= -1;
            arrayOfellipses[i].setAttribute("ani-dir", dir_of_ani);
          }
          arrayOfellipses[i].style.width = currentSize + 1 * dir_of_ani + "px";
          arrayOfellipses[i].style.height = currentSize + 1 * dir_of_ani + "px";
          arrayOfellipses[i].style.borderRadius =
            currentSize + 1 * dir_of_ani + "px";
        }
      }
      //recall animation loop
      requestAnimationFrame(animate);
    }
  }
}
