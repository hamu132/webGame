import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Block from './Block.js';
import Point from './Point.js';
import Item from './Item.js';


class ShootingGame{
    constructor(height,canvas,ctx){
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.paddle = new Paddle(canvas,ctx);
        this.ball = new Ball(this.paddle);
        this.point = new Point();
        this.life = 5;
        this.blocks = [];
        this.createBlocks();
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvas.addEventListener("click",()=>{
            this.ball.isClicked=true;
        })
    }

    // ボール
    circle(ball){
        let { x, y } = ball.advance(this.mouseX, this.mouseY);
        var radius = ball.radius;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }
    //マウスのx座標に追従
    paddleDraw(mouseX){
        this.paddle.setx(mouseX,this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(mouseX-this.paddle.width/2, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
    //ブロックを作成
    createBlocks(){
        const rows = 3;
        const cols = 5;
        const blockWidth = 100;
        const blockHeight = 30;
        const padding = 10;
        const offsetX = 50;
        const offsetY = 50;
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = offsetX + col * (blockWidth + padding);
                const y = offsetY + row * (blockHeight + padding);
                const item = new Item(x,y);
                const block = new Block(x, y, blockWidth, blockHeight, 1, "red", item);
                this.blocks.push(block);
            }
        }
    }
    //ブロックを描画
    drawBlocks(){
        for(const block of this.blocks){
            if(!block.broken){
                this.ctx.beginPath();
                this.ctx.rect(block.x, block.y, block.width, block.height);
                this.ctx.fillStyle = block.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
            else{
                block.item.advance();
                this.ctx.beginPath();
                this.ctx.rect(block.item.x, block.item.y, block.item.width, block.item.height);
                this.ctx.fillStyle = block.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
    //総合得点を表示
    drawPoint(){
        this.ctx.font = '100px Roboto medium';
        this.ctx.textAlign = "center";
        this.ctx.fillText('Point', this.canvas.width/2, 400);
        this.ctx.fillText(this.point.getPoint(), this.canvas.width/2, 500);
        this.ctx.font = '50px Roboto medium';
        this.ctx.fillText('Life:'+this.life, this.canvas.width/6, 400);
        
    }


    //衝突判定
    checkPaddleCollision(){
        // パドルとの衝突
        const rate = this.paddle.collision(this.ball.getBottom(), this.ball.x, this.ball.yspeed,this.ball.y);
        if(rate != 100){
            this.ball.yspeed = -this.ball.yspeed;
            this.ball.xspeed += rate;
        }
    
        // ブロックとの衝突
        for(const block of this.blocks){
            if(!block.broken){
                const blockRate = block.checkCollision(this.ball.x, this.ball.y, this.ball.radius);
                if(blockRate === 1){
                    this.ball.yspeed = -this.ball.yspeed;
                    block.broken = true;
                    this.point.pointUp(block);
                    break;
                }
                if(blockRate === 2){
                    this.ball.xspeed = -this.ball.xspeed;
                    block.broken = true;
                    this.point.pointUp(block);
                    break;
                }
            }
        }
        //壁との衝突
        if(this.canvas.width<this.ball.x+this.ball.radius || this.ball.x-this.ball.radius<0){
            this.ball.xspeed = -this.ball.xspeed;
        }
        if(this.ball.y-this.ball.radius<0){
            this.ball.yspeed = -this.ball.yspeed;
        }
        //地面との衝突
        if(this.canvas.height<this.ball.y+this.ball.radius){
            this.life-=1;
            this.ball.isClicked = false;
        }
        //アイテムとの衝突

    }

    gamePlay(mouseX,mouseY){
        this.mouseMove(mouseX,mouseY);//マウス座標を記録

        this.circle(this.ball);//ボール
        this.paddleDraw(this.mouseX);//打ち返し用の板
        this.drawBlocks();//ブロック
        this.checkPaddleCollision();//衝突判定
        this.drawPoint();//得点
    }
    mouseMove(mouseX,mouseY){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }


}
export {ShootingGame};