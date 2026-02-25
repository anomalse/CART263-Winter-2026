setup_D();
/** THEME: DECEPTION
 * Jordan and Huynh
  */
function setup_D() {
  console.log("in d");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_D`, "ani_canvD", aniA, aniB, aniC, aniD);

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
    console.log("in ani-A -teamD");

    const rainbow = [
      "#eb0781",
      "#ff75bf",
      "#a622ec",
      "#9500ff3c",
      "#06069a",
      "#0000ff",
      "#1bc8db",
      "#40ff00",
      "#33c303",
      "#20d243b2",
      "#9bae0a",
      "#FFFF00",
      "#ffff53",
      "#ff5900",
      "#FF7F00",
      "#ac2626",
      "#FF0000",
    ];

    let button = document.createElement("div");
    button.classList.add("TEAM_D_box");
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
          circle.classList.add("TEAM_D_circle");
          circle.style.width = `20px`;
          circle.style.height = `20px`;
          circle.style.left = offset + i * 25 + "px";
          circle.style.top = offset + j * 25 + "px";
          parentCanvas.appendChild(circle);
          circles.push(circle);
          circle.setAttribute(
            "ani-dir-circle-dir",
            parseInt(Math.random() * 5),
          );

          // Color-changing interval for each circle
          var currentColor = 0;
          setInterval(() => {
            circle.style.backgroundColor = rainbow[currentColor];
            circle.style.borderColor = rainbow[currentColor];
            currentColor++;
            if (currentColor >= rainbow.length) {
              currentColor = 0;
            }
          }, 200);
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
        let direction = parseInt(circles[i].getAttribute("ani-dir-circle-dir"));

        if (
          parseInt(circles[i].style.width) > 75 ||
          parseInt(circles[i].style.width) < 5
        ) {
          direction *= -1;
          circles[i].setAttribute("ani-dir-circle-dir", direction);
        }

        circles[i].style.width =
          parseInt(circles[i].style.width) + 5 * direction + "px";
        circles[i].style.height =
          parseInt(circles[i].style.height) + 5 * direction + "px";

        if (i % numClicks === 0) {
          console.log("here");
          circles[i].style.opacity = 0.1;
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
    parentCanvas.style.background = "#000000";
      console.log("in ani-B -teamD");

      const grid = document.createElement("div");
      parentCanvas.appendChild(grid);
      grid.id = "grid";

      /**
       * Pattern options:
       */

      const patterns = ["+", "-", "*", "•", "×", "o"];

      // const patterns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

      // const patterns = ["\u25A0", "\u25A1", "\u25A2", "\u25A3", "\u25A4", "\u25A5"];

      // const patterns = ["0", "1"]

      /**
       * Color options:
       */

      let sampleColors = [
        "#FF6B6B",
        "#6BCB77",
        "#4D96FF",
        "#FFD93D",
        "#FF6F91",
        "#845EC2",
      ];

      // let sampleColors = ["#02ff17", "#00b418"];

      let boudingBoxParent = grid.getBoundingClientRect();
      /**
       * Create grid
       */
      for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 17; j++) {
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.textContent =
            patterns[Math.floor(Math.random() * patterns.length)];

          // random color as mouse hovers
          cell.addEventListener("mouseover", () => {
            const randomColor =
              sampleColors[Math.floor(Math.random() * sampleColors.length)];
            cell.style.color = randomColor;
          });

          // mouseover interaction
          cell.addEventListener("mouseover", () => {
            cell.classList.add("active");

            // remove effect after a moment
            setTimeout(() => {
              cell.classList.remove("active");
            }, 600);
          });

          grid.appendChild(cell);
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
    const table = document.createElement("div");
    parentCanvas.appendChild(table);
    table.id = "table";

    const card = document.createElement("div");
    table.appendChild(card);
    card.id = "card";

    // simple deck
    const cards = ["♠", "♥", "♦", "♣"];
    const numberOfCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let current = 0;
    let cardColor = ["#ff0000", "#000000"];

    /**
     * Space bar interaction to cycle through cards
     */

    // show first card
    card.textContent = cards[current];

    windowKeyDownRef = function (event) {
      if (event.code === "Space") {
        // space bar
        event.preventDefault();

        // change card
        let randomCard = cards[Math.floor(Math.random() * cards.length)];
        // change number
        let randomNumber =
          numberOfCards[Math.floor(Math.random() * numberOfCards.length)];
        // random combination
        card.textContent = randomCard + randomNumber;

        // random color
        let randomColor =
          cardColor[Math.floor(Math.random() * cardColor.length)];
        card.style.color = randomColor;

        // small feedback animation
        card.style.transform = "scale(1.1)";
        setTimeout(() => {
          card.style.transform = "scale(1)";
        }, 150);
      }
    };

    windowKeyUpRef = function (event) {
      if (event.code === "Space") {
        // space bar
        console.log(card.textContent);
      }
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
    //JORDAN4

    console.log("in ani-D -teamD");

    const rainbow = [
      "#eb0781",
      "#ff75bf",
      "#a622ec",
      "#9500ff3c",
      "#06069a",
      "#0000ff",
      "#1bc8db",
      "#40ff00",
      "#33c303",
      "#20d243b2",
      "#9bae0a",
      "#FFFF00",
      "#ffff53",
      "#ff5900",
      "#FF7F00",
      "#ac2626",
      "#FF0000",
    ];

    //get the rendered bounding Box of parent and use the width and height
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfellipses = [];

    //make a grid of cells
    for (let i = 10; i < boundingBoxParent.width; i += 10) {
      for (let j = 20; j < boundingBoxParent.height; j += 22.5) {
        //create a div and place in the grid
        let ellipse = document.createElement("div");
        ellipse.classList.add("TEAM_D_h_cell_D");
        parentCanvas.appendChild(ellipse);
        ellipse.style.left = `${j}px`;
        ellipse.style.top = `${i}px`;
        ellipse.style.width = "20px";
        ellipse.style.height = "30px";
        ellipse.style.opacity = 1;
        // ellipse.style.background =
        //   sampleColors[parseInt(Math.random() * sampleColors.length)];
        ellipse.setAttribute("ani-dir-O", "1");
        ellipse.setAttribute("ani-dir-W", "1");
        ellipse.setAttribute("ani-dir-H", "1");
        ellipse.setAttribute("ani-go", "false");
        arrayOfellipses.push(ellipse);
        setTimeout(function () {
          ellipse.setAttribute("ani-go", "true");
        }, Math.random() * 3500);

        // var currentColor = 0;

        setInterval(() => {
          let currentColor = parseInt(Math.random() * rainbow.length);
          ellipse.style.background = `${rainbow[currentColor]}`;
          ellipse.style.color = `${rainbow[currentColor]}`;
          ellipse.style.borderColor = `${rainbow[currentColor]}`;
          currentColor++;
          if (currentColor == rainbow.length - 7) {
            currentColor = 0;
          }
        }, 750);
      }
    }

    requestAnimationFrame(animate);

    /****** callback for requestAnimationFrame **********/
    function animate() {
      for (let i = 0; i < arrayOfellipses.length; i++) {
        if (arrayOfellipses[i].getAttribute("ani-go") === "true") {
          let dir_of_ani_W = parseFloat(
            arrayOfellipses[i].getAttribute("ani-dir-W"),
          );
          let dir_of_ani_H = parseFloat(
            arrayOfellipses[i].getAttribute("ani-dir-H"),
          );
          let dir_of_ani_O = parseFloat(
            arrayOfellipses[i].getAttribute("ani-dir-O"),
          );

          let currentSizeW = parseFloat(arrayOfellipses[i].style.width);
          let currentSizeH = parseFloat(arrayOfellipses[i].style.height);
          let currentOpacity = parseFloat(arrayOfellipses[i].style.opacity);

          //console.log(currentSize)
          if (currentSizeW > 50 || currentSizeW < 5) {
            dir_of_ani_W *= -1;
            arrayOfellipses[i].setAttribute("ani-dir-W", dir_of_ani_W);
          }

          if (currentSizeH > 67 || currentSizeH < 10) {
            dir_of_ani_H *= -1;
            arrayOfellipses[i].setAttribute("ani-dir-H", dir_of_ani_H);
          }

          if (currentOpacity > 1 || currentOpacity < 0.1) {
            dir_of_ani_O *= -1;
            arrayOfellipses[i].setAttribute("ani-dir-O", dir_of_ani_O);
          }

          arrayOfellipses[i].style.opacity =
            currentOpacity + 0.01 * dir_of_ani_O;

          arrayOfellipses[i].style.width =
            currentSizeW + 0.1 * dir_of_ani_W + "px";
          arrayOfellipses[i].style.height =
            currentSizeH + 0.5 * dir_of_ani_H + "px";
          arrayOfellipses[i].style.borderRadius =
            currentSizeW + 0.5 * dir_of_ani_W + "px";
          currentSizeH + 0.3 * dir_of_ani_H + "px";
        }
      }
      //recall animation loop
      requestAnimationFrame(animate);
    }
  }
}
