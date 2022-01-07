//MAIN//
function startGame() {
    myGameArea.start();
}
  
var myGameArea = {
    
    canvas: document.createElement("canvas"),

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
let frame = 0;
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

        case 11:
            lvl11();
        break;

        case 12:
            lvl12();
        break;
    }
    mainObjects();
    if (spikes.y < 0){
                    
        myGameArea.canvas.getContext("2d").fillStyle = "black";
        myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
        myGameArea.canvas.getContext("2d").fillStyle = "white";
        myGameArea.canvas.getContext("2d").font = "80px italic";
        myGameArea.canvas.getContext("2d").fillText("You have been embraced by the void.", 140, 340);
    }
} 

let levelIndex = 7;
let loadedLevel = 7;

function mainObjects(){
    
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
    if (airTime < 10){
        player.color = "red";
    } else {
        player.color = "cyan";
    }
}

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

    myGameArea.draw(lvl3FakeBox1);
    myGameArea.draw(lvl3FakeBox2);
    myGameArea.draw(lvl3FakeBox3);
    myGameArea.draw(player);
    myGameArea.draw(lvl3Box1);
    myGameArea.draw(lvl3Conveyor1);
    myGameArea.draw(lvl3Conveyor2);
    myGameArea.draw(lvl3Mover);
    myGameArea.draw(lvl3Mover2);
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

    if (loadedLevel == 4){
        loadedLevel++;
        player.checkPoint.X = 160;
        player.checkPoint.Y = 400;
        player.x = 160;
        player.y = 400

        spikes.color = "#595959"
        block.color = "#3D3D3D"
        wallLeft.color = "#3D3D3D"
        wallRight.color = "#3D3D3D"
    }
    
    myGameArea.canvas.getContext("2d").fillStyle = "#292929";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(lvl4Box1);
    myGameArea.draw(lvl4Box2);
    myGameArea.draw(lvl4Fan1);   
    myGameArea.draw(lvl4Fan2); 
    myGameArea.draw(lvl4Fan3); 
    myGameArea.draw(lvl4KillerPillar1);   
    myGameArea.draw(lvl4KillerPillar2);  
    myGameArea.draw(lvl4KillerPillar3);
    myGameArea.draw(lvl4KillerPillar4);
    myGameArea.draw(lvl4FanOn);
    myGameArea.draw(lvl4Pass);

    newBoxCollision(blockUp);
    newBoxCollision(lvl4Box1);
    newBoxCollision(lvl4Box2);
    killerPillarCollision(lvl4KillerPillar1);
    killerPillarCollision(lvl4KillerPillar2);
    killerPillarCollision(lvl4KillerPillar3);
    killerPillarCollision(lvl4KillerPillar4);
    fanCollision(lvl4Fan1);
    fanCollision(lvl4Fan2);
    fanCollision(lvl4Fan3);
    fanOnCollision(lvl4FanOn, lvl4Fan3);
    lvlPassCollision(lvl4Pass);
}
function lvl5(){
    if (loadedLevel == 5){
        loadedLevel++;
        player.checkPoint.X = 1270;
        player.checkPoint.Y = 400;
        player.x = 1270;
        player.y = 400

        spikes.color = "#595959"
        block.color = "#3D3D3D"
        wallLeft.color = "#3D3D3D"
        wallRight.color = "#3D3D3D"
    }
    
    if (player.x < lvl5KillerPillar2.x - 80 & lvl5KillerPillar2.y + lvl5KillerPillar2.width < block.y - 80){
        lvl5KillerPillar2.y += 10
    }
    if (!lvl5Fan1.on & lvl5Pass.y + lvl5Pass.width < lvl5Fan1.y - 5){
        lvl5Pass.y += 10;
    }

    myGameArea.canvas.getContext("2d").fillStyle = "#292929";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(lvl5Box1);
    myGameArea.draw(lvl5Box2);
    myGameArea.draw(lvl5Fan1);
    myGameArea.draw(lvl5Fan2);
    myGameArea.draw(lvl5Fan3);
    myGameArea.draw(lvl5KillerPillar1);
    myGameArea.draw(lvl5KillerPillar2);
    myGameArea.draw(lvl5KillerPillar3);
    myGameArea.draw(lvl5KillerPillar4);
    myGameArea.draw(lvl5FanOn);
    myGameArea.draw(lvl5Pass);

    newBoxCollision(blockUp);
    newBoxCollision(lvl5Box1);
    newBoxCollision(lvl5Box2);
    fanCollision(lvl5Fan1);
    fanCollision(lvl5Fan2);
    fanCollision(lvl5Fan3);
    killerPillarCollision(lvl5KillerPillar1);
    killerPillarCollision(lvl5KillerPillar2);
    killerPillarCollision(lvl5KillerPillar3);
    killerPillarCollision(lvl5KillerPillar4);
    fanOnCollision(lvl5FanOn, lvl5Fan1);
    fanOnCollision(lvl5FanOn2, lvl5Fan3);
    lvlPassCollision(lvl5Pass);
}
function lvl6(){
    if (loadedLevel == 6){
        loadedLevel++;
        player.checkPoint.X = 160;
        player.checkPoint.Y = 400;
        player.x = 160;
        player.y = 400

        spikes.color = "#595959"
        block.color = "#3D3D3D"
        wallLeft.color = "#3D3D3D"
        wallRight.color = "#3D3D3D"
    }

    myGameArea.canvas.getContext("2d").fillStyle = "#292929";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(lvl6Box1);
    myGameArea.draw(lvl6Fan1);
    myGameArea.draw(lvl6Fan2);
    myGameArea.draw(lvl6Fan3);
    myGameArea.draw(lvl6Fan4);
    myGameArea.draw(lvl6Fan5);
    myGameArea.draw(lvl6Fan6);
    myGameArea.draw(lvl6Fan7);
    myGameArea.draw(lvl6FanOn);
    myGameArea.draw(lvl6KillerPillar1);
    myGameArea.draw(lvl6KillerPillar2);
    myGameArea.draw(lvl6Pass);
    
    
    newBoxCollision(blockUp);
    newBoxCollision(lvl6Box1);
    fanCollision(lvl6Fan1);
    fanCollision(lvl6Fan2);
    fanCollision(lvl6Fan3);
    fanCollision(lvl6Fan4);
    fanCollision(lvl6Fan5);
    fanCollision(lvl6Fan6);
    fanCollision(lvl6Fan7);
    killerPillarCollision(lvl6KillerPillar1);
    killerPillarCollision(lvl6KillerPillar2);
    fanOnCollision(lvl6FanOn, lvl6Fan7);
    lvlPassCollision(lvl6Pass);

    if (player.y + player.height < lvl6KillerPillar1.y & lvl6KillerPillar1.x + lvl6KillerPillar1.width < 1500){
        lvl6KillerPillar1.x += 10;
    }
    if (!lvl6Fan7.on & lvl6Pass.y + lvl6Pass.width < lvl6Fan7.y - 5){
        lvl6Pass.y += 5;
    }
    if (player.y > lvl6KillerPillar1.y  + lvl6KillerPillar1.height & lvl6KillerPillar1.x > 0){
        lvl6KillerPillar1.x -= 10;
    }
}
function lvl7(){
    if (loadedLevel == 7){
        loadedLevel++;
        player.checkPoint.X = 600;
        player.checkPoint.Y = 500;
        player.x = 600;
        player.y = 500

        spikes.color = "transparent"
        block.y += 180;
        wallLeft.color = "transparent"
        wallRight.color = "transparent"
        wallLeft.x = -100;
        wallRight.x += 100;
        spikes.x -= 300;
        spikes.y += 160;
        spikes.height = 200
    }

    
    myGameArea.canvas.getContext("2d").fillStyle = "#FFD10D";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(BossGroundPre);
    myGameArea.draw(bossPatformTwo);
    myGameArea.draw(bossPatformOne);
    myGameArea.draw(bossPatformThree);
    
    newBoxCollision(BossGroundPre);
    newBoxCollision(bossPatformTwo);
    newBoxCollision(bossPatformOne);
    newBoxCollision(bossPatformThree);

    if (player.y < bossPatformThree.y - 80 & speedLeft == 0 & speedRight == 0){

        myGameArea.canvas.getContext("2d").fillStyle = "black";
        myGameArea.canvas.getContext("2d").font = "40px italic";
        myGameArea.canvas.getContext("2d").fillText("Press /X/ to challenge the god of this land", 400, 160);

        if (challenge){

            cutscene = true;
            frame++;
            switch (frame){
                case 13:
                    bossPatformOne.y = 10000 //Im genuinely too lazy so whatever works man
                    break;
                case 27:
                    bossPatformTwo.y = 10000 //Im genuinely too lazy so whatever works man
                    break;
                case 42:
                    bossPatformThree.y = 10000 //Im genuinely too lazy so whatever works man
                    break;
                case 50:
                    levelIndex++;
                    break;
            }
        }
    }
}
function lvl8(){

    if (loadedLevel == 8){
        player.checkPoint.X = 700;
        loadedLevel++;
        cutscene = false;
        spikes.y = 900;
        spikes.color = "black";
        spikes.height = 10000;
    }

    myGameArea.canvas.getContext("2d").fillStyle = "#FFD10D";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);

    myGameArea.draw(player);
    myGameArea.draw(BossGroundPre);
    myGameArea.draw(P1Pat1);
    myGameArea.draw(P1Pat2);
    myGameArea.draw(spikes);
    
    newBoxCollision(BossGroundPre);
    conveyorCollision(P1Pat1);
    fanCollision(P1Pat2);
    if (player.y > BossGroundPre.y + 80){
        deathReset();
        Radiance.HP = 500;
    }
    
    if (Radiance.HP > 0){

        myGameArea.draw(Radiance.hitbox);
        myGameArea.draw(Radiance.attacks.laser);
        myGameArea.draw(Radiance.attacks.orb);
        myGameArea.draw(Radiance.attacks.sword);

        Radiance.updaters.laserMover();
        Radiance.updaters.orbMover();
        Radiance.updaters.swordMover();

        bossDeath(Radiance.attacks.laser);
        bossDeath(Radiance.attacks.orb);
        bossDeath(Radiance.attacks.sword);
        Radiance.attacks.beginAttack();
        Radiance.takeDamage(Radiance.hitbox);
        if (Radiance.attacks.orb.orbing){

            Radiance.attacks.orb.homing();
        }
        myGameArea.canvas.getContext("2d").fillStyle = "black";
        myGameArea.canvas.getContext("2d").font = "40px italic";
        myGameArea.canvas.getContext("2d").fillText(Radiance.HP, Radiance.hitbox.x+40, Radiance.hitbox.y+80);
    } else{
        
        myGameArea.draw(P1Pat3);
        myGameArea.draw(P1Pat4);
        myGameArea.draw(P1Pat5);
        myGameArea.draw(Void);
        
        newBoxCollision(P1Pat3);
        newBoxCollision(P1Pat4);
        newBoxCollision(P1Pat5);
        lvlPassCollision(Void);
        death(spikes);

        spikes.y -= 3;
    }

}
function lvl9(){
    
    myGameArea.canvas.getContext("2d").fillStyle = "black";
    myGameArea.canvas.getContext("2d").fillRect(0,0, myGameArea.canvas.width, myGameArea.canvas.height);
    myGameArea.canvas.getContext("2d").fillStyle = "white";
    myGameArea.canvas.getContext("2d").font = "80px italic";
    myGameArea.canvas.getContext("2d").fillText("You have embraced the void.", 280, 340);
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
        deathReset();
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
    if (box.y < 160){
        box.y = 600;
    }

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
        if (player.y < boxHeight + 10){
            player.y = boxHeight + 10;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y){
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

    box.x -= 8;
    if (box.x < 400){
        box.x = 900;
    }


    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           player.y += 10;
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
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
           deathReset();
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth - 5){
            deathReset();
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            deathReset();
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            deathReset();
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
function deathReset(){
    player.x = player.checkPoint.X;
    player.y = player.checkPoint.Y;
    lvl2Key1.color = "cyan";
    lvl2Lock1.y = 0;
    lvl3Lava.y = 0;
    lvl3LavaSwitch. color = "orange";
    lvl4FanOn.color = "#07C900";
    lvl4Fan3.on = false;
    lvl4Fan3.color = "#035900";
    lvl5KillerPillar2.y = 0;
    lvl5Fan1.on = true;
    lvl5FanOn.y = 430;
    lvl4FanOn.y = 40;
    lvl5Fan1.color = "green";
    lvl5FanOn.color = "#07C900";
    lvl5Pass.y = -120;
    lvl5Fan3.on = false;
    lvl5Fan3.color = "#035900";
    lvl5FanOn2.y = 430;
    lvl6KillerPillar1.x = 0;
    lvl6FanOn.y = 265;
    lvl6FanOn.color = "#07C900"
    lvl6Fan7.on = true;
    lvl6Fan7.color = "green"   
    lvl6Pass.y = -120;
}
function fanCollision(box){
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
        if (player.y < boxHeight + 10){
            player.y = boxHeight + 10;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (box.on){
            if (umbrella){
                if (airTime > 0){
                    if (airTime > 161){            
                        player.y -= 10; 
                    }
                } else if (airTime < 1){ 
                    player.y -= 10; 
                }
            }
            if (playerHeight > box.y - 1){
                deathReset();
            }
        } else {
            if (playerHeight > box.y - 1){
                player.y -= 5;
                ground = true;
                airTime = 0;
            }
        }
    } 
} 
function killerPillarCollision(box){
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
        if (player.y < boxHeight){
            deathReset();
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            deathReset();
        }
    }    
}
function fanOnCollision(box, lock){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
           if (lock.on){
               lock.on = false;
               lock.color = "#035900"
           } else {
                lock.on = true;
                lock.color = "green";
           }
           box.color = "transparent";
           box.y = -80;
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            if (lock.on){
                lock.on = false;
                lock.color = "#035900"
            } else {
                 lock.on = true;
                 lock.color = "green";
            }
            box.color = "transparent"
            box.y = -80;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 20){
            if (lock.on){
                lock.on = false;
                lock.color = "#035900"
            } else {
                 lock.on = true;
                 lock.color = "green";
            }
            box.color = "transparent"
            box.y = -80;
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
            if (lock.on){
                lock.on = false;
                lock.color = "#035900"
            } else {
                 lock.on = true;
                 lock.color = "green";
            }
            box.color = "transparent"
            box.y = -80;
        }
    } 
}
function bossDeath(box){
    let playerWidth = player.x + player.width + 5;
    let playerHeight = player.y + player.height;
    let boxWidth = box.x + box.width + 5;
    let boxHeight = box.y + box.height;

    if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
       if (playerWidth > box.x){
        if (Radiance.HP < 500){
            Radiance.HP += 2;
        } else {
            Radiance.HP = 500;
        }
        }
    }
    if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
        if (player.x < boxWidth){
            if (Radiance.HP < 500){
                Radiance.HP += 2;
            } else {
                Radiance.HP = 500;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
        if (player.y < boxHeight + 10){
            if (Radiance.HP < 500){
                Radiance.HP += 2;
            } else {
                Radiance.HP = 500;
            }
        }
    }
    if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
        if (playerHeight > box.y - 1){
           if (Radiance.HP < 500){
               Radiance.HP += 2;
           } else {
               Radiance.HP = 500;
           }
        }
    }    
}

