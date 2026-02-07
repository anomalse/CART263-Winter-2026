class Magician extends Character {
  constructor(name, imagePath,parentEl,size,x,y) {
    super(name,imagePath,parentEl,size,x,y);
    this.power = 100;
    let self = this;
    this.img.addEventListener("click", 
      function() {
        self.cast()
    })
  }

  cast() {
    this.messageBox.textContent = `${this.name} casts a fireball!`
    let self = this;
    window.setTimeout(function(){self.messageBox.textContent =`${self.name} is idle`},2000)
    console.log(`${this.name} casts a fireball!`);
    this.power--;
  }
  
}