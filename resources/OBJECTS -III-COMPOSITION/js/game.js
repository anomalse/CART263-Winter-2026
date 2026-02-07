window.onload = setup 
let game =null;
function setup(){
  game = {
    magician:null,
    numFighters: 10,
    fighters: [],
    numLevels: 5,
    currentLevel: 1,
    /* the visual environment properties */
    environment: {
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
      // new  sun instancce
      sun: new Sun(10, 10, { r: 240, g: 206, b: 83 }),
      /*ground object */
      ground: {
        // The color of the ground (background)
        groundColor: {
          r: 120,
          g: 180,
          b: 120,
        },
        //the grass element
        groundDiv: document.createElement("div"),
      },
    },
  };
  buildEnv();
}

  
  function buildEnv() {

//add a magician
    magician = new Magician("SuperStar","assets/images/magician.svg",game.environment.sky.skyDiv,100,200,10)
//add two fighters
   game.fighters.push(new Fighter("Zippy","assets/images/fighter.svg",game.environment.ground.groundDiv,150,10,10));
   game.fighters.push(new Fighter("Zap","assets/images/fighter_var_two.svg",game.environment.ground.groundDiv,150,300,100));
    /* note how we use dot notation....*/
    //sky
    game.environment.sky.skyDiv.classList.add("sky");
    game.environment.sky.skyDiv.style.background = `rgb(${game.environment.sky.skyColor.r},${game.environment.sky.skyColor.g},${game.environment.sky.skyColor.b})`;
    document
      .getElementsByTagName("main")[0]
      .appendChild(game.environment.sky.skyDiv);
    //sun
    game.environment.sun.renderSun();

    //grass
    game.environment.ground.groundDiv.classList.add("ground");
    game.environment.ground.groundDiv.style.background = `rgb(${game.environment.ground.groundColor.r},${game.environment.ground.groundColor.g},${game.environment.ground.groundColor.b})`;
    document
      .getElementsByTagName("main")[0]
      .appendChild(game.environment.ground.groundDiv);
  }