// <--- THE RADIANCE ---> \\
var Radiance = { 

    /*Note: This is insane why the fuck am i doing this lmao well im gonna leave notes for how i slowly become insane from this here 
            [11:09] i am, fine, i think, also this boss is ripped off Hollow Knight, my favourite game 
            [11:26] thinking of making functions specific to the objects in the boss, dont need more of them sooo
            [13:08] i made the laser attack work, working on the orb one now, i had dinner- i didnt just spend 2 hours making an attack
            [14:05] HOMING ORBS HOLY SHIT IT WORKS HOWHOWHOWHOWHOW
            [16:32] fuck other phases, one is enough, sword attacks going in phase one and HHHHHHHHHHHHHH yea
            [18:01] i am going insane
            [18:49] DONE ITS DONE ITS DONE AHAHJAHJAHJAHJHJSHJASHJASHJ*/

    HP: 500, //One hit = 1 dmg, once the player collides with the radiance one HP is subtracted.
    takeDamage: function(box){
        let playerWidth = player.x + player.width + 5;
        let playerHeight = player.y + player.height;
        let boxWidth = box.x + box.width + 5;
        let boxHeight = box.y + box.height;

        if (playerHeight > box.y & player.y < boxHeight & player.x < boxWidth - 40){
        if (playerWidth > box.x){

            this.HP--;
            }
        }
        if (playerHeight > box.y & player.y < boxHeight & playerWidth > box.x + 40){
            if (player.x < boxWidth){
                
            this.HP--;
            }
        }
        if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & playerHeight > box.y + 40){
            if (player.y < boxHeight + 10){
                
            this.HP--;
            }
        }
        if (playerWidth > box.x + 10 & player.x < boxWidth - 10 & player.y < boxHeight - 40){
            if (playerHeight > box.y - 1){
                
            this.HP--;
            }
        }    
    },

    hitbox: { //Boss hitbox
        width: 120,
        height: 120,
        x: 640,
        y: 200,
        color: "white"
    },

    attacks: { //Attacks she can randomly choose from

        attacking: false,
        beginAttack: function(){
            
            if (!this.attacking){
                
                attackIndex = Math.floor(Math.random() * 3);
                switch (attackIndex){
                    case 0:
                        Radiance.attacks.laser.move(Math.random() >= 0.5);
                        this.attacking = true;
                        break;
                    case 1:
                        Radiance.attacks.orb.move();
                        this.attacking = true;
                        break;
                    case 2:
                        Radiance.attacks.sword.move();
                        this.attacking = true;
                        break;
                }
            }
        },

        laser: { //One laser going from left to right, player has to use their iFrame ability ([D] Key) to pass through.
            
            width: 20,
            height: 1000,
            x: 0,
            y: 0,
            color: "white",

            attackTime: 0,
            moveSpeed: 0, //If positive moves to the right, if negative moves to the left

            move: function(right){
                if (right){
                    
                    Radiance.attacks.laser.x = 0;
                    Radiance.attacks.laser.moveSpeed = 10;
                } else{

                    Radiance.attacks.laser.x = 1420;
                    Radiance.attacks.laser.moveSpeed = -10;
                }
            }
        },
        orb: { //A fireball homing towards the player (thats the plan, i might end up just aiming for the player with it tho)

            width: 60,
            height: 60,
            x: 0,
            y: -60,
            color: "white",

            attackTime: 0,
            moveSpeedx: 0,
            moveSpeedy: 0,
            orbing: false,

            move: function(){

                Radiance.attacks.orb.x = Radiance.hitbox.x;
                Radiance.attacks.orb.y = Radiance.hitbox.y;

                Radiance.attacks.orb.orbing = true;
            },
            homing: function(){

                if (Radiance.attacks.orb.x < player.x){

                    Radiance.attacks.orb.moveSpeedx = (player.x + 10 - Radiance.attacks.orb.x) / 20;
                    Radiance.attacks.orb.moveSpeedy = (player.y + 50 - Radiance.attacks.orb.y) / 20;
                } else{
                    
                    Radiance.attacks.orb.moveSpeedx = -((Radiance.attacks.orb.x - player.x + 10) / 20);
                    Radiance.attacks.orb.moveSpeedy = ((player.y + 50 - Radiance.attacks.orb.y) / 20);
                }
            }
        },
        sword: { //A sword appears in the sky, after 20 frames it falls down (this is for phase 2)
            
            width: 40,
            height: 120,
            x: -120,
            y: -120,
            color: "white",
            moveSpeedy: 0,
            attackTime: 0,

            move: function(){

               Radiance.attacks.sword.moveSpeedy = 15;

               if (Math.random() >= 0.5){
                   
                   Radiance.attacks.sword.x = 200;
               } else{

                   Radiance.attacks.sword.x = 1200;
               }
                

            }
        },
    },
    
    updaters: {
        laserMover: function(){

            Radiance.attacks.laser.x += Radiance.attacks.laser.moveSpeed;

            if (Radiance.attacks.laser.attackTime > 160){

                Radiance.attacks.attacking = false;
                Radiance.attacks.laser.moveSpeed = 0;
                Radiance.attacks.laser.x = 0;
                Radiance.attacks.laser.attackTime = 0;
            } else{
                
                Radiance.attacks.laser.attackTime++;
                
                if (Radiance.attacks.laser.attackTime > 88){
                    
                    if (Radiance.attacks.laser.moveSpeed > 0){

                        Radiance.attacks.laser.moveSpeed -= 0.2;
                    } else{

                        Radiance.attacks.laser.moveSpeed += 0.2;
                    }
                }
            }

            if (Radiance.attacks.laser.attackTime == 80){

                Radiance.hitbox.x = Math.floor(Math.random() * 900) + 200;
                Radiance.hitbox.y = Math.floor(Math.random() * 130) + 200;
            }
        },
        orbMover: function(){

            Radiance.attacks.orb.width -= 0.2;
            Radiance.attacks.orb.height -= 0.2;

            Radiance.attacks.orb.x += Radiance.attacks.orb.moveSpeedx;
            Radiance.attacks.orb.y += Radiance.attacks.orb.moveSpeedy;

            if (Radiance.attacks.orb.attackTime > 160){

                Radiance.attacks.attacking = false;
                Radiance.attacks.orb.moveSpeedx = 0;
                Radiance.attacks.orb.moveSpeedy = 0;
                Radiance.attacks.orb.x = -1000;
                Radiance.attacks.orb.y = -1000;
                Radiance.attacks.orb.attackTime = 0;
                Radiance.attacks.orb.orbing = false;
                Radiance.attacks.orb.width = 60;
                Radiance.attacks.orb.height = 60;
            } else{
                
                Radiance.attacks.orb.attackTime++;
                
                if (Radiance.attacks.orb.attackTime == 80){
                    Radiance.hitbox.x = Math.floor(Math.random() * 900) + 200;
                    Radiance.hitbox.y = Math.floor(Math.random() * 130) + 200;
                }
            }
        },
        swordMover: function(){

            Radiance.attacks.sword.y += Radiance.attacks.sword.moveSpeedy;

            if (Radiance.attacks.orb.attackTime > 160){

                Radiance.attacks.attacking = false;
                Radiance.attacks.sword.moveSpeedy = 0;
                Radiance.attacks.sword.y = -1000;
                Radiance.attacks.sword.attackTime = 0;
            } else{
                
                Radiance.attacks.sword.attackTime++;
            }
        }
    }
}

