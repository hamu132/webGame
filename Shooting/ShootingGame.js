import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Block from './Block.js';
import Score from './Score.js';
import Item from './Item.js';


class ShootingGame{
    constructor(clickManager,canvas,ctx){
        this.isExplainEnd = false;
        this.paddleFrame = 0;
        this.ballFrame = 0;
        this.frame = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.scoreRate = 1;
        this.paddle = new Paddle(canvas,ctx);
        this.ball = new Ball(this.paddle);
        this.score = new Score();
        this.life = 5;
        this.blocks = [];
        this.createBlocks();
        this.canvas = canvas;
        this.ctx = ctx;
        this.isCleared = false;
        this.clearScore;
        
        clickManager.addClickHandler(this.click.bind(this));
    }
    click(){
        if(this.isExplainEnd){
            this.ball.isClicked=true;
        }
    }
    // ボール
    circle(ball){

        if(!this.isCleared){
            ball.advance(this.mouseX, this.mouseY);
        }
        let x = ball.x;
        let y = ball.y;
        this.ctx.fillStyle = "black";
        if(this.ballFrame>0){
            this.ballFrame-=1;
            this.scoreRate = 2;
            this.ctx.fillStyle = "red"
        }
        else{
            this.scoreRate = 1;
        }
        if(this.ball.isPenetrate){
            this.ctx.fillStyle = "blue";
        }
        var radius = ball.radius;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    //マウスのx座標に追従
    paddleDraw(mouseX){
        if(this.paddleFrame>0){
            this.paddleFrame-=1;
            this.paddle.width = 200;
        }
        else{
            this.paddle.width = 100;
        }
        if(!this.isCleared){
            this.paddle.setx(mouseX,this.canvas.height);
        }
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "green";
        this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.rect(this.paddle.x, this.paddle.y+7, this.paddle.width*this.paddleFrame/600, this.paddle.height-7); //frame=0:全く描画されない＆frame=600:width分描画
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
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
        const itemList = ["bigSize","pointUp","penetrate"];
        const pointList = [1,1,0,0];
        const colorList = ["red","red","green","blue"];
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const index = Math.floor(Math.random()*4);
                const point = pointList[index];
                const color = colorList[index];
                const x = offsetX + col * (blockWidth + padding);
                const y = offsetY + row * (blockHeight + padding);
                let itemName;
                if(color == "blue"){
                    itemName = itemList[Math.floor(Math.random()*itemList.length)];
                }
                else{
                    itemName = null;
                }
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
                this.ctx.lineWidth = 3;
                this.ctx.fill();
                this.ctx.stroke();
            }
            else if(!block.item.isBroken && block.item.item!=null){
                block.item.advance();
                this.ctx.save();
                this.ctx.beginPath();
                if(block.item.item == "bigSize"){
                    this.ctx.fillStyle = "green";
                    this.ctx.translate(block.item.x, block.item.y);
                    this.ctx.rotate(-Math.PI/6);
                    this.ctx.translate(-block.item.x, -block.item.y);
                    this.ctx.rect(block.item.x, block.item.y, 20, 6);
                }
                else if(block.item.item == "pointUp"){
                    this.ctx.font = 'bold 12px Arial Black';
                    this.ctx.fillStyle = "red";
                    this.ctx.textBaseline = "middle";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("P↑",block.item.x,block.item.y);
                }
                else if(block.item.item == "penetrate"){
                    this.ctx.font = 'bold 12px Arial Black';
                    this.ctx.fillStyle = "red";
                    this.ctx.textBaseline = "middle";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("⚔",block.item.x,block.item.y);
                }
                
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.restore();
            }
        }
    }
    //総合得点を表示
    drawPoint(){
        this.ctx.font = '40px Roboto medium';
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "left"; 
        this.ctx.textBaseline = "middle";
        const x = 450;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillText('Score：', x, 600);
        this.ctx.fillText(this.score.getPoint(), x+this.ctx.measureText("Point：").width, 600);
        this.ctx.fillText('Life：', x, 550);
        this.ctx.fillText("♥".repeat(this.life), x+this.ctx.measureText("Life：").width, 550);
        this.ctx.restore();
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
            //ブロックとの衝突
            if(!block.isBroken){
                const blockRate = block.checkCollision(this.ball.x, this.ball.y, this.ball.radius);
                if(blockRate === 1){
                    if(!this.ball.isPenetrate){
                        this.ball.yspeed = -this.ball.yspeed;
                    }
                    block.isBroken = true;
                    this.score.pointUp(block,this.scoreRate);
                    break;
                }
                if(blockRate === 2){
                    if(!this.ball.isPenetrate){
                        this.ball.xspeed = -this.ball.xspeed;
                    }
                    block.isBroken = true;
                    this.score.pointUp(block,this.scoreRate);
                    break;
                }
            }
            //アイテミングとの衝突イング
            else if(!block.item.isBroken){
                const itemName = block.item.checkCollision(this.paddle.x,this.paddle.y,this.paddle.width);
                switch (itemName){
                    case "bigSize":
                        this.paddleFrame = 600;
                        break;
                    case "pointUp":
                        this.ballFrame = 600;
                        break;
                    case "penetrate":
                        this.ball.penetrateFrame = 600;
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

    ready(){
        if(!this.ball.isClicked){
            let size = 1+0.1*Math.sin(this.frame/10);

            this.ctx.save();
            this.ctx.font = '30px Roboto medium';
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center"; 
            this.ctx.textBaseline = "middle";
            this.ctx.beginPath();
            this.ctx.translate(400,400);
            this.ctx.scale(size,size);
            this.ctx.translate(-400,-400);
            this.ctx.fillText("クリックでスタート",400,400);
            this.ctx.restore();
        }
    }
    //毎フレーム
    gamePlay(mouseX,mouseY,isExplainEnd,clearScore){
        this.clearScore = clearScore;
        this.isExplainEnd = isExplainEnd;
        if(isExplainEnd){
            this.ready();
            this.mouseMove(mouseX,mouseY);//マウス座標を記録
            this.circle(this.ball);//ボール
            this.paddleDraw(this.mouseX);//打ち返し用の板
            if(this.clearScore!=1000000){
                this.drawPoint();//得点
            }
            
        }

        this.drawBlocks();//ブロック
        this.checkPaddleCollision();//衝突判定
        this.clearCheck();

        for(let b of this.blocks){
            b.update();
        }
        this.frame ++;
        
    }
    mouseMove(mouseX,mouseY){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    clearCheck(){
        if(this.clearScore <= this.score.score){
            this.isCleared = true;
        }
        else{
            this.isCleared = false;
        }
    }
    stop(){

    }
}
export {ShootingGame};