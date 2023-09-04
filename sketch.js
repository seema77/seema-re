var bk;
var PLAY=1
var END=0
var gameState=PLAY;
var ball;
var topLine,bottomLine,leftLine,rightLine
chance=3;
point1=0;
point2=0;

function preload(){
bkImg=loadImage("table.jpg");
r1Img=loadImage("r1.png");
r2Img=loadImage("r2.png");
ballImg=loadImage("ball.png");
resetImg=loadImage("reset.png")
}


function setup(){
createCanvas(1200,600); // width height

racket1=createSprite(40,430,10,10);
racket1.addImage(r1Img);
racket1.scale=0.3; // left or right button

racket2=createSprite(1150,120,10,10);
racket2.addImage(r2Img);
racket2.scale=0.3; // up or down button // create ball

ball=createSprite(600,300,20,20)
ball.addImage(ballImg)
ball.scale =0.1 

racket1.setCollider("circle",0,-60,100)
racket1.debug=false

topLine=createSprite(600,60,1200,3);
topLine.shapeColor="black"

bottomLine=createSprite(600,540,1200,3);
bottomLine.shapeColor="black"

leftLine=createSprite(10,300,5,600);
leftLine.shapeColor="black"
leftLine.visible=false

rightLine=createSprite(1190,300,5,600);
rightLine.shapeColor="black"
rightLine.visible=false

button=createSprite(1150,30,20,20);
button.addImage(resetImg)
button.scale=0.2
}

function draw(){
background(bkImg);
textSize(30)
fill("orange")
text("Chances: "+chance,900,40)

textSize(20)
fill("red")
text("Team1: "+point1,440,40)

textSize(20)
fill("blue")
text("Team2: "+point2,620,40)

if(gameState===PLAY){
    if(keyDown("space")){
        ball.velocityX=12
        ball.velocityY=10
    }
    if(keyDown("up")){
        racket1.y=racket1.y-10
        }
        racket2.y=ball.y;
        if(keyDown("down")){
            racket1.y=racket1.y+10
            }
        if(ball.isTouching(racket1)){
            point1+=1;
        }
        if(ball.isTouching(racket2)){
            point2+=1;
        }
       
              if(ball.x<=50){
               // ball.destroy()
               ball.velocityX=0
               ball.velocityY=0
               chance-=1
                gameState=END;
               
            }  
           
           
}
else if(gameState===END){
   ball.x=600;
   ball.y=300
    ball.velocityX=10
    ball.velocityY=-10
//text("")
if(mousePressedOver(button)){
    reset()
}

}
ball.bounceOff(racket1);
ball.bounceOff(racket2);
racket1.bounceOff(topLine);
racket1.bounceOff(bottomLine);
racket2.bounceOff(topLine);
ball.bounceOff(topLine)
 racket2.bounceOff(bottomLine);
ball.bounceOff(bottomLine)
drawSprites()
if(chance===0){
    gameOver()
}
}

function reset(){
    gameState=PLAY;
}
function gameOver(){
    textSize(25)
    fill("lime");
    text("Game Over! Press reset button to play again",350,250)
}