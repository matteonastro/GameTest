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

    switch (levelIndex){
        case 1:
            lvl1();
        break;

        case 2:
            lvl2();
        break;

        case 3:
            lvl3();
        break;

        case 4:
            lvl4();
        break;

        case 5:
            lvl5();
        break;

        case 6:
            lvl6();
        break;

        case 7:
            lvl7();
        break;

        case 8:
            lvl8();
        break;

        case 9:
            lvl9();
        break;

        case 10:
            lvl10();
        break;

    }

    myGameArea.draw(spikes);
    myGameArea.draw(wallLeft);
    myGameArea.draw(wallRight);
    myGameArea.draw(block);
    death(spikes);
    gravity();
    wallRightCollision();
    wallLeftCollision();
    moveright();
    moveleft();
    movedown();


    if (airTime < 161){
        if (ground || onWall){
            jump();
        }
    }

} 
let levelIndex = 1;
let loadedLevel = 2;

function lvl1(){

    //Drawers
    myGameArea.draw(lvl1Pass);
    myGameArea.draw(player);

    myGameArea.draw(box1);
    myGameArea.draw(box2);
    myGameArea.draw(box3);
    myGameArea.draw(box4);

    myGameArea.draw(conveyor1);
    myGameArea.draw(conveyor2);
    myGameArea.draw(conveyor3);
    

    //Methods

    newBoxCollision(box1);
    newBoxCollision(box2);
    newBoxCollision(box3);
    newBoxCollision(box4);

    lvlPassCollision(lvl1Pass);

    conveyorCollision(conveyor1);
    conveyorCollision(conveyor2);
    conveyorCollision(conveyor3);
}
function lvl2(){
    if (loadedLevel == 2){
        loadedLevel++;
        player.checkPoint.X = 200;
        player.checkPoint.Y = 400;
        player.x = 200;
        player.y = 400
    }

    myGameArea.draw(player);
    myGameArea.draw(lvl2Box1);
    myGameArea.draw(lvl2Box2);
    myGameArea.draw(lvl2Lock1);
    myGameArea.draw(lvl2Key1);
    myGameArea.draw(lvl2Conveyor1);
    myGameArea.draw(lvl2Conveyor2);
    myGameArea.draw(lvl2Pass);

    newBoxCollision(blockUp);
    newBoxCollision(lvl2Box1);
    newBoxCollision(lvl2Box2);
    newBoxCollision(lvl2Lock1);
    keyCollectionCollision(lvl2Key1, lvl2Lock1);
    conveyorCollision(lvl2Conveyor1);
    conveyorCollision(lvl2Conveyor2);
    lvlPassCollision(lvl2Pass);


}
function lvl3(){
    
    if (loadedLevel == 3){
        loadedLevel++;
        player.checkPoint.X = 160;
        player.checkPoint.Y = 400;
        player.x = 160;
        player.y = 400
    }

    myGameArea.draw(player);
    myGameArea.draw(lvl3Box1);
    myGameArea.draw(lvl3Conveyor1);
    myGameArea.draw(lvl3Conveyor2);
    myGameArea.draw(lvl3Mover);
    myGameArea.draw(lvl3Mover2);
    myGameArea.draw(lvl3FakeBox1);
    myGameArea.draw(lvl3FakeBox2);
    myGameArea.draw(lvl3FakeBox3);
    myGameArea.draw(lvl3Lava);
    myGameArea.draw(lvl3LavaSwitch);
    myGameArea.draw(lvl3Pass);

    lvlPassCollision(lvl3Pass);
    newBoxCollision(lvl3Box1);
    verticalMoverCollision(lvl3Mover);
    horizontalMoverCollision(lvl3Mover2);
    conveyorCollision(lvl3Conveyor1);
    conveyorCollision(lvl3Conveyor2);
    lavaCollision(lvl3Lava);
    lavaSwitchCollision(lvl3LavaSwitch, lvl3Lava);
}
function lvl4(){
    alert("DEMO END this is gonna be spammed cause im too lazy xd so just close the window");
}
function lvl5(){
    
}
function lvl6(){
    
}
function lvl7(){
    
}
function lvl8(){
    
}
function lvl9(){
    
}
function lvl10(){
    
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

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (playerWidth > box.x + 5) {
                player.x -= 10;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (player.x < boxWidth - 5) {
                player.x += 10;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            player.y = boxHeight + 10;
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
            onWall = true;

            if (playerWidth > box.x + 5) {
                player.x -= 20;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;
            airTime = 0;
            onWall = true;

            if (player.x < boxWidth - 5) {
                player.x += 20;
            }
        }
    }

    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight +10){
            player.y = boxHeight +10;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            player.x = player.checkPoint.X;
            player.y = player.checkPoint.Y;
            lvl3Lava.y = 0;
            lvl3LavaSwitch. color = "orange"
        }
    } 
}
function death(spiker){
    if ((player.x + player.width > spiker.x & player.x + player.width < spiker.x + spiker.width + 40 & player.y + player.height > spiker.y)){
        player.x = player.checkPoint.X;
        player.y = player.checkPoint.Y;
        lvl2Key1.color = "cyan";
        lvl2Lock1.y = 0;
        lvl3Lava.y = 0;
        lvl3LavaSwitch. color = "orange"
    }
}
function lvlPassCollision(box){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           levelIndex = box.nextLevel;
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            levelIndex = box.nextLevel;
        }
    }

    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            levelIndex = box.nextLevel;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            levelIndex = box.nextLevel;
        }
    } 
}
function keyCollectionCollision(box, lock){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           lock.y = -200;
           box.color = "transparent";
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            lock.y = -200;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            lock.y = -200;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            lock.y = -200;
            box.color = "transparent"; 
        }
    } 
}
function verticalMoverCollision(box){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    box.y -= 5;
    if (box.y < 200){
        box.y = 600;
    }

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
            player.x -= speedRight;

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (playerWidth > box.x + 5) {
                player.x -= 10;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (player.x < boxWidth - 5) {
                player.x += 10;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            player.y = boxHeight + 10;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y -1){
            player.y -= 15;
            ground = true;
            airTime = 0;
        }
    }
}
function horizontalMoverCollision(box){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    box.x -= 7;
    if (box.x < 400){
        box.x = 900;
    }


    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
            player.x -= speedRight;

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (playerWidth > box.x + 5) {
                player.x -= 10;
            }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            player.x += speedLeft;

            if (grab){
                player.y -= 5;
                airTime = 0;
                onWall = true;
            }

            if (player.x < boxWidth - 5) {
                player.x += 10;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            player.y = boxHeight + 10;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y -1){
            player.y -= 5;
            ground = true;
            airTime = 0;
        }
    }
}
function lavaCollision(box){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x + 5){
           
            player.x = 160;
            player.y = 400
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth - 5){
            player.x = 160;
            player.y = 400
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            player.x = 160;
            player.y = 400
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            player.x = 160;
            player.y = 400
        }
    }    
}
function keyCollectionCollision(box, lock){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           lock.y = -200;
           box.color = "transparent";
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            lock.y = -200;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            lock.y = -200;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            lock.y = -200;
            box.color = "transparent";
        }
    } 
}
function lavaSwitchCollision(box, lock){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           lock.y = 400;
           box.color = "transparent";
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            lock.y = 400;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            lock.y = 400;
            box.color = "transparent";
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            lock.y = 400;
            box.color = "transparent";
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
    facing: "RIGHT",
    checkPoint: {
        X: 950,
        Y: 370
    }
};
var block = {
    width: 1450,
    height: 300,
    x: 0,
    y: 600,
    color: "#760000"
};
var blockUp = {
    width: 1450,
    height: 40,
    x: 0,
    y: -50,
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

// LEVEL THREE \\

let heightChecker1 = false;

var lvl3Box1 = {
    
    width: 160,
    height: 60,
    x: 100,
    y: 520,
    color: "darkred"
}
var lvl3FakeBox1 = {
    
    width: 150,
    height: 30,
    x: 900,
    y: 165,
    color: "#6D2727"
}
var lvl3FakeBox2 = {
    
    width: 150,
    height: 30,
    x: 1205,
    y: 210,
    color: "#6D2727"
}
var lvl3FakeBox3 = {
    
    width: 150,
    height: 30,
    x: 410,
    y: 165,
    color: "#6D2727"
}
var lvl3Conveyor1 = {
    width: 40,
    height: 300,
    x: 300,
    y: 420,
    color: "darkgrey"
};
var lvl3Conveyor2 = {
    width: 40,
    height: 100,
    x: 700,
    y: 300,
    color: "darkgrey"
};
var lvl3Mover = {
    
    width: 160,
    height: 40,
    x: 1200,
    y: 500,
    color: "darkred"
}
var lvl3Mover2 = {
    
    width: 160,
    height: 40,
    x: 700,
    y: 160,
    color: "darkred"
}
var lvl3Lava = {
    
    width: 40,
    height: 300,
    x: 700,
    y: 0,
    color: "#FF7000"
}
var lvl3LavaSwitch = {
    
    width: 50,
    height: 50,
    x: 1250,
    y: 40,
    color: "orange"
}
var lvl3Pass = {
    width: 60,
    height: 60,
    x: 200,
    y: 100,
    color: "white",
    nextLevel: 4
};

// LEVEL TWO \\
var lvl2Box1 = {
    
    width: 120,
    height: 80,
    x: 160,
    y: 500,
    color: "darkred"
};
var lvl2Box2 = {
    
    width: 120,
    height: 40,
    x: 100,
    y: 200,
    color: "darkred"
};
var lvl2Conveyor1 = {
    width: 40,
    height: 400,
    x: 500,
    y: 00,
    color: "darkgrey"
};
var lvl2Lock1 = {
    
    width: 40,
    height: 240,
    x: 220,
    y: 0,
    color: "blue"
};
var lvl2Key1 = {
    
    width: 50,
    height: 50,
    x: 1120,
    y: 80,
    color: "cyan"
};
var lvl2Conveyor2 = {
    width: 40,
    height: 400,
    x: 800,
    y: -80,
    color: "darkgrey"
};
var lvl2Pass = {
    width: 60,
    height: 60,
    x: 130,
    y: 100,
    color: "white",
    nextLevel: 3
};

// LEVL ONE \\
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
    y: 120,
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
    color: "#FF7000"
};
var lvl1Pass = {
    width: 60,
    height: 60,
    x: 1080,
    y: 100,
    color: "white",
    nextLevel: 2
};

//MOVEMENT//
let fallSpeed = 5;
let onWall = false;
let ground = true;
let airTime = 0;
let bulletSpeed;
let grab = false;

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

        break;

        case "s":
            grab = true;
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

        case "s":
            grab = false;
        break;
    }
});
function jump() {

    player.y -= speedUp;
    airTime += speedUp;
    //if (onWall){
    //    if (player.facing == "RIGHT"){
    //        player.x -= 10;
    //        
    //    } else {
    //        player.x += 10;
    //    }
    //    speedLeft = 0;
    //    speedRight = 0;
    //    
    //}
    //Wall jumping (BROKEN)
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