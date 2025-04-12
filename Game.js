class Ball{
    constructor(height){
        this.x = height/4;
        this.y = height/4;
        this.xspeed = 4;
        this.yspeed = 4;
        this.radius = 10;
    }
    getBottom(){
        return this.y + this.radius;
    }
    advanceX(){
        this.x+=this.xspeed;
        return this.x;
    }
    advanceY(){
        this.y+=this.yspeed;
        return this.y;
    }
    isInCanpas(width,height){
        if(width<this.x+this.radius || this.x-this.radius<0){
            this.xspeed = -this.xspeed;
        }
        if(height<this.y+this.radius || this.y-this.radius<0){
            this.yspeed = -this.yspeed;
        }
    }
}
class Paddle{
    constructor(canvas,ctx){
        this.height = 10;
        this.width = 100;
        this.ctx = ctx;
        this.x = 0;
        this.y = canvas.height*0.9;
    }
    setx(mouseX,height){
        this.x = mouseX;
        this.y = height*0.9;
    }
    //3段階で角度を変える
    collision(ballBottom,ballX,yspeed){
        const paddleLL = this.x - this.width/2;
        const paddleLR = this.x - this.width/6;
        const paddleRL = this.x + this.width/6;
        const paddleRR = this.x + this.width/2;

        if(ballBottom >= this.y && yspeed>=0){
            if(paddleLL<=ballX && ballX<= paddleLR){
                return -2;
            }
            if(paddleLR<ballX && ballX<= paddleRL){
                return 0;
            }
            if(paddleRL<ballX && ballX<=paddleRR){
                return 2;
            }
        }
        return 100;
    }
}
class Block{
    constructor(x,y,width,height,point,color,item){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.point = point;
        this.color = color;
        this.item = item;
        this.broken = false;
    }

    //ブロックとボールの接触を検知
    chackCollosion(ballX,ballY,radius){
        if(ballX+radius>=this.x && ballX-radius<=this.x+this.width && ballY+radius>=this.y && ballY-radius<=this.y+this.height){
            if(ballX>=this.x && ballX<=this.x+this.width){
                return 1;
            }
            else{
                return 2;
            }
        }
        return;
    }
}

class Game{
    constructor(){
        this.frame = 0;
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.mouseX = 0;
        this.mouseY = 0;
        this.ball = new Ball(this.height);
        this.paddle = new Paddle(this.canvas,this.ctx);
        this.blockObj = new Block(300,300,100,100,1,"red",0);
    }

    // ボール
    circle(ball){
        ball.isInCanpas(this.height,this.height);
        var x = ball.advanceX();
        var y = ball.advanceY();
        var radius = ball.radius;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }
    //マウスのx座標に追従
    rect(mouseX){
        this.paddle.setx(mouseX,this.height);
        this.ctx.beginPath();
        this.ctx.rect(mouseX-this.paddle.width/2, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
    block(){
        var blockObj=this.blockObj
        this.ctx.beginPath();
        console.log(blockObj.broken);
        if(!blockObj.broken){
            this.ctx.rect(blockObj.x, blockObj.y, blockObj.width, blockObj.height);
            
        }

        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    mouseMove(){
        const rect = canvas.getBoundingClientRect(); // canvasの位置とサイズ
        this.mouseX = event.clientX - rect.left; // canvas内のx座標
        this.mouseY = event.clientY - rect.top;  // canvas内のy座標
        //console.log(`マウス座標: x=${this.mouseX}, y=${this.mouseY}`);
    }
    //衝突判定
    checkPaddleCollision() {
        const rate = this.paddle.collision(this.ball.getBottom(),this.ball.x,this.ball.yspeed);
        if(rate!=100){
            this.ball.yspeed = -this.ball.yspeed;
            this.ball.xspeed += rate;
        }

        if(!this.blockObj.broken){
            const blockRate = this.blockObj.chackCollosion(this.ball.x,this.ball.y,this.ball.radius);
            //sconsole.log(blockRate);
            if(blockRate==1){
                this.ball.yspeed=-this.ball.yspeed;
                this.blockObj.broken = true;
            }
            if(blockRate==2){
                this.ball.xspeed=-this.ball.xspeed;
                this.blockObj.broken = true;
            }
            
        }



    }
    startGame() {
        this.canvas.addEventListener("mousemove",this.mouseMove.bind(this))
        
        
        this.update();
    }



    update(){
        this.frame++;
        this.height = this.canvas.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//前のフレームを消す
        this.block();
        this.circle(this.ball);
        this.checkPaddleCollision();
        this.rect(this.mouseX);//打ち返し用の板

        //this.debug();
        requestAnimationFrame(this.update.bind(this));
    }
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click",()=>{
    startBtn.style.display = "none";
    var obj = new Game();
    obj.startGame();
})