// Pre Phase \\
var BossGroundPre = {
    
    width: 1000,
    height: 100,
    x: 220,
    y: 600,
    color: "#9B5412"
}
var bossPatformOne = {
    
    width: 120,
    height: 40,
    x: 440,
    y: 500,
    color: "#9B5412"
}
var bossPatformTwo = {
    
    width: 120,
    height: 40,
    x: 800,
    y: 440,
    color: "#9B5412"
}
var bossPatformThree = {
    
    width: 160,
    height: 40,
    x: 500,
    y: 360,
    color: "#9B5412"
}

// Phase 1 \\
var P1Pat1 = {
    
    width: 40,
    height: 200,
    x: 100,
    y: 260,
    color: "grey"
}
var P1Pat2 = {
    
    width: 120,
    height: 660,
    x: 1280,
    y: 660,
    color: "green",
    on: true
}
var P1Pat3 = {
    
    width: 120,
    height: 40,
    x: 400,
    y: 400,
    color: "#9B5412"
}
var P1Pat4 = {
    
    width: 120,
    height: 40,
    x: 940,
    y: 400,
    color: "#9B5412"
}
var P1Pat5 = {
    
    width: 120,
    height: 40,
    x: 660,
    y: 300,
    color: "#9B5412"
}
var Void = {
    width: 60,
    height: 60,
    x: 690,
    y: 200,
    color: "black",
    nextLevel: 9
};


