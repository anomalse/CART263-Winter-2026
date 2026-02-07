class Fighter extends Character {
  constructor(name, imagePath,parentEl,size,x,y) {
    super(name,imagePath,parentEl,size,x,y);
    this.stamina = 100;
    let self = this;
    this.img.addEventListener("click", 
      function() {
        self.fight()
    })

  }
  
  fight() {
    console.log(this)
    this.messageBox.textContent = `${this.name} takes a mighty swing!`
    let self = this;
    window.setTimeout(function(){self.messageBox.textContent =`${self.name} is idle`},2000)
    console.log(`${this.name} takes a mighty swing!`);
    this.stamina--;
  }
}

