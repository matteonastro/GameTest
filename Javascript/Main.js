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
        this.context.fillRect(component.x, component.y, component.width, component.height + 5);
    },
}

function updateGameArea() {
    
    myGameArea.canvas.getContext("2d").clearRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    //Drawers
    myGameArea.draw(refill);
    myGameArea.draw(player);

    myGameArea.draw(box1);
    myGameArea.draw(box2);
    myGameArea.draw(box3);
    myGameArea.draw(box4);

    myGameArea.draw(bullet);

    myGameArea.draw(conveyor1);
    myGameArea.draw(conveyor2);
    myGameArea.draw(conveyor3);
    
    myGameArea.draw(spikes);

    myGameArea.draw(wallLeft);
    myGameArea.draw(wallRight);
    myGameArea.draw(block);

    //Methods
    gravity();

    wallRightCollision();
    wallLeftCollision();

    newBoxCollision(box1);
    newBoxCollision(box2);
    newBoxCollision(box3);
    newBoxCollision(box4);

    death(spikes);

    refillCollision(refill);

    conveyorCollision(conveyor1);
    conveyorCollision(conveyor2);
    conveyorCollision(conveyor3);

    moveright();
    moveleft();
    movedown();
    
    //Others
    bullet.x += bulletSpeed;

    if (airTime < 161){
        if (ground || onWall){
            jump();
        }
    }
    if (bullet.count < 1) {
        refill.color = "white";
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
        onWall = true;
    } else {onWall = false;}
}
function wallLeftCollision(){
    if (player.x < wallLeft.x + 110){
        player.x += speedLeft;
        onWall = true;
    } else {onWall = false;}
}
function oldBoxCollision(boxThing){
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

    if (playerWidth > boxThing.x & playerHeight > boxThing.y & player.x < boxWidth & player.y < boxThing.y + boxThing.width){
        player.x -= speedRight;
    }
    if (player.x - 10 < boxWidth & playerHeight > boxThing.y & player.x > boxThing.x & player.y < boxThing.y + boxThing.width){
        player.x += speedLeft;
    }
} // ^ BROKEN ^ // Keeping this for references
function newBoxCollision(box){

    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
            player.x -= speedRight;
            if (playerWidth > box.x + 5) {
                player.x -= 10;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;
            if (player.x < boxWidth - 5) {
                player.x += 10;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            player.y = boxHeight + 20;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            player.y -= 5;
            ground = true;
            airTime = 0;
        }
    }    
} // ^ NOT BROKEN ^ // Jesus finally, coding god :trollblur:
function conveyorCollision(box){

    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
            player.x -= speedRight;
            airTime = 0;
            if (playerWidth > box.x + 5) {
                player.x -= 10;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;
            airTime = 0;
            if (player.x < boxWidth - 5) {
                player.x += 10;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            player.y = boxHeight + 20;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            player.y -= 5;
            ground = true;
            airTime = 0;
        }
    } 
}
function death(spiker){
    if ((player.x + player.width > spiker.x & player.x + player.width < spiker.x + spiker.width + 40 & player.y + player.height > spiker.y)){
        player.x = 950;
        player.y = 370;
        bullet.count = 3;
        refill.color = "transparent";
    }
}
function refillCollision(boxThing){
    if (player.x + player.width > boxThing.x & player.x < (boxThing.x + boxThing.width)){
        
        if (player.y + player.height > boxThing.y & bullet.count < 1){
            bullet.count = 3;
            refill.color = "transparent";
        }
    }
}

//GAMEOBJECTS//
var player = {
    width: 40,
    height: 80,
    x: 950,
    y: 370,
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
    y: 500,
    color: "darkred"
};
var box2 = {
    width: 180,
    height: 120,
    x: 880,
    y: 460,
    color: "darkred"
};
var box3 = {
    width: 140,
    height: 40,
    x: 1060,
    y: 540,
    color: "darkred"
};
var box4 = {
    width: 120,
    height: 40,
    x: 560,
    y: 80,
    color: "darkred"
};

var conveyor1 = {
    width: 40,
    height: 100,
    x: 600,
    y: 200,
    color: "darkgrey"
};
var conveyor2 = {
    width: 40,
    height: 160,
    x: 200,
    y: 40,
    color: "darkgrey"
};
var conveyor3 = {
    width: 40,
    height: 180,
    x: 300,
    y: 400,
    color: "darkgrey"
};

var spikes = {
    width: 2000,
    height: 20,
    x: 100,
    y: 580,
    color: "black"
};
var refill = {
    width: 60,
    height: 60,
    x: 180,
    y: 500,
    color: "#650000"
};
let bullet = {
    count: 3,
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    color: "yellow"
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

        case "d":
            shoot();
            bullet.count--;
        break;

        case "s":
            //SLASH
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