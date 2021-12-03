//MAIN//
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

function updateGameArea() {
    
    myGameArea.canvas.getContext("2d").clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(wallLeft);
    myGameArea.draw(wallRight);
    myGameArea.draw(block);
    myGameArea.draw(box1);
    myGameArea.draw(box2);
    myGameArea.draw(box3);

    gravity();

    wallRightCollision();
    wallLeftCollision();

    boxCollision(box1);
    boxCollision(box2);
    boxCollision(box3);

    moveright();
    moveleft();
    movedown();

    if (airTime < 161){
        jump();
    }

}

//COLLISIONS//
function gravity(){
    if (player.y + player.height < block.y){
        player.y += fallSpeed;
    } else {
        ground = true;
        fallSpeed = 10;
        airTime = 0;
    }
}
function wallRightCollision(){
    if (player.x + player.width > wallRight.x - 5){
        player.x -= speedRight;
        onWall = true;
    } else {
        onWall = false;
    }
}
function wallLeftCollision(){
    if (player.x < wallLeft.x + 30){
        player.x += speedLeft;
        onWall = true;
    } else {
        onWall = false;
    }
}
function boxCollision(boxThing){
    if ((player.x + player.width) > boxThing.x & player.x < (boxThing.x + boxThing.width)){
        
        if (player.y + player.height > boxThing.y){
            player.y -= 5;
            ground = true;
            airTime = 0;
        }
    }

    let playerWidth = player.x + player.width +5;
    let boxWidth = boxThing.x + boxThing.width;
    let playerHeight = player.y + player.height

    if (playerWidth > boxThing.x & playerHeight > boxThing.y & player.x < boxWidth){
        player.x -= speedRight;
    }
    if (player.x - 10 < boxWidth & playerHeight > boxThing.y & player.x > boxThing.x){
        player.x += speedLeft;
    }
}

//GAMEOBJECTS//
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
var box1 = {
    width: 80,
    height: 80,
    x: 800,
    y: 520,
    color: "pink"
};
var box2 = {
    width: 180,
    height: 120,
    x: 880,
    y: 480,
    color: "pink"
};
var box3 = {
    width: 140,
    height: 40,
    x: 1060,
    y: 560,
    color: "pink"
};

//MOVEMENT//
let fallSpeed = 10;
let onWall = false;
let ground = true;
let airTime = 0;

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