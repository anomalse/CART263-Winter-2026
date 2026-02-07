/*BAse class */
class Character {
  constructor(name,imagePath,parent,size,x,y) {
    this.name = name;
    this.health = 100;
    this.imagePath = imagePath;
    this.parent = parent;
    this.size =size;
    this.x = x;
    this.y =y;
    this.img = this.createImage();
    this.messageBox = this.createMessageBox()

    
  }
  createImage(){
    let im = document.createElement("img")
    im.src = this.imagePath;
    im.style.width = this.size+"px";
    im.style.height = this.size+"px";
    im.style.left = this.x+"px";
    im.style.top = this.y+"px";
    im.classList.add("imgCharacter")
    this.parent.appendChild(im)
    return im;
  }

  createMessageBox(){
      let mb = document.createElement("p")
      mb.textContent = `${this.name} is idle`
      mb.style.left = this.x+this.size/2+"px";
      mb.style.top = this.y+10+"px";
      mb.classList.add("mbCharacter")
      this.parent.appendChild(mb)
      return mb;


  }
}