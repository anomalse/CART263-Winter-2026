
 /*** HELPER SCRIPT :: NO NEED TO CHANGE */
  let windowKeyDownRef = null;
  let windowKeyUpRef = null;

  /**************************************************** */
  /* global function to clear all animation refs */
  function cancelALlTimerrefs() {
   
  
    if(windowKeyDownRef!==null){
      window.removeEventListener("keydown",windowKeyDownRef);
    }

    if(windowKeyUpRef!==null){
      window.removeEventListener("keyup",windowKeyUpRef);
    }
 
    window.cancelRequestAnimFrame = (function () {
      return (
        window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
      );
    })();

    for (let i = 1; i < 99999; i++) {
      window.clearInterval(i);
      window.cancelRequestAnimFrame(i);

     
    }
  }
  /**************************************************** */

  /* global function to reset canvases */
  function resetCanvases(teamCanvases) {
    let otherCanvases = document.querySelectorAll(teamCanvases);
    //clear
    for (canvas of otherCanvases) {
      //reset the canvas
      canvas.innerHTML = "";
      canvas.style.display = "none";
      canvas.replaceWith(canvas.cloneNode(true));
    }
    cancelALlTimerrefs();
  
  }


/**************************************************** */
function resetButtons(teamButtons,activeButton){
    for (let button of teamButtons) {
        button.classList.remove("active-button");
    }
    activeButton.classList.add("active-button");
}
/**************************************************** */
  /* NO NEED TO MODIFY THIS FUNCTION :) */
  /*** helper function to activate buttons */
  /**************************************************** */
  function activateButtons(team, teamCanvas,aniA,aniB,aniC,aniD) {
    let teamButtons = document.querySelectorAll(`${team} .team-nav p`);
    //2:
    //console.log(teamButtons);
    for (let button of teamButtons) {
      button.addEventListener("click", buttonCallBack);

      function buttonCallBack(e) {
        switch (this.textContent) {
          case "1": {
            console.log("A");
            //reset the canvases
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas A
            document.getElementById(`${teamCanvas}_A`).style.display = "block";
            //run first
            aniA(document.getElementById(`${teamCanvas}_A`));

            break;
          }
          case "2": {
            console.log("B");
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas B
            document.getElementById(`${teamCanvas}_B`).style.display = "block";
            //run second
            aniB(document.getElementById(`${teamCanvas}_B`));
            break;
          }
          case "3": {
            console.log("C");
            //reset the canvases
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas C
            document.getElementById(`${teamCanvas}_C`).style.display = "block";
            //run third
            aniC(document.getElementById(`${teamCanvas}_C`));
            break;
          }
          case "4": {
            console.log("D");
             //reset the canvases
            resetCanvases(`${team} .aniCanvas`);
            //reset buttons
            resetButtons(teamButtons, this);
            //activate canvas D
            document.getElementById(`${teamCanvas}_D`).style.display = "block";
            //run fourth
            aniD(document.getElementById(`${teamCanvas}_D`));
            break;
          }
          case "5": {
            console.log("E");
            break;
          }
          case "6": {
            console.log("F");
            break;
          }
        }
      }
    } //for
  }