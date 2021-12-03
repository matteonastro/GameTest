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
    },
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
    myGameArea.draw(bullet);
    myGameArea.draw(conveyor);
    myGameArea.draw(spikes);
    myGameArea.draw(spikes2);

    gravity();

    wallRightCollision();
    wallLeftCollision();

    boxCollision(box1);
    boxCollision(box2);
    boxCollision(box3);

    death(spikes);
    death(spikes2);

    conveyorCollision(conveyor);

    bullet.x += bulletSpeed;

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
        airTime = 0;
    }
}
function wallRightCollision(){
    if (player.x + player.width > wallRight.x - 5){
        player.x -= speedRight;
    }
}
function wallLeftCollision(){
    if (player.x < wallLeft.x + 110){
        player.x += speedLeft;
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
function conveyorCollision(boxThing){
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
        airTime = 0;
    }
    if (player.x - 10 < boxWidth & playerHeight > boxThing.y & player.x > boxThing.x){
        player.x += speedLeft;
        airTime = 0;
    }
}
function death(spiker){
    if ((player.x > spiker.x & player.x + player.width < spiker.x + spiker.width & player.y + player.height > spiker.y)){
        player.x = 500;
        player.y = 520;
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
    height: 300,
    x: 0,
    y: 600,
    color: "#760000"
};
var wallLeft = {
    width: 100,
    height: 1000,
    x: 0,
    y: 0,
    color: "#760000"
};
var wallRight = {
    width: 100,
    height: 1000,
    x: 1350,
    y: 0,
    color: "#760000"
};
var box1 = {
    width: 80,
    height: 80,
    x: 800,
    y: 520,
    color: "darkred"
};
var box2 = {
    width: 180,
    height: 120,
    x: 880,
    y: 480,
    color: "darkred"
};
var box3 = {
    width: 140,
    height: 40,
    x: 1060,
    y: 560,
    color: "darkred"
};
let bullet = {
    count: 3,
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    color: "yellow"
};
var conveyor = {
    width: 40,
    height: 180,
    x: 300,
    y: 420,
    color: "darkgrey"
};
var spikes = {
    width: 200,
    height: 20,
    x: 100,
    y: 580,
    color: "black"
};
var spikes2 = {
    width: 150,
    height: 20,
    x: 1200,
    y: 580,
    color: "black"
};

//MOVEMENT//
let fallSpeed = 5;
let onWall = false;
let ground = true;
let airTime = 0;
let bulletSpeed;

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

        case "s":
            shoot();
            bullet.count--;
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
function shoot(){
    if (bullet.count > 0){
        if (player.facing == "RIGHT"){
            bullet.x = player.x + player.width + 5;
            bulletSpeed = 20;
        } else {
            bullet.x = player.x - 15;
            bulletSpeed = (-20);
        }
        bullet.y = player.y + 20;
    }
}