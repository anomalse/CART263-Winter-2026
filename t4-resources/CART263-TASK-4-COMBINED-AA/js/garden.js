window.onload = function () {
  // Our garden
  let garden = {
    birds: [], // TEAM E BIRDS
    nuts: [],
    squirrels: [],

     //An array to store the individual bees
        bees: [],
        //How many bees
        numBees: 5,

        // Bee hive array
        beeHive: [],
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
  };
  // new  sun instancce
  let sun = new Sun(10, 10, { r: 240, g: 206, b: 83 });

  function createAndRenderTheGarden() {
    /* note how we use dot notation....*/
    //sky
    garden.sky.skyDiv.classList.add("sky");
    garden.sky.skyDiv.style.background = `rgb(${garden.sky.skyColor.r},${garden.sky.skyColor.g},${garden.sky.skyColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.sky.skyDiv);
    //sun
    sun.renderSun();

    //grass
    garden.grass.grassDiv.classList.add("grass");
    garden.grass.grassDiv.style.background = `rgb(${garden.grass.grassColor.r},${garden.grass.grassColor.g},${garden.grass.grassColor.b})`;
    document.getElementsByTagName("main")[0].appendChild(garden.grass.grassDiv);

    //create some flowers
    for (let i = 0; i < garden.numFlowers; i++) {
      // Create variables for our arguments for clarity
      let x = Math.random() * window.innerWidth;
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

    for (let i = 0; i < 5; i++)
      garden.squirrels.push(
        new Squirrel(
          ranInt(0, window.innerWidth),
          ranInt(240, window.innerHeight - 300),
          ranInt(50, 100),
          { r: 0, g: 0, b: 0 },
        ),
      );

    for (let i = 0; i < 5; i++) {
      garden.squirrels[i].renderSquirrel();
      garden.squirrels[i].animateSquirrel();
    }
  }
  createAndRenderTheGarden();

/****************BEE HIVES ********* */
   /**
   * Create bee hive object
   */
    function createBeeHives() {
        for (let i = 0; i < 2; i++) {
            // Sets the bee hive variables 
            let width = 150;
            let height = 150;
            let x = i * (window.innerWidth - width);
            let y = 80;

            // Create new hive class object
            let beeHive = new Beehive(x, y, width, height);
            garden.beeHive.push(beeHive);
        }
        // Tried to flip the image but it didnt work :(
        garden.beeHive[1].hiveDiv.style.transform = "scaleX(-1)";
        console.log(garden.beeHive[1].hiveDiv.style.transform);
    }
    /**
     * Render bee hive on the screen
     */
    function renderBeeHives() {
        for (let i = 0; i < garden.beeHive.length; i++) {
            let beeHive = garden.beeHive[i];
            beeHive.renderHive();
        }
    }


    createBeeHives();
    renderBeeHives();

    /**** BEES *********************/
    function createBees() {
        //create some bees
        for (let i = 0; i < garden.numBees; i++) {
            let x = 100;//make this home beehive
            let y = 100;//make this home beehive
            let w = Math.floor(Math.random() * 5 + 1) * 20;//makes the bees 20,40,60,80
            let h = Math.floor(Math.random() * 5 + 1) * 20;
            let tint = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${255})`;//does random color change with 100% opacity on mask tint layer
            let bee = new Bee(x, y, w, h, tint);
            garden.bees.push(bee);//pushes bee into bees array
        }
    }

    function renderBees() {
        // renders all bees, set num of bees at top in garden
        for (let i = 0; i < garden.bees.length; i++) {
            let bee = garden.bees[i];
            bee.renderBee();
        }
    }

    function animateBees() {
        // animates all bees, all movement in animate
        for (let i = 0; i < garden.bees.length; i++) {
            let bee = garden.bees[i];
            bee.animateBee();
        }
    }

     // Bee functions
    createBees();
    renderBees();
    animateBees();
/** NUTS************************************** */

  for (i = 0; i < 10; i++) {
    console.log(garden.grass.grassDiv.clientHeight);
    let size = Math.random() * (80 - 30) + 30;
    let xPos = Math.random() * (window.innerWidth - size);
    let yPos =
      Math.random() *
      (garden.grass.grassDiv.getBoundingClientRect().height - size);
    let color = Math.random() * 360;
    let nut = new Nut(xPos, yPos, size, color);
    garden.nuts[i] = nut;
    garden.nuts[i].renderNut();
  }

  /****************************WEATHER *********** */
  // Change the weather state and temperature every 5 seconds
  let weatherStates = ["sunny", "rainy", "cloudy"];
  // Start with sunny weather and 25 degrees
  let currentWeather = new Weather(weatherStates[0], 25);

  setInterval(() => {
    // Randomly change weather state
    currentWeather.state =
      weatherStates[Math.floor(Math.random() * weatherStates.length)];
    // Randomly change temperature between 15 and 35 degrees
    currentWeather.temp = Math.floor(Math.random() * 20) + 15;
    // Render the new weather
    currentWeather.renderWeather();

    const isRaining = currentWeather.state === "rainy";

    for (let i = 0; i < garden.birds.length; i++) {
      if (isRaining) {
        garden.birds[i].hideBehindNearestFlower(garden.flowers);
      } else {
        garden.birds[i].returnToSky();
      }
    }
  }, 5000);




    //when you push the arrow keys the bees move towards diff behives
    window.addEventListener("keydown", function (e) {

        if (e.code === "ArrowUp") {
            e.preventDefault()

            garden.bees.forEach(bee => {
                //can replace 300 300 w beehive position
                bee.returnBeehive(garden.beeHive[0].x, garden.beeHive[0].y);
            });
        }
        if (e.code === "ArrowDown") {
            e.preventDefault()

            garden.bees.forEach(bee => {
                //can replace 300 300 w beehive position
                bee.returnBeehive(garden.beeHive[1].x, garden.beeHive[1].y);
            });
        }
    })

  /*******************BIRDS ********************** */
  garden.sky.skyDiv.addEventListener("click", function (e) {
    let rect = garden.sky.skyDiv.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let size = Math.random() * 40 + 20;

    let bird = new Bird(x, y, size);

    garden.birds.push(bird);

    bird.renderBird();
    bird.animateBird();
  });

  function updateGarden() {
    // squirrels and nuts
    for (i = 0; i < garden.squirrels.length; i++) {
      for (f = 0; f < garden.nuts.length; f++) {
        garden.nuts[f].pickUp(garden.squirrels[i], i);
      }
    }
// beehive update
    for (let i = 0; i < garden.beeHive.length; i++) {
            let beeHive = garden.beeHive[i];
            beeHive.move();
        }

    requestAnimationFrame(updateGarden);
  }
  window.requestAnimationFrame(updateGarden);
};

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

function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
