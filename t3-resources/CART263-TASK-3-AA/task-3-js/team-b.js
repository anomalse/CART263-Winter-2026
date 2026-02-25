setup_B();
/** THEME: CHAOS  */
//SEAN & WILLOW
function setup_B() {
  console.log("in b");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_B`, "ani_canvB",aniA,aniB,aniC,aniD);

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
   
  //SEAN
  function aniA(parentCanvas) {
    console.log("in ani-A -teamB");
    
    // Get the canvas size and position for boundary checking and coordinate conversion
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfellipses = []; // Array to store all created cell elements
    let grid = {}; // Object to store grid cells by their "row,col" key for fast lookup
    
    // Constants for grid and animation timing
    const CELL_SIZE = 10;           // Each square is 10x10 pixels
    const SPACING = 20;             // Cells are spaced 20 pixels apart
    const ANIMATION_DELAY = 80;     // Wait 80ms between each spreading wave

    const colours = {
      red: "#FF3B30",
      orange: "#FF9500",
      yellow: "#FFCC00",
      lime: "#C7F000",
      green: "#34C759",
      teal: "#5AC8FA",
      cyan: "#00FFFF",
      blue: "#007AFF",
      indigo: "#5856D6",
      purple: "#AF52DE",
      magenta: "#FF2D55",
      pink: "#FF69B4",
      coral: "#FF6F61",
      peach: "#FFB7A5",
      brown: "#8B572A",
      beige: "#F5F5DC",
      tan: "#D2B48C",
      olive: "#808000",
      mint: "#98FF98",
      seafoam: "#93E9BE",
      sky: "#87CEEB",
      navy: "#001F3F",
      slate: "#708090",
      charcoal: "#36454F",
      silver: "#C0C0C0",
      gray: "#9E9E9E",
      black: "#000000",
      white: "#FFFFFF",
      gold: "#FFD700",
      bronze: "#CD7F32"
    };

    function getShape()
    {
      let val = "TEAM_H_h_cell"
      if (!currentShape) val = "TEAM_H_h_cell_D";
      return val;
    }

    let currentShape = true;
    function getColour()
    {
      const values = Object.values(colours);
      return values[Math.floor(Math.random() * values.length)];
    }
    let SELECTED_COLOR = getColour();
    let SELECTED_BACKGROUND_COLOR = getColour();
    // Creates the initial grid of blue squares and populates the grid object
    function drawStuff()
    {
      arrayOfellipses = [];
      parentCanvas.innerHTML = ''; // Clear any previous cells
      
      // Loop through rows (starting at 20px, incrementing by 20px)
      for (let i = 20; i < boundingBoxParent.height; i += SPACING)
      {
        // Loop through columns (starting at 20px, incrementing by 20px)
        for (let j = 20; j < boundingBoxParent.width; j += SPACING)
        {
          // Create a new div element for this grid cell
          let ellipse = document.createElement("div");
          ellipse.classList.add(getShape());
          parentCanvas.appendChild(ellipse);
          
          // Position the cell using CSS (left/top are relative to parent with position:relative)
          ellipse.style.left = `${j}px`;
          ellipse.style.top = `${i}px`;
          
          // Set cell dimensions and initial color to blue
          ellipse.style.width = `${CELL_SIZE}px`;
          ellipse.style.height = `${CELL_SIZE}px`;
          ellipse.style.opacity = 1;
          ellipse.style.background = SELECTED_BACKGROUND_COLOR;
          ellipse.style.transition = "background 0.1s ease"; // Smooth color transitions
          
          // Calculate grid row and column indices (e.g., 20/20=1, 40/20=2, etc.)
          const row = i / SPACING;
          const col = j / SPACING;
          const key = `${row},${col}`; // Create unique key like "1,2" for lookup
          
          // Store this cell in the grid object for fast access during animation
          if (!grid[key])
          {
            grid[key] = {
              element: ellipse,      // Reference to the HTML element
              row: row,              // Grid row index
              col: col,              // Grid column index
              illuminated: false,    // Has this cell been part of a wave yet?
              distance: Infinity     // Distance from click point (used in BFS)
            };
          }
          else grid[key].element = ellipse;
          
          arrayOfellipses.push(ellipse); // Add to array for tracking
        }
      }
    }

    // Rounds click coordinates to the nearest grid position
    // Example: click at x=37 with SPACING=20 becomes 40 (nearest 20px increment)
    function round(number, increment, offset)
    {
      return Math.round((number - offset) / increment);
    }

    // Main animation function that spreads illumination outward in waves (Breadth-First Search)
    function animateSpread(startRow, startCol)
    {
      // Reset all cells to blue and mark them as not illuminated
      Object.values(grid).forEach(cell => {
        cell.distance = Infinity;
        cell.illuminated = false;
        cell.element.style.background = SELECTED_BACKGROUND_COLOR;
      });

      // Initialize BFS: start with the clicked cell
      let queue = [[startRow, startCol]];      // First wave contains only the clicked cell
      let wavesToProcess = [queue];            // Array of all waves to process sequentially
      let waveIndex = 0;                       // Track which wave we're currently animating

      // Processes one wave of illumination at a time
      function processNextWave()
      {
        // If we've processed all waves, animation is done
        if (waveIndex >= wavesToProcess.length)
        {
          currentShape = !currentShape
          // Wait briefly, then reset all cells to blue
          setTimeout(() => {
            Object.values(grid).forEach(cell => {
              cell.element.style.background = SELECTED_BACKGROUND_COLOR;
            });
          }, ANIMATION_DELAY);
          return;
        }

        // Turn all cells back to blue before illuminating the current wave
        // This creates the "moving front" effect where only the active wave is red
        Object.values(grid).forEach(cell => {
          cell.element.style.background = SELECTED_BACKGROUND_COLOR;
        });

        // Get the current wave (array of [row, col] cells to illuminate)
        const currentWave = wavesToProcess[waveIndex];
        const nextWave = []; // Will store cells adjacent to current wave

        // For each cell in the current wave, illuminate it and find its neighbors
        currentWave.forEach(([row, col]) => {
          const key = `${row},${col}`;
          if (grid[key])
          {
            grid[key].element.classList.remove(getShape());
            currentShape = !currentShape
            grid[key].element.classList.add(getShape());
            currentShape = !currentShape
            grid[key].element.style.background = SELECTED_COLOR;  // Turn this cell red
            grid[key].illuminated = true;                 // Mark as visited
          }

          // Check all 4 adjacent direction: up, down, left, right
          const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          directions.forEach(([dRow, dCol]) => {
            // Calculate the neighbor's row and column
            const newRow = row + dRow;
            const newCol = col + dCol;
            const newKey = `${newRow},${newCol}`;

            // Get reference to the neighbor cell (if it exists)
            let c = grid[newKey];
            
            // Add neighbor to next wave if: it exists, hasn't been illuminated, and isn't already in nextWave
            if (c && !c.illuminated && !nextWave.some(([r, c]) => r === newRow && c === newCol))
              nextWave.push([newRow, newCol]);
          });
        });

        // If there are more cells to process, add this wave to the queue
        if (nextWave.length > 0)
          wavesToProcess.push(nextWave);

        // Move to the next wave
        waveIndex++;
        
        // Schedule the next wave to process after the animation delay (80ms)
        setTimeout(processNextWave, ANIMATION_DELAY);
      }

      // Kick off the animation by processing the first wave
      processNextWave();
    }

    // Listen for mouse clicks on the canvas
    addEventListener("click", (event) => 
    {
      // Get the click coordinates relative to the page
      let x = event.clientX;
      let y = event.clientY;
      
      // Get the canvas boundaries
      let mainXA = boundingBoxParent.x;
      let mainXB = mainXA + boundingBoxParent.width;
      let mainYA = boundingBoxParent.y;
      let mainYB = mainYA + boundingBoxParent.height;
      
      // Only process the click if it's within the canvas bounds
      if (x >= mainXA && x <= mainXB && y >= mainYA && y <= mainYB)
      {
        SELECTED_COLOR = getColour();
        // Convert click coordinates from page space to canvas-relative space
        const relativeX = x - mainXA;
        const relativeY = y - mainYA;
        
        // Round to the nearest grid cell index
        const col = round(relativeX, SPACING, 0);
        const row = round(relativeY, SPACING, 0);

        // Immediately turn the clicked cell red so user sees instant feedback
        const clickedKey = `${row},${col}`;
        if (grid[clickedKey])
          grid[clickedKey].element.style.background = SELECTED_COLOR;

        // After a brief delay (80ms), start the wave animation spreading outward
        setTimeout(() => {
          animateSpread(row, col);
        }, ANIMATION_DELAY - 20);
      }
    })

    // Initialize the grid when this function first runs
    drawStuff();

  
  
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

  //RAY
  function aniC(parentCanvas) {
    console.log("in aniC - TEAM B simple key event");

    parentCanvas.style.backgroundColor = "rgb(20, 20, 30)";
    parentCanvas.style.position = "relative";
    parentCanvas.innerHTML = "";

    const DOT_SIZE = 14;
    const DOT_GAP = 2;
    const DOT_COLOR = "rgb(40, 140, 255)"; // blue

    let groups = [];

    // timer state
    let pulse = 0;
    let pulseDir = 1;

    // Timer: pulse all dots
    const timerRef = setInterval(function () {
      pulse += pulseDir * 0.03;
      if (pulse > 1) pulseDir = -1;
      if (pulse < 0) pulseDir = 1;

      const allDots = parentCanvas.querySelectorAll(".TEAM_H_dot");
      for (let i = 0; i < allDots.length; i++) {
        allDots[i].style.opacity = String(0.6 + pulse * 0.4);
      }
    }, 60);

    windowKeyDownRef = function (e) {
      // adds a new dot cluster
      if (e.code === "Space") {
        e.preventDefault();

        const group = createDotGroup();
        parentCanvas.appendChild(group);
        groups.push(group);
      }

      // BACKSPACE = remove last dot cluster
      else if (e.code === "Backspace") {
        e.preventDefault();

        if (groups.length > 0) {
          const last = groups.pop();
          last.remove();
        }
      }
    };

    windowKeyUpRef = function (e) {};

    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);

    // builds a "shape made of circles"
    function createDotGroup() {
      // group wrapper
      const group = document.createElement("div");
      group.style.position = "absolute";

      // position inside canvas
      const box = parentCanvas.getBoundingClientRect();
      const x = Math.floor(Math.random() * (box.width - 80)) + 10;
      const y = Math.floor(Math.random() * (box.height - 80)) + 10;

      group.style.left = x + "px";
      group.style.top = y + "px";

      const patternType = Math.floor(Math.random() * 3);

      //grid
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          let showDot = true;

          // Pattern 0: plus sign
          if (patternType === 0) {
            showDot = r === 2 || c === 2;
          }

          // Pattern 1: X
          if (patternType === 1) {
            showDot = r === c || r + c === 4;
          }

          // Pattern 2: sqaure shape
          if (patternType === 2) {
            showDot = r === 0 || r === 4 || c === 0 || c === 4;
          }

          if (showDot) {
            const dot = document.createElement("div");
            dot.classList.add("TEAM_H_dot");

            dot.style.position = "absolute";
            dot.style.width = DOT_SIZE + "px";
            dot.style.height = DOT_SIZE + "px";
            dot.style.borderRadius = "80%";
            dot.style.backgroundColor = DOT_COLOR;

            dot.style.left = c * (DOT_SIZE + DOT_GAP) + "px";
            dot.style.top = r * (DOT_SIZE + DOT_GAP) + "px";

            group.appendChild(dot);
          }
        }
      }

      return group;
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
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  //WILLOW
   function aniD(parentCanvas) {
    //create a few starting variables to be used across functions
    let moving;
    let currentImg;
    let relativeX;
    let relativeY;
    let rotation = 0;
    let anim;
    let animating = false;
    let startHeight = 0;
    let shift = [];
    console.log("in ani-D -teamB");

    //create a few key image and div elements, append them to the canvas (or other divs) and set their style attributes directly
    let bgImage = document.createElement("img");
    parentCanvas.appendChild(bgImage);
    bgImage.src = "media/bliss.jpg";
    bgImage.style.position = "absolute";
    bgImage.style.height = parentCanvas.clientHeight + "px";
    bgImage.style.width = parentCanvas.clientWidth + "px";

    let underflowControl = document.createElement("div");
    parentCanvas.appendChild(underflowControl);
    underflowControl.style.position = "absolute";
    underflowControl.style.width = parentCanvas.clientWidth + "px";
    underflowControl.style.height = parentCanvas.clientHeight + "px";
    underflowControl.style.overflow = "hidden";

    // this one is the parent for the lower shadow images
    let shade = document.createElement("div");
    underflowControl.appendChild(shade);
    shade.style.backgroundColor = "#F5F5DC";
    shade.style.width = parentCanvas.clientWidth + "px";
    shade.style.height = parentCanvas.clientHeight + "px";
    shade.style.top = -(parentCanvas.clientHeight) + "px";
    shade.style.position = "absolute";
    shade.style.opacity = "90%";

    // this one is specifically to be the parent to the upper moveable images
    //both use overflow control to keep the images spilling out of the canvas, i parent the shade handle to the unhidden canvas for a cute effect where it pops out at the bottom
    let overflowControl = document.createElement("div");
    parentCanvas.appendChild(overflowControl);
    overflowControl.style.position = "absolute";
    overflowControl.style.width = parentCanvas.clientWidth + "px";
    overflowControl.style.height = parentCanvas.clientHeight + "px";
    overflowControl.style.overflow = "hidden";

    let shadeHandle = document.createElement("img");
    parentCanvas.appendChild(shadeHandle);
    shadeHandle.src = "media/screenbottom.png";
    shadeHandle.style.maxWidth = parentCanvas.clientWidth + 20 + "px";
    shadeHandle.style.position = "absolute";
    shadeHandle.style.left = - 12 + "px";
    shadeHandle.style.pointerEvents = "none";


    //create an array of all available images to be used as moveable elements
    let images = ["media/cake.png", "media/chair.png", "media/jack.png", "media/mannequin.png", "media/pawn.png", "media/rose.png", "media/saw.png", "media/scissors.png", "media/toothbrush.png", "media/whisk.png", "media/ball.png", "media/lamp.png", "media/hoodie.png", "media/camera.png", "media/lettuce.png", "media/gnome.png", "media/vine.png", "media/mop.png", "media/illicit.png"];

    // biiiiig ol for loop to create 7 (or however many desired) random moveable images on the canvas, along with their shadow counterparts (necessary for the shade animation)
    //i create the image and assign it to its respective class, and id for convenient management. i give it random starting variables including image source, size, position, and rotation so that no run is the same
    for (let x = 0; x < 7; x++) {
      let left = Math.floor(Math.random() * 300) + "px";
      let top = Math.floor(Math.random() * 300) + "px";
      let rotate = Math.floor(Math.random() * 360) + "deg";
      let maxWidth = Math.floor(Math.random() * (150 - 60 + 1) + 60) + "px";
      let imageSelect = Math.floor(Math.random() * images.length)
      let image = document.createElement("img");
      image.classList.add("TEAM_I_ANI_I_img");
      image.setAttribute("draggable", "false");
      image.src = images[imageSelect];
      image.addEventListener("mousedown", imageMoveStart);
      image.addEventListener("mouseup", imageMoveEnd);
      image.addEventListener("mousemove", function (e) {
        relativeX = e.pageX - (parentCanvas.offsetLeft + parentCanvas.parentElement.offsetLeft);
        relativeY = e.pageY - (parentCanvas.offsetTop + parentCanvas.parentElement.offsetTop);
        imageMove();
      })
      image.style.left = left;
      image.style.top = top;
      image.style.rotate = rotate;
      image.style.maxWidth = maxWidth;
      image.setAttribute("id", "a" + x);
      overflowControl.appendChild(image);

      let shadeImage = document.createElement("img");
      shadeImage.classList.add("TEAM_I_ANI_I_shaded");
      shadeImage.setAttribute("draggable", "false");
      shadeImage.src = images[imageSelect];
      shadeImage.style.left = left;
      shadeImage.style.top = top;
      shadeImage.style.rotate = rotate;
      shadeImage.style.maxWidth = maxWidth;
      shadeImage.setAttribute("id", "a" + x);
      underflowControl.appendChild(shadeImage);
      if (Math.random() > .5) {
        image.style.transform = "scaleX(-1)";
        shadeImage.style.transform = "scaleX(-1)";
      }
    }
    //make an array of all of the upper image elements
    let imageElements = document.getElementsByClassName("TEAM_I_ANI_I_img");
    //listen for key events, in this case the arrow keys which control the shade animation and rotation of images
    window.addEventListener("keydown", function (event) {
      console.log("keypress");
      if (event.key === "ArrowDown" && animating == false) {
        //create an array of the starting positions of upper images before the animation starts, so that I can use them as reference in the animation.
        //i substract the start pos from the animation movement so that they stay in their place while their parent div moves (overflow = hidden hides the images as the div scrolls away, creating the shade effect)
        for (let x = 0; x < imageElements.length; x++) {
          shift[x] = parseInt(imageElements[x].style.top);
        }
        startHeight = 0;
        anim = requestAnimationFrame(shadeAnimate);
      }
      //same deal but in reverse. you cant move the images while the shade is down so no need to collect new starting positions
      if (event.key === "ArrowUp" && animating == false) {
        shadeHandle.style.top = 0 + "px";
        overflowControl.style.top = 0 + "px";
        anim = requestAnimationFrame(shadeUp);
      }
      //rotation variable necessary so I can collect the objects current rotation position before moving it, otherwise it would reset at zero before rotating every time
      if (event.key === "ArrowRight" && moving == true) {
        rotation += 3;
        currentImg.style.rotate = rotation + "deg";
        otherImg.style.rotate = rotation + "deg";
        console.log(rotation);
      }
      if (event.key === "ArrowLeft" && moving == true) {
        rotation -= 3;
        currentImg.style.rotate = rotation + "deg";
        otherImg.style.rotate = rotation + "deg";
      }
    })

    //starts moving the currently clicked image, sets that image as the 'currentImg' to be used in other functions until a new one is set with next click and drag
    //otherImg is the shadow image underneath, also moved at the same time
    function imageMoveStart() {
      moving = true;
      currentImg = this;
      otherImg = document.querySelector("#" + this.getAttribute('id'));
      rotation = parseInt(currentImg.style.rotate);
    }
    //when the user lets go it disables movement (click and drag action)
    function imageMoveEnd() {
      moving = false;
    }
    //as explained, divs down and uses overflow hidden to obscure the upper images. i also shrink and grow the overflowcontrol div so that when it moves down it doesnt also reveal the images outside of the canvas
    function shadeAnimate() {
      animating = true;
      let endHeight = parentCanvas.clientHeight;
      startHeight += 2;
      overflowControl.style.top = startHeight + "px";
      overflowControl.style.height = parentCanvas.clientHeight - startHeight + "px";
      shade.style.top = startHeight - parentCanvas.clientHeight + "px";
      shadeHandle.style.top = startHeight - 3 + "px";
      for (let x = 0; x < imageElements.length; x++) {
        imageElements[x].style.top = shift[x] - startHeight + "px";
      }
      if (startHeight >= endHeight) {
        cancelAnimationFrame(anim);
        animating = false;
      }
      else {
        anim = requestAnimationFrame(shadeAnimate);
      }
    }
    //reverse of shadeanimate
    function shadeUp() {
      animating = true;
      let endHeight = 0;
      startHeight -= 2;
      overflowControl.style.top = startHeight + "px";
      overflowControl.style.height = parentCanvas.clientHeight - startHeight + "px";
      shade.style.top = startHeight - parentCanvas.clientHeight + "px";
      shadeHandle.style.top = startHeight - 3 + "px";
      for (let x = 0; x < imageElements.length; x++) {
        imageElements[x].style.top = shift[x] - startHeight + "px";
      }
      if (startHeight <= endHeight) {
        cancelAnimationFrame(anim);
        animating = false;
      }
      else {
        anim = requestAnimationFrame(shadeUp);
      }
    }
    //uses the relative x y coords and changes css positioning accordingly, subtracts half height and width so the image stays centered on the mouse
    // (if i were to continue working on this I would find a way to prevent snapping to the center, instead it would just 'grab' where the user clicks. probably doable with more variables to store the location of the image or something)
    function imageMove() {
      if (moving == true) {
        currentImg.style.left = relativeX - (currentImg.width / 2) + "px";
        currentImg.style.top = relativeY - (currentImg.height / 2) + "px";
        otherImg.style.left = relativeX - (currentImg.width / 2) + "px";
        otherImg.style.top = relativeY - (currentImg.height / 2) + "px";
      }
    }
  }
}