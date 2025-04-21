import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Block from './Block.js';
import Score from './Score.js';
import Item from './Item.js';


class ShootingGame{
    constructor(height,canvas,ctx){
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.paddle = new Paddle(canvas,ctx);
        this.ball = new Ball(this.paddle);
        this.score = new Score();
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
        this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
    //ブロックを作成
    createBlocks(){
        const rows = 6;
        const cols = 12;
        const blockWidth = 50;
        const blockHeight = 15;
        const padding = 10;
        const offsetX = 50;
        const offsetY = 50;
        const itemList = ["speedUp","speedDown","bigSize","smallSize","penetrate",null,null,null,null,null,null,null,null,null];
        const pointList = [1,0,0];
        const colorList = ["red","green","green"]
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const index = Math.floor(Math.random()*3);
                const point = pointList[index];
                const color = colorList[index];
                const x = offsetX + col * (blockWidth + padding);
                const y = offsetY + row * (blockHeight + padding);
                const itemName = itemList[Math.floor(Math.random()*itemList.length)];
                const item = new Item(x,y,itemName);
                const block = new Block(x, y, blockWidth, blockHeight, point, color, item);
                this.blocks.push(block);
            }
        }
    }
    //ブロックもしくはアイテムを描画
    drawBlocks(){
        for(const block of this.blocks){
            if(!block.isBroken){
                this.ctx.beginPath();
                this.ctx.rect(block.x, block.y, block.width, block.height);
                this.ctx.fillStyle = block.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
            else if(!block.item.isBroken && block.item.item!=null){
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
        this.ctx.fillText(this.score.getPoint(), this.canvas.width/2, 500);
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
    
        // ブロックもしくはアイテムとの衝突
        for(const block of this.blocks){
            if(!block.isBroken){
                const blockRate = block.checkCollision(this.ball.x, this.ball.y, this.ball.radius);
                if(blockRate === 1){
                    this.ball.yspeed = -this.ball.yspeed;
                    block.isBroken = true;
                    this.score.pointUp(block);
                    break;
                }
                if(blockRate === 2){
                    this.ball.xspeed = -this.ball.xspeed;
                    block.isBroken = true;
                    this.score.pointUp(block);
                    break;
                }
            }
            else if(!block.item.isBroken){
                const itemName = block.item.checkCollision(this.paddle.x,this.paddle.y,this.paddle.width);
                switch (itemName){
                    case "speedUp":
                        this.ball.yspeed*=1.5;
                        break;
                    case "speedDown":
                        this.ball.yspeed*=0.67;
                        break;
                    case "bigSize":
                        this.paddle.width =200;
                        break;
                    case "smallSize":
                        this.paddle.width =50;
                        break;
                    case "penetrate":
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


    }

    gamePlay(mouseX,mouseY){
        this.mouseMove(mouseX,mouseY);//マウス座標を記録

        this.circle(this.ball);//ボール
        this.paddleDraw(this.mouseX);//打ち返し用の板
        this.drawBlocks();//ブロック
        this.checkPaddleCollision();//衝突判定
        //this.drawPoint();//得点
    }
    mouseMove(mouseX,mouseY){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }


}
export {ShootingGame};