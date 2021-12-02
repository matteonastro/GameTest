function startGame() {

    myGameArea.start();
    myGameArea.draw(redSquare);
}
  
var myGameArea = {
    
    canvas : document.createElement("canvas"),

    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
      },    

    draw: function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
    }
}

var redSquare = {
    width: 20,
    height: 20,
    x: 10,
    y: 120,
    color: "red"
};
  
function updateGameArea() {
    myGameArea.draw(redSquare);
}  

document.addEventListener('keydown', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft

    switch(event.key) {

        case "ArrowDown":
            movedown();
        break;
        
        case "ArrowRight":
            moveright();
        break;

        case "ArrowUp":
            moveup();
        break;

        case "ArrowLeft":
            moveleft()
        break;
    }
});
    
function moveup() {
    redSquare.y -= 30;
}
  
function movedown() {
    redSquare.y += 30;
}

function moveleft() {
    redSquare.x -= 30;
}

function moveright() {
    redSquare.x += 30;
}