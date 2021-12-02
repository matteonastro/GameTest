function startGame() {

    myGameArea.start();
    myGameArea.draw(player);
}
  
var myGameArea = {
    
    canvas : document.createElement("canvas"),

    start: function() {
        this.canvas.width = 1450;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea
      },    

    draw: function(component) {
        this.context.fillStyle = component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
    }
}

var player = {
    width: 40,
    height: 80,
    x: 500,
    y: 520,
    color: "red"
};

var block = {
    width: 1450,
    height: 20,
    x: 0,
    y: 600,
    color: "black"
};
  
let fallSpeed = 10;

function updateGameArea() {
    
    myGameArea.canvas.getContext("2d").clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);

    myGameArea.draw(block);

    if (player.y + player.height < block.y){
        player.y += fallSpeed;
    } else {
        ground = true;
        fallSpeed = 10;
        airTime = 0;
    }

    moveright();
    moveleft();
    movedown();

    if (airTime < 161) {
        moveup();
    }

}

let speedRight = 0;
let speedLeft = 0;
let speedUp = 0;
let speedDown = 0;

document.addEventListener('keydown', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft

    switch(event.key) {

        case "ArrowDown":
            speedDown = 0;
            
        break;
        
        case "ArrowRight":
            speedRight = 10;
            
        break;

        case "ArrowUp":
            speedUp = 15;
            
        break;

        case "ArrowLeft":
            speedLeft = 10;
            
        break;
    }
});
document.addEventListener('keyup', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft

    switch(event.key) {

        case "ArrowDown":
            speedDown = 0;
            
        break;
        
        case "ArrowRight":
            speedRight = 0;
            
        break;

        case "ArrowUp":
            speedUp = 0;
            airTime = 162;
        break;

        case "ArrowLeft":
            speedLeft = 0;
            
        break;
    }
});

let ground = true;
let airTime = 0;
function moveup() {

    player.y -= speedUp;
    ground = false;
    fallSpeed = 5;
    airTime += speedUp;
}
  
function movedown() {
    player.y += speedDown;
}

function moveleft() {
    player.x -= speedLeft;
}

function moveright() {
    player.x += speedRight;
}