function startGame() {
  myGameArea.start();
  myGameArea.draw(redsquare);
}


var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 500;
    this.canvas.height = 300;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  draw: function (component) {
    this.context.fillStyle = component.color;
    this.context.fillRect(component.x, component.y, component.width, component.height);
  },

  clear: function () {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.draw(redsquare);
  myGameArea.draw(goldSquare);

  myGameArea.draw(ost1);
  myGameArea.draw(ost2);
  myGameArea.draw(ost3);

  newBoxCollision(ost1);
  newBoxCollision(ost2);
  newBoxCollision(ost3);

  collisionWin(goldSquare);

  movimento1();
  movimento2();
  movimento3();

  redsquare.x += hsp;
  redsquare.y += vsp;
}

var redsquare = {
  width: 20,
  height: 20,
  x: 10,
  y: 10,
  color: "red"
}
var goldSquare = {
  width: 15,
  height: 15,
  x: 470,
  y: 135,
  color: "gold"
}

//ostacoli
var ost1 = {
  width: 25,
  height: 25,
  x: 320,
  y: 135,
  color: "black"
}
var ost2 = {
  width: 25,
  height: 25,
  x: 120,
  y: 135,
  color: "black"
}
var ost3 = {
  width: 25,
  height: 25,
  x: 220,
  y: 135,
  color: "black"
}

function up() {
  if (redsquare.y>=10) {
    redsquare.y -= 10;
  }
}
function down() {
  if (redsquare.y<=270) {
    redsquare.y += 10;
  }
}
function left() {
  if (redsquare.x>=10) {
    redsquare.x -= 10;
  }
}
function right() {
  if (redsquare.x<=470) {
    redsquare.x+= 10;
  }
}



function newBoxCollision(box){
  let playerWidth = redsquare.x + redsquare.width + 5;
  let playerHeight = redsquare.y + redsquare.height;
  let boxWidth = box.x + box.width + 5;
  let boxHeight = box.y + box.height;

  if (playerHeight > box.y & redsquare.y < boxHeight & redsquare.x < boxWidth){
     if (playerWidth > box.x + 10){
      location.reload();
     
      }
  }
  if (playerHeight > box.y & redsquare.y < boxHeight & playerWidth > box.x){
      if (redsquare.x < boxWidth - 10){
        location.reload();
       
      }
  }
  if (playerWidth > box.x - 10 & redsquare.x < boxWidth & playerHeight > box.y){
      if (redsquare.y < boxHeight){
        location.reload();
        
      }
  }
  if (playerWidth > box.x - 10 & redsquare.x < boxWidth & redsquare.y < boxHeight ){
      if (playerHeight > box.y){
        location.reload();
        
      }
  }    
}
function collisionWin(box) { //collisioni
  let playerWidth = redsquare.x + redsquare.width;
  let playerHeight = redsquare.y + redsquare.height;
  let boxWidth = box.x + box.width + 5;

  if (playerWidth > box.x  & redsquare.x < boxWidth  & playerHeight > box.y ){
    location.reload();
    alert("Hai vinto!");
  }
}

let border=false;

function movimento1() {
  if (ost1.y>=0 && border==false) {
    ost1.y=ost1.y-6;
  }
  else {
    border=true;
  }
  if (ost1.y<=270 && border==true) {
    ost1.y=ost1.y+6;
  }
  else {
    border=false;
  }
}

let border2=false;

function movimento2() {
  if (ost2.y>=0 && border2==false) {
    ost2.y=ost2.y-4;
  }
  else {
    border2=true;
  }
  if (ost2.y<=270 && border2==true) {
    ost2.y=ost2.y+4;
  }
  else {
    border2=false;
  }
}

let border3=false;

function movimento3() {
  if (ost3.y>=0 && border3==false) {
    ost3.y=ost3.y-5;
  }
  else {
    border3=true;
  }
  if (ost3.y<=270 && border3==true) {
    ost3.y=ost3.y+5;
  }
  else {
    border3=false;
  }
}

let hsp = 0;
let vsp = 0;

document.addEventListener('keydown', (event) => {
    
      switch(event.key) {

          case "a":
            hsp =-5;
          break;
          
          case "d":
            hsp =5;
          break;

          case "w":
            vsp =-5;
          break;

          case "s":
            vsp = 5;
          break;
      }
  }
);

document.addEventListener('keyup', (event) => {
    
  switch(event.key) {

      case "a":
        hsp =0;
      break;
      
      case "d":
        hsp =0;
      break;

      case "w":
        vsp =0;
      break;

      case "s":
        vsp = 0;
      break;
  }
}
);







