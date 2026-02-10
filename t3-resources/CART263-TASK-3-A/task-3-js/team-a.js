setup_A();
/** THEME: CALM  */
function setup_A() {
  console.log("in a");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_A`, "ani_canvA", aniA, aniB, aniC, aniD);
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
    console.log("in ani-A -teamA");

    const cellSize = 24;
    const gap = 4;
    const offsetX = 10;
    const offsetY = 30;
    const bounds = parentCanvas.getBoundingClientRect();
    const cols = Math.max(
      1,
      Math.floor((bounds.width - offsetX * 2 + gap) / (cellSize + gap))
    );
    const rows = Math.max(
      1,
      Math.floor((bounds.height - offsetY * 2 + gap) / (cellSize + gap))
    );

    const positions = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          x: offsetX + c * (cellSize + gap),
          y: offsetY + r * (cellSize + gap),
        });
      }
    }

    parentCanvas.addEventListener("click", (e) => {
      if (positions.length === 0) return;

      const rect = parentCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const pos = nearestGridPosition(clickX, clickY);
      spawnCircle(pos.x, pos.y, cellSize);
    });

    function nearestGridPosition(x, y) {
      let best = positions[0];
      let bestDist = Infinity;
      for (let i = 0; i < positions.length; i++) {
        const dx = positions[i].x - x;
        const dy = positions[i].y - y;
        const d = dx * dx + dy * dy;
        if (d < bestDist) {
          bestDist = d;
          best = positions[i];
        }
      }
      return best;
    }

    function spawnCircle(x, y, size) {
      const circle = document.createElement("div");
      circle.classList.add("TEAM_A_circle");
      circle.style.width = size + 'px';
      circle.style.height = size + 'px';
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      circle.style.backgroundColor = randomColor();
      circle.dataset.size = String(size);
      parentCanvas.appendChild(circle);

    }

    function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
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
    console.log("in ani-B -teamA");

    // colour palette
    // A palette of 8 colours, greens and pinks
    let teamA_AniB_shades = [
      "#2ecc71", "#ff69b4", "#27ae60", "#ff1493",
      "#a9dfbf", "#f5b7b1", "#145a32", "#c71585"
    ];

    // keeps track of which colour is used, starting at 0 the first colour
    let teamA_AniB_colorCounter = 0;

    // 19 by 19 grid
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        // create new div
        let d = document.createElement("div");
        // place the div in the parentCanvas
        d.classList.add("TEAM_A_grid_cell");
        parentCanvas.appendChild(d);
        // grid styling
        d.style.left = (i * 20) + "px";
        d.style.top = (j * 20) + "px";
        d.style.width = "18px";
        d.style.height = "18px";
        d.style.position = "absolute";

        d.style.background = teamA_AniB_shades[7];
        d.style.borderRadius = "50%";
        d.style.opacity = "0.1";
        d.style.transition = "all 0.5s";
        //this = whichever square/circle mouse is on
        d.addEventListener("mouseover", function () {
          this.style.background = teamA_AniB_shades[teamA_AniB_colorCounter];
          teamA_AniB_colorCounter = teamA_AniB_colorCounter + 1;
          // when colour reaches 8 of the array, it resets to 0
          if (teamA_AniB_colorCounter === 8) {
            teamA_AniB_colorCounter = 0;
          }
          // becomes opaque
          this.style.opacity = "1";
          // becomes a circle
          this.style.borderRadius = "80%";



        })
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
    console.log("in ani-C -teamA");

    parentCanvas.style.backgroundColor = "#dcdd9e";

    let counterAC = 0;
    const maxCounter = 8;
    const minCounter = 0;

    const cellSize = 41.5;
    const originX = 20.75;
    const originY = 20.75;

    let circles = [];

    function drawNewCircles() {
      // remove old circles
      circles.forEach((c) => c.remove());
      circles = [];

      // rows
      for (let row = 0; row <= counterAC; row++) {
        // columns
        for (let col = 0; col <= row; col++) {
          let distOrigin = row + col;
          let colors = distOrigin * 20;

          const circle = document.createElement("div");
          circle.className = "TEAM_A_circle";
          circle.style.width = "40px";
          circle.style.height = "40px";
          circle.style.borderRadius = "50%";
          circle.style.position = "absolute";

          circle.style.left = originX + col * cellSize + "px";
          circle.style.top = originY + row * cellSize + "px";

          // color pattern
          if (row == 0 && col == 0) {
            circle.style.backgroundColor = "black"; // origin stays black
          } else {
            circle.style.backgroundColor = `hsl(${colors}, 80%, 50%)`;
            parentCanvas.style.backgroundColor = `hsl(${colors}, 20%, 45%)`;
          }

          parentCanvas.appendChild(circle);
          circles.push(circle);
        }
      }
    }

    // Arrow key logic
    windowKeyDownRef = function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        counterAC = Math.min(counterAC + 1, maxCounter); // move down but stay inside box
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        counterAC = Math.max(counterAC - 1, minCounter);
      }
      drawNewCircles();
      console.log("counterAC =", counterAC);
    };

    windowKeyUpRef = function (e) {
      // optional
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
    console.log("in ani-D -teamA");

    const ball = document.createElement("div");
    ball.classList.add("TEAM_A_ball");
    parentCanvas.appendChild(ball);

    const size = 24;
    const bounds = parentCanvas.getBoundingClientRect();
    let x = (bounds.width - size) / 2;
    let y = (bounds.height - size) / 2;
    let vx = 2.2;
    let vy = 1.6;

    ball.style.width = size + "px";
    ball.style.height = size + "px";

    function animate() {
      x += vx;
      y += vy;

      if (x <= 0) {
        x = 0;
        vx *= -1;
      } else if (x + size >= bounds.width) {
        x = bounds.width - size;
        vx *= -1;
      }

      if (y <= 0) {
        y = 0;
        vy *= -1;
      } else if (y + size >= bounds.height) {
        y = bounds.height - size;
        vy *= -1;
      }

      ball.style.left = x + "px";
      ball.style.top = y + "px";

      requestAnimationFrame(animate);
    }

    parentCanvas.addEventListener("click", () => {
      vx = (Math.random() - 0.5) * 4;
      vy = (Math.random() - 0.5) * 4;
    });

    animate();
  }
}