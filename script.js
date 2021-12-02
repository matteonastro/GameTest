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
    x: 10,
    y: 120,
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
    }
}

let downPress = true;
let upPress = true;
let leftPress = true;
let rightPress = true;

document.addEventListener('keyup', (event) => {

    switch(event.key) {

        case "ArrowDown":
            downPress = false;
        break;
        
        case "ArrowRight":
            rightPress = false;
        break;

        case "ArrowUp":
            upPress = false;
        break;

        case "ArrowLeft":
            leftPress = false
        break;
    }
});

document.addEventListener('keydown', (event) => {
    
    //ArrowDown ArrowRight ArrowUp ArrowLeft

    switch(event.key) {

        case "ArrowDown":
            while(downPress){
                movedown();
            }
        break;
        
        case "ArrowRight":
            while(downPress){
                moveright();
            }
        break;

        case "ArrowUp":
            while(downPress){
                moveup();
            }
        break;

        case "ArrowLeft":
            while(downPress){
                moveleft()
            }
        break;
    }
});

let ground = true;
function moveup() {

    if (ground) {
        player.y -= 120;
        ground = false;
        fallSpeed = 5;
    }
}
  
function movedown() {
    player.y += 10;
}

function moveleft() {
    player.x -= 10;
}

function moveright() {
    player.x += 10;
}