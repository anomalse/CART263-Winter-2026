window.onload = function (){
// Our garden
let garden = {
   numNuts: 50,
        nuts: [],
        // Add more nut image paths here
        nutImages: ["assets/image/nut.png",
            "assets/image/nut1.png",
            "assets/image/nut2.png"
        ],

        squirrels: [],
        numSquirrels: 5,

    // An array to store the individual flowers
    flowers: [],
    // How many flowers in the garden
    numFlowers: 40,
    /*grass object */
    grass: {
      // The color of the grass (background)
      grassColor: {
        r: 120,
        g: 180,
        b: 120,
      },
      //the grass element
      grassDiv: document.createElement("div"),
    },
 
    /*sky object */
    sky: {
      // The color of the sky (background)
      skyColor: {
        r: 83,
        g: 154,
        b: 240,
      },
      //the sky element
      skyDiv: document.createElement("div"),
    },

    // TEAM E: Birds
    birds: [],
    maxBirds: 15,
    birdColor: "white",
    weather: null,
  };
  // new  sun instancce
  let sun =  new Sun(10,10,{r: 240, g: 206,b: 83})

    // TEAM F: Weather
  let weather = new Weather("Hot", "Cold", "Rainy", 20);
  garden.weather = weather;

  /*********************WEATHER FUNCTIONS  **********************************/
  //syncing the colours of the garden with the weather 
  function syncGardenColorsWithWeather() {
    if (weather.currentState === weather.hotState) {
      garden.sky.skyColor = { r: 120, g: 185, b: 255 };
      garden.grass.grassColor = { r: 130, g: 190, b: 110 };
    } else if (weather.currentState === weather.coldState) {
      garden.sky.skyColor = { r: 170, g: 195, b: 225 };
      garden.grass.grassColor = { r: 100, g: 150, b: 105 };
    } else {
      garden.sky.skyColor = { r: 95, g: 140, b: 185 };
      garden.grass.grassColor = { r: 110, g: 165, b: 110 };
    }
      //update the sky and grass divs to interpolate the new colours
    //the sun
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    //the grass
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
  }

    //Starting the weather cycle, changing the temperature and weather at different intervals 
  function startWeatherCycle() {

    //weather states array
    const states = [weather.hotState, weather.rainyState, weather.coldState];

    //weather state changes at a slower interval.
    setInterval(function () {

      //pick a random weather state
      const nextState = states[Math.floor(Math.random() * states.length)];
      //set the weather to that state 
      weather.setState(nextState);
      //set the temperature to a temperature within the range of the weather state
      weather.setTemperature(weather.getRandomTemperatureForState(nextState));
      //render the weather
      weather.renderWeather();
      //changing the colours of the garden
      syncGardenColorsWithWeather();
      //repeat every 9 seconds
    }, 9000);

    //Temperature drifts at a faster interval within the current weather range.
    setInterval(function () {

      //Get the current range of allowed temperatures for a given weather state
      const range = weather.getTemperatureRangeForState(weather.currentState);
      //creating a random temperature change between -2 and +2 degrees
      const drift = Math.floor(Math.random() * 5) - 2;
      //Ensuring that the new temperature with the drift is still within the range of the current weather state
      const nextTemperature = Math.max(
        range.min,
        Math.min(range.max, weather.currentTemperature + drift)
      );
      //set the temperature to the new temperature with the drift
      weather.setTemperature(nextTemperature);
      //render the weather 
      weather.renderWeather();
      //repeat every 3.5 seconds
    }, 3500);
  }
/************************************** */
  // beehives
  let beehives = [];
  //bees
  let bees = [];
/************************************** */
  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //NEW:: weather types
    weather.renderWeather();


    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);

      /*********************ADD BEE HIVES *************************** */
    beehives.push(new BeeHive(520, 40, 100, { r: 244, g: 196, b: 110 }));
    beehives.push(new BeeHive(680, 80, 85, { r: 235, g: 184, b: 98 }));
    beehives.push(new BeeHive(100, 100, 130, { r: 244, g: 196, b: 110 }));
    beehives.forEach((hive) => hive.renderBeeHive());

    //create some flowers
    for (let i = 0; i < garden.numFlowers; i++) {
        // Create variables for our arguments for clarity
        let x = Math.random() * (window.innerWidth);
        let y = Math.random() * 120;
        let size = Math.random() * 30 + 10;
        let stemLength = Math.random() * 50 + 20;
        let petalColor = {
          r: parseInt(Math.random() * 155) + 100,
          g: parseInt(Math.random() * 155) + 100,
          b: parseInt(Math.random() * 155) + 100,
        };
  
        // Create a new flower using the arguments
        let flower = new Flower(x, y, size, stemLength, petalColor);
        // Add the flower to the array of flowers
        garden.flowers.push(flower);
      }

      for (let i = 0; i < garden.numFlowers; i++) {
        // Add the flower to the array of flowers
        garden.flowers[i].renderFlower();
      }

    /*********************BEES *************************** */
       //create five bees
    for (let i = 0; i < 5; i++) {
      let hive = beehives[i % beehives.length];

      //different sizes
      let width = Math.random() * 50 + 25;
      let height = width;

      //position
      let startX = hive.x + hive.size / 4;
      let startY = hive.y + hive.size / 2;

      let bee = new Bee(startX, startY, width, height, hive);
      bees.push(bee);
      bee.renderBee();
      bee.animateBee();

    }

  }//createAndRenderGarden
  createAndRenderTheGarden();
  syncGardenColorsWithWeather();
  startWeatherCycle();

/***********************************BIRDS******************** */
  function addBird() {
    // no more than 15 birds
    if (garden.birds.length >= garden.maxBirds) {
      return;
    }
    // random start position
    let x = Math.random() * window.innerWidth;
    let y = 60 + Math.random() * 140;
    let size = 40;

    // create bird
    let bird = new Bird(x, y, size, garden.birdColor);

    // add bird to the array of birds
    garden.birds.push(bird);

    // render and animate bird
    bird.renderBird();
    bird.animateBird(garden.weather);

    // alternate bird color
    if (garden.birdColor === "white") {
      garden.birdColor = "black";
    }
    else {
      garden.birdColor = "white";
    }
  }
  addBird();

 /*********************BEE HIVES UPDATE AND ANIMATE *************************** */
   // function to update and animate the beehives
  function animateBeeHive() {
    for (let i = 0; i < beehives.length; i++) {
      let hives = beehives[i];
      hives.rotateHives();
    }

    window.requestAnimationFrame(animateBeeHive);
  }


  window.requestAnimationFrame(animateBeeHive);
  /*********************NUTS *************************** */
  function createNuts() {
        // Create the correct number of dogs and put them in our array
        for (let i = 0; i < garden.numNuts; i++) {
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * 100;
            let randomIndex = Math.floor(Math.random() * garden.nutImages.length);
            let imageSrc = garden.nutImages[randomIndex];
            let nut = new Nut(x, y, 15, 15, imageSrc);
            garden.nuts.push(nut);

        }

    }
    function renderNuts() { // displays them on the screen
        // Go through all the animals and move, wrap, and display them
        for (let i = 0; i < garden.nuts.length; i++) {
            let nut = garden.nuts[i];
            //console.log(i)
            nut.renderNut();
        }
    }

  //to add new nut
    function createNewNut() {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * 200;
        let randomIndex = Math.floor(Math.random() * garden.nutImages.length);
        let imageSrc = garden.nutImages[randomIndex];
        let newNut = new Nut(x, y, 15, 15, imageSrc);

        newNut.renderNut();
        garden.nuts.push(newNut);
    }
  createNuts();
  renderNuts();
    /***** SQUIRRELS **********************************/
     // Create and render squirrels
    function createSquirrels() {
        for (let i = 0; i < garden.numSquirrels; i++) {
            let x = Math.random() * (window.innerWidth - 40) + 20;
            let y = Math.random() * 100 + 120;
            let size = Math.random() * 20 + 30;
            let squirrel = new Squirrel(x, y, size, size, "assets/image/squirrel.png");
            garden.squirrels.push(squirrel);
            squirrel.renderSquirrel();
        }
    }

    function animateSquirrels() {
        for (let squirrel of garden.squirrels) {
            squirrel.move();
            squirrel.renderSquirrel();
            for (let nut of garden.nuts) {
                squirrel.tryPickupNut(nut);
                //if nut is picked then it become false(inactive) and uses createNewNut
                // to add a new nut
                if (nut.picked === true) {
                    nut.picked = false;
                    createNewNut();
                }
            }
        }
        requestAnimationFrame(animateSquirrels);
    }

    createSquirrels();
    animateSquirrels();

  // KEY EVENTS + BIRDS
  // Spacebar to add a bird (max 15)
  window.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      addBird();
    }
  });

 } //end winowonload

  
  /*** TEAM A AND B NEED TO COORDINATE
  
  /**TEAM A -- BEES
 * 1/ Create a  file to hold a  Bee Class (i.e. Bee.js)
 * 2/ Create the Bee Class : a constructor which takes a position, size, color and a home beehive (SEE TEAM B) as parameters
 * 3/ In the Bee Class: Create a renderBee() method -> which essentially creates a HTML element(s) 
 - could be  * an image element :) or an svg .... representing a Bee... (see Sun or Flower for inspiration)
 * 4/ Create an animateBee() method in the Bee class - which will make a given Bee move around the garden - use the requestAnimationFrame() 
 * 5/ In garden.js add at least 5 new Bees to the garden (in an array) - 
 * all different sizes, colors etc... and set their position to be at their home Beehive's position
 * 6/ and then call the animateBee() method on all the Bees)
 * 7/Implement the functionality  to allow for bees to periodically return to their home beehive (SEE TEAM B) to rest :)
 
 /**TEAM B -- BEE HIVES
  * 1/ Create a file to hold a Bee Hive (i.e. BeeHive.js)
 * 2/ Create the BeeHive Class : a constructor which takes a position, size and color as parameters
 * 3/ In the BeeHive Class: Create a renderBeeHive() method -> which essentially creates HTML element(s)
  - could be * an image element :) or an svg .... representing a BeeHive.. (see Sun or Flower for inspiration)
 * 4/ Create a subtle animation affecting the bee-hive ... (using setInterval(), setTimeout, or requestAnimationFrame) 
* 5/ In garden.js add at least new 2 Beehives  to the garden (in an array) - and ensure that they have bees linked to them
* 6/ Add a click event to each beehive such that when clicked on -> you count the number of bees (SEE TEAM A for collab) "at home" 
  and visually display the result
  *
*/

  /*** TEAM C AND D NEED TO COORDINATE

/**TEAM C -- SQUIRRELS
 * 1/ Create a file to hold a Squirrel Class (i.e. Squirrel.js)
 * 2/ Create the Squirrel Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderSquirrel() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Squirrel... (see Sun or Flower for inspiration)
 * 4/ Create an animateSquirrel() method in the Squirrel class - which will make a given Squirrel move around the garden - use the requestAnimationFrame() 
 * 5/ In garden.js add 5 new Squirrels to the garden (in an array) - 
 * all different sizes and colors and in different positions 
 * and then call the animateSquirrel() method on all the Squirrels
 * 6/ Implement a counter to keep track of how many nuts any given squirrel has picked up (SEE TEAM D for collab)
 
 
 
  /**TEAM D -- NUTS
 * 1/ Create a file to hold a  Nut Class (i.e. Nut.js)
 * 2/ Create the Nut Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a renderNut() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Nut... (see Sun or Flower for inspiration)
 * 4/ In garden.js add at least 10 new Nuts to the garden (in an array) - 
 * all different sizes and colors and in different positions 
 * 5/ Implement the functionality such that any nut can be picked up by a squirrel (SEE TEAM C for collab) - 
 * 6/ AND if it is picked up then make that nut "inactive" and add a new nut in the garden ... 
 * 
*/


  /*** TEAM E AND F NEED TO COORDINATE

/** TEAM E BIRDS
 * 1/ Create a  file to hold a  Bird Class (i.e. Bird.js)
 * 2/ Create the Bird Class : a constructor which takes a position, size and color as parameters
 * 3/ Create a Bird() method -> which essentially creates a HTML element(s) - could be
 * an image element :) or an svg .... representing a Bird... (see Sun or Flower for inspiration)
 * 4/ Create an animateBird() method in the Bird class - which will make a given Bird move around the sky - use the requestAnimationFrame() 
 * 5/ In garden.js add an empty array for the birds 
 * 6/ Use either the keyboard or mouse events to dynamically allow for users to add new birds to the garden - and have them be animated.
 * 7/ Ensure that birds take cover somewhere in the garden if the weather temp (SEE TEAM F for collab) is determined to be too cold/ too hot or if it is raining
 * 
 * 
*/

 
  /**TEAM F -- Weather
 * 1/ Create a file to hold a Weather Class (i.e. Weather.js)
 * 2/ Create the Weather Class : a constructor which takes at LEAST 2 properties: weather "state" i.e. sunny, raining, cloudy as well as a variable to hold the current temp
 * 3/ Create a renderWeather() method -> which essentially will call one of a few custom methods to render the current weather:
 * 4/ If the weather is determined to be sunny then call the renderSunny() which will contain HTML element(s) - could be
 * images, svgs etc .... representing sunny weather, if the weather is determined to be rainy then one would call a renderRainy() etc ...
 * 5/ In garden.js instantiate a weather state + add the current temperature.
 * 6/ Implement the functionality such that at different time intervals the weather changes and or the temperature.
 * 7/ Ensure and Implement the functionality for the birds (collab with TEAM E) to be affected by the current weather and temperature.
 * 
*/
