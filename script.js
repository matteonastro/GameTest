function startGame() {

    myGameArea.start();
    
}
  
var myGameArea = {
    
    canvas : document.createElement("canvas"),

    start: function() {
        this.canvas.width = 1450;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);
      },    

    draw: function(component) {
        this.context.fillStyle =  component.color;
        this.context.fillRect(component.x, component.y, component.width, component.height);
    }
}

var player = {
    width: 40,
    height: 80,
    x: 500,
    y: 520,
    color: "red",
    facing: "RIGHT"
};
var block = {
    width: 1450,
    height: 20,
    x: 0,
    y: 600,
    color: "black"
};
var wallLeft = {
    width: 20,
    height: 300,
    x: 200,
    y: 300,
    color: "blue"
};
var wallRight = {
    width: 20,
    height: 300,
    x: 1200,
    y: 300,
    color: "blue"
};

var box = {
    width: 80,
    height: 80,
    x: 800,
    y: 520,
    color: "pink"
};
  
let fallSpeed = 10;
let onWall = false;

function updateGameArea() {
    
    myGameArea.canvas.getContext("2d").clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(wallLeft);
    myGameArea.draw(wallRight);
    myGameArea.draw(block);
    myGameArea.draw(box);

    if (player.y + player.height < block.y){
        player.y += fallSpeed;
    } else {
        ground = true;
        fallSpeed = 10;
        airTime = 0;
    }

    if (player.x + player.width > wallRight.x - 5){
        player.x -= speedRight;
        onWall = true;
    } else {
        onWall = false;
    }

    if (player.x < wallLeft.x + 30){
        player.x += speedLeft;
        onWall = true;
    } else {
        onWall = false;
    }

    if (player.x + player.width + 10 > box.x & player.x < box.x + box.width & player.y + player.height > box.y) {
        
        player.x -= speedRight;
    }

    if (player.x < box.x + box.width  + 10 & player.x > box.x & player.y + player.height > box.y) {
        
        player.x += speedLeft;
    }

    if (player.x + player.width > box.x & player.x < box.x + box.width & player.y + player.height > box.y) {
        
        player.y = box.y - box.height;
        ground = true;
        airTime = 0;
        moveright();
        moveleft();
    }

    moveright();
    moveleft();
    movedown();

    if (airTime < 161){
        jump();
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
            player.facing = "RIGHT"
            
        break;

        case "a":
            speedUp = 15;
            
        break;

        case "ArrowLeft":
            speedLeft = 10;
            player.facing = "LEFT"
            
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

        case "a":
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
function jump() {

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