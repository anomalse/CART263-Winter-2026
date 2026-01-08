window.onload = function () {
/* BUTTONS */
  document
    .querySelector("#mapButtonA")
    .addEventListener("click", mapArraysShape);
  document
    .querySelector("#mapButtonB")
    .addEventListener("click", mapArraysColor);

 document
    .querySelector("#filterButtonA")
    .addEventListener("click", filterArraysX);

    document
    .querySelector("#filterButtonB")
    .addEventListener("click", filterArraysByShape);


    document
    .querySelector("#forEachButtonA")
    .addEventListener("click", forEachCallBackA);

    document
    .querySelector("#forEachButtonB")
    .addEventListener("click", forEachCallBackB);


    document
    .querySelector("#findButtonA")
    .addEventListener("click", findCallBackA);

    document
    .querySelector("#findButtonB")
    .addEventListener("click", findCallBackB);



  const allRows = document.querySelectorAll(".flex-row");

  //STEP ONE::
  const originalRow = allRows[0];
  let arrayOfShapes = [];

  //INITIAL
  for (let i = 0; i < 10; i++) {
    let color = `rgb(${255 - i * 10},0,0)`;
    console.log(color);
    arrayOfShapes.push(
      new ShapeDef((i + 1) * 55, 50, "shape", "rectangle", color)
    );
  }

  add_New_Els_ToDOM(arrayOfShapes, originalRow);


let arrayOfShapesTwo = [];
const secondRow = allRows[1];

  //INITIAL
  let cshape =''
  for (let i = 0; i < 16; i++) {
    let color = `rgb(${255 - i * 10},0,0)`;
    if(i%2===0)cshape = 'circle'
    else cshape = 'rectangle'
    
    arrayOfShapesTwo.push(
      new ShapeDef((i + 1) * 55, 50, "shape", cshape, color)
    );
  }

add_New_Els_ToDOM(arrayOfShapesTwo, secondRow);



let arrayOfShapesThree = [];
const thirdRow = allRows[2];

  //INITIAL

  for (let i = 0; i < 10; i++) {
    let color = `rgb(${255 - i * 10},${255 - i * 10},0)`;
    
    arrayOfShapesThree.push(
      new ShapeDef((i + 1) * 55, 50, "shape", 'circle', color)
    );
  }

add_New_Els_ToDOM(arrayOfShapesThree, thirdRow);
thirdRow.innerHTML+=`<div id = "pSpan"></div>`

//for the foreach


let arrayOfShapesFour = [];
const fourthRow = allRows[3];

  //INITIAL

  for (let i = 0; i < 12; i++) {
    let color = `rgb(${255 - i * 10},0,${255 - i * 10})`;
    
    arrayOfShapesFour.push(
      new ShapeDef((i + 1) * 55, 50, "shape", 'square', color)
    );
  }

add_New_Els_ToDOM(arrayOfShapesFour, fourthRow);


/***** TO FILL IN */
function mapArraysShape(){

}
function mapArraysColor() {
}

function filterArraysX(){
}

function filterArraysByShape(){
}

function forEachCallBackA(){
}
function forEachCallBackB(){

}
function findCallBackA(){
}

function findCallBackB(){
}
/******* HELPERS */
function add_SingleToDOM(shapeDef, parent) {
      let el = document.createElement("div");
      el.classList.add(shapeDef.shapeClass);
      el.classList.add(shapeDef.customShapeClass);
      parent.appendChild(el);
      el.style.background = shapeDef.color;
      el.style.left = `${shapeDef.x}px`;
      el.style.top = `${shapeDef.y+100}px`;
    
  }



  function add_New_Els_ToDOM(arrayDef, parent) {
    for (let i = 0; i < arrayDef.length; i++) {
      let el = document.createElement("div");
      el.classList.add(arrayDef[i].shapeClass);
      el.classList.add(arrayDef[i].customShapeClass);
      parent.appendChild(el);
      el.style.background = arrayDef[i].color;
      el.style.left = `${arrayDef[i].x}px`;
      el.style.top = `${arrayDef[i].y}px`;
    }
  }

  /* FROM WEEK 2 */
  function getColorObj(inColor) {
    let substringColor = inColor.substring(
      inColor.indexOf("(") + 1,
      inColor.indexOf(")")
    );
    let rgbArray = [];
    rgbArray = substringColor.split(",");
    return rgbArray;
  }
};
