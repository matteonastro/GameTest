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
    myGameArea.draw(box);

    gravity();

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

    if (player.x > box.x & player.x < box.x + box.width & player.y + player.height > box.y) {
        
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