// LEVEL SIX \\
var lvl6Box1 = {
    
    width: 160,
    height: 60,
    x: 90,
    y: 520,
    color: "grey"
}
var lvl6Fan1 = {
    width: 80,
    height: 60,
    x: 300,
    y: -100,
    color: "green",
    on: true
}
var lvl6Fan2 = {
    width: 80,
    height: 60,
    x: 450,
    y: 540,
    color: "green",
    on: true
}
var lvl6Fan3 = {
    width: 80,
    height: 60,
    x: 600,
    y: 540,
    color: "green",
    on: true
}
var lvl6Fan4 = {
    width: 80,
    height: 60,
    x: 750,
    y: 540,
    color: "green",
    on: true
}
var lvl6Fan5 = {
    width: 80,
    height: 60,
    x: 900,
    y: 540,
    color: "green",
    on: true
}
var lvl6Fan6 = {
    width: 80,
    height: 60,
    x: 1050,
    y: 540,
    color: "green",
    on: true
}
var lvl6Fan7 = {
    width: 160,
    height: 60,
    x: 1200,
    y: 520,
    color: "green",
    on: true
}
var lvl6KillerPillar1 = {
    
    width: 1200,
    height: 80,
    x: 0,
    y: 250,
    color: "darkgrey"
}
var lvl6KillerPillar2 = {
    
    width: 1450,
    height: 80,
    x: 0,
    y: -40,
    color: "darkgrey"
}
var lvl6FanOn = {
    
    width: 50,
    height: 50,
    x: 150,
    y: 265,
    color: "#07C900"
}
var lvl6Pass = {
    width: 60,
    height: 60,
    x: 1250,
    y: -120,
    color: "white",
    nextLevel: 7
};

