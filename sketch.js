var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var flappy, flappyImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  flappyImg = loadImage("Flappy Bird.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  flappy = createSprite(200,200,50,50);
  flappy.scale = 0.3;
  flappy.addImage("flappy", flappyImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      flappy.x = flappy.x - 3;
    }
    
    if(keyDown("right_arrow")){
      flappy.x = flappy.x + 3;
    }
    
    if(keyDown("space")){
      flappy.velocityY = -10;
    }
    
    flappy.velocityY = flappy.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    if(climbersGroup.isTouching(flappy)){
      flappy.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(flappy) || flappy.y > 600){
      flappy.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {

    if (frameCount % 240 === 0) {
    var door = createSprite(20, -10);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    flappy.depth = door.depth;
    flappy.depth +=1;
   
    door.lifetime = 800;
    climber.lifetime = 1;
    invisibleBlock.lifetime = 800;

    
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

