var database;
var position;
var balloonImg,balloon,HotAirBallon02,HotAirBallon03,HotAirBallon04;
var bg,bgImg;

function preload(){
  balloonImg=loadImage("Hot Air Ballon-02.png");
  bgImg=loadImage("Hot Air Ballon-01.png");
}

function setup() {
   database=firebase.database();
   createCanvas(displayWidth-200,displayHeight-200);
   balloon= createSprite(400, 200, 50, 50);
   balloon.addImage(balloonImg);
   var balloonref=database.ref('balloon/position');
   balloonref.on("value",readPosition,showError);
   
}

function draw() {
  background(bgImg);  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
  }
drawSprites();
}
function showError(){
  console.log("error");
}
function writePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}

function readPosition(data){
  position=data.val();  
  balloon.y=position.y;
}   