// LEVEL FIVE \\
var lvl5Box1 = {
    
    width: 160,
    height: 60,
    x: 1230,
    y: 520,
    color: "grey"
}
var lvl5Box2 = {
    
    width: 160,
    height: 60,
    x: 90,
    y: 520,
    color: "grey"
}
var lvl5Fan1 = {
    width: 80,
    height: 60,
    x: 1100,
    y: 540,
    color: "green",
    on: true
}
var lvl5Fan2 = {
    width: 80,
    height: 60,
    x: 560,
    y: 540,
    color: "green",
    on: true
}
var lvl5Fan3 = {
    width: 80,
    height: 60,
    x: 300,
    y: 540,
    color: "#035900",
    on: false
}
var lvl5KillerPillar1 = {
    
    width: 80,
    height: 500,
    x: 970,
    y: 200,
    color: "darkgrey"
}
var lvl5KillerPillar2 = {
    
    width: 80,
    height: 420,
    x: 700,
    y: 0,
    color: "darkgrey"
}
var lvl5KillerPillar3 = {
    
    width: 80,
    height: 500,
    x: 430,
    y: 300,
    color: "darkgrey"
}
var lvl5KillerPillar4 = {
    
    width: 80,
    height: 160,
    x: 430,
    y: 0,
    color: "darkgrey"
}
var lvl5FanOn = {
    
    width: 50,
    height: 50,
    x: 150,
    y: 430,
    color: "#07C900"
}
var lvl5FanOn2 = {
    
    width: 50,
    height: 50,
    x: 150,
    y: 430,
    color: "#07C900"
}
var lvl5Pass = {
    width: 60,
    height: 60,
    x: 1110,
    y: -120,
    color: "white",
    nextLevel: 6
};

