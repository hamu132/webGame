class Ball{
    constructor(){
        this.x = 200;
        this.y = 100;
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
    setx(mouseX){
        this.x = mouseX;
    }
    //3段階で角度を変える
    shoot(ballBottom,ballX,yspeed){
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

class Game{
    constructor(){
        this.frame = 0;
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.canvas = document.getElementById("canvas")
        this.mouseX = 0;
        this.mouseY = 0;
        this.ball = new Ball();
        this.paddle = new Paddle(this.canvas,this.ctx);
    }

    // ボール
    circle(ball){
        ball.isInCanpas(this.canvas.width,this.canvas.height);
        var x = ball.advanceX();
        var y = ball.advanceY();
        var radius = ball.radius;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
    //マウスのx座標に追従
    rect(mouseX){
        this.paddle.setx(mouseX);
        this.ctx.beginPath();
        this.ctx.rect(mouseX-this.paddle.width/2, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.fillStyle = "green";
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
    checkCollision() {
        const rate = this.paddle.shoot(this.ball.getBottom(),this.ball.x,this.ball.yspeed);
        if(rate == 100){
            
        }
        
        if(rate!=100){
            console.log(rate);
            this.ball.yspeed = -this.ball.yspeed;
            this.ball.xspeed += rate;
        }


    }
    startGame() {
        this.canvas.addEventListener("mousemove",this.mouseMove.bind(this))
        this.update();
    }



    update(){
        this.frame++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//前のフレームを消す
        this.circle(this.ball);
        this.checkCollision();
        this.rect(this.mouseX);//打ち返し用の板
        requestAnimationFrame(this.update.bind(this));
    }
}

const button = document.getElementById("startBtn");
const canvas = document.getElementById("canvas")
button.style.display = "none";
var obj = new Game();
obj.startGame();