// LEVEL FOUR \\
var lvl4Box1 = {
    
    width: 160,
    height: 60,
    x: 100,
    y: 520,
    color: "grey"
}
var lvl4Box2 = {
    
    width: 160,
    height: 60,
    x: 1200,
    y: 520,
    color: "grey"
}
var lvl4Fan1 = {
    width: 80,
    height: 60,
    x: 300,
    y: 500,
    color: "green",
    on: true
}
var lvl4Fan2 = {
    width: 80,
    height: 60,
    x: 1080,
    y: 500,
    color: "green",
    on: true
}
var lvl4Fan3 = {
    width: 160,
    height: 60,
    x: 640,
    y: 380,
    color: "#035900",
    on: false
}
var lvl4FanOn = {
    
    width: 50,
    height: 50,
    x: 1250,
    y: 40,
    color: "#07C900"
}
var lvl4KillerPillar1 = {
    
    width: 80,
    height: 500,
    x: 430,
    y: 340,
    color: "darkgrey"
}
var lvl4KillerPillar3 = {
    
    width: 80,
    height: 160,
    x: 430,
    y: 0,
    color: "darkgrey"
}
var lvl4KillerPillar2 = {
    
    width: 80,
    height: 500,
    x: 950,
    y: 340,
    color: "darkgrey"
}
var lvl4KillerPillar4 = {
    
    width: 80,
    height: 160,
    x: 950,
    y: 0,
    color: "darkgrey"
}
var lvl4Pass = {
    width: 60,
    height: 60,
    x: 690,
    y: 40,
    color: "white",
    nextLevel: 5
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
    y: 125,
    color: "#6D2727"
}
var lvl3FakeBox2 = {
    
    width: 150,
    height: 30,
    x: 1205,
    y: 170,
    color: "#6D2727"
}
var lvl3FakeBox3 = {
    
    width: 150,
    height: 30,
    x: 410,
    y: 125,
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
    x: 400,
    y: 120,
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
    },
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

//MOVEMENT//
let fallSpeed = 5;
let onWall = false;
let ground = true;
let airTime = 0;
let grab = false;
let umbrella = false;
let challenge = false;
let cutscene = false;

let speedRight = 0;
let speedLeft = 0;
let speedUp = 0;
let speedDown = 0;

document.addEventListener('keydown', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft

    if (!cutscene){
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
                umbrella = true;
            break;

            case "x":
                challenge = true;
            break;
        }
    }
});
document.addEventListener('keyup', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft
    if (!cutscene){
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
                umbrella = false;
            break;
        }
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
