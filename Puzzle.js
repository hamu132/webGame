import PuzzleBlock from "./PuzzleBlock.js";
import GroupBlock from "./GropuBlock.js";
class PuzzleGame{
    constructor(canvas,ctx){
        this.frame = 0;
        this.limitTime = 20;
        this.life = 5;
        this.canvas = canvas;
        this.ctx = ctx;
        this.blocks = [];
        this.mouseX = 0;
        this.mouseY = 0;
        //80
        this.offsetX = 320;
        this.offsetY = 250;
        this.createBlocks();
        this.canvas.addEventListener("click", () => {
            this.handleClick(this.mouseX, this.mouseY);
        });

        this.GroupBlock = new GroupBlock();
        this.plusItem = "red";
        this.minusItem = "green";
        this.rectItem = "blue";
        this.score = 0;
        this.clearScore = 1;
        this.isCleared = false;
    }
    //毎フレーム
    gamePlay(mouseX,mouseY,isExplainEnd,offsetX,offsetY,clearScore){
        this.clearScore = clearScore;
        this.offsetX = offsetX;
        this.offsetY = offsetY
        if(isExplainEnd && !this.isCleared){
            this.frame++;
        }
        if(!isExplainEnd){
            this.frame = 50;
        }
        
        if(this.frame%60==0 && !this.isCleared){
            this.limitTime-=1;
        }
        if(this.frame%1200==0 && !this.isCleared){
            this.frame = 0;
            this.life-=1;
        }
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.drawBlocks(mouseX,mouseY);
        if(clearScore != 1000000){
            this.drawPoint();
        }
        
        this.drawLimitTime();
        this.clearCheck();
    }
    //クリック
    handleClick(mouseX, mouseY) {
        for (const block of this.blocks) {
            if (block.color == this.rectItem && mouseX<=block.x+block.width/2 && block.x-block.width/2<=mouseX && mouseY<=block.y+block.height/2 && block.y-block.height/2<=mouseY) {
                block.isClicked = !block.isClicked;
                //クリックされたら+1、解除されたら-1
                this.GroupBlock.clickedCount += Math.floor((block.isClicked-0.5)*2);
            }
        }
    }
    //ブロックを作成
    createBlocks(){
        const rows = 5;
        const cols = 5;
        const padding = 40;
        // const offsetX = 50;
        // const offsetY = 250;
        const blockColor = ["red","green","blue"]
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = this.offsetX + col * (padding);
                const y = this.offsetY + row * (padding);
                const color = blockColor[Math.floor(Math.random()*blockColor.length)];
                const block = new PuzzleBlock(x, y,color,this.canvas);
                this.blocks.push(block);
            }
        }
        //選択できるやつが2つ以上生成されなかった時用
        let count = 0;
        for(let block in this.blocks){
            if(block.color == this.rectItem){
                count++;
            }
        }
        if(count<2){
            this.createBlocks();
        }
    }
    liner(l,a,b,min){
        const y = l * (this.frame-a) + b
        //まだの時
        if(this.frame<a){
            return b;
        }
        //移動中
        if(0<y){
            return y;
        }
        //終わった後
        else{
            return 0;
        }
    }
    //制限時間バー
    drawLimitTime(){
        this.ctx.save();
        this.ctx.beginPath();
        
        this.ctx.globalAlpha = 1;
        //長さを取得
        const length = 215;
        const l = length/300;
        
        this.ctx.rect(this.offsetX-25,220,                          this.liner(-l,0,length),5  );
        this.ctx.rect(this.offsetX-30,this.liner(l,300,220),        5,this.liner(-l,300,length));
        this.ctx.rect(this.offsetX-50+this.liner(l,600,20),220+length, this.liner(-l,600,length),5);
        this.ctx.rect(this.offsetX-30+length,225,                   5,this.liner(-l,900,length));
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        //this.ctx.beginPath();//←この行を加えるとなぜか上の四角形が赤く塗りつぶされる
        this.ctx.restore();
    }
    //得点対象に星を描画
    drawStar(block){
        let alpha = this.frame/60;
        if(alpha>1){
            alpha = 1;
        }
        this.ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
        const l = block.height/4
        this.ctx.save();
        if(block.color == this.plusItem){
            
            this.ctx.beginPath();
            this.ctx.moveTo(block.x, block.y-l);
            this.ctx.lineTo(block.x+l*Math.sqrt(3)/2, block.y+l/2);
            this.ctx.lineTo(block.x-l*Math.sqrt(3)/2, block.y+l/2);
            this.ctx.fill();
            this.ctx.closePath();
            
            this.ctx.beginPath();
            this.ctx.moveTo(block.x, block.y+l);
            this.ctx.lineTo(block.x+l*Math.sqrt(3)/2, block.y-l/2);
            this.ctx.lineTo(block.x-l*Math.sqrt(3)/2, block.y-l/2);
            this.ctx.fill();
            this.ctx.closePath();
        }
        if(block.color == this.minusItem){
            this.ctx.fillStyle = `rgba(140, 0, 140, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.translate(block.x,block.y);
            this.ctx.rotate(-Math.PI/4);
            this.ctx.translate(-block.x,-block.y);
            this.ctx.rect(block.x - l,block.y-l/5,l*2,l/5);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.translate(block.x,block.y);
            this.ctx.rotate(Math.PI/2);
            this.ctx.translate(-block.x,-block.y);
            this.ctx.rect(block.x - l,block.y-l/5,l*2,l/5);
            this.ctx.fill();
        }
        this.ctx.restore();

    }
    //ブロックを描画
    drawBlocks(mouseX,mouseY){
        //2回クリックされれば
        var clicked = []
        for(const block of this.blocks){
            if(block.isClicked){
                clicked.push(block);
            }
        }
        if(this.GroupBlock.clickedCount==2){
            this.GroupBlock.setValue(clicked[0],clicked[1]);
            this.GroupBlock.change();
        }
        var tempScore;
        var oneBlockScore = 0;

        var num = 0;
        
        for(const block of this.blocks){
            this.ctx.save();
            this.ctx.beginPath();
            //四角形内部にあるもので、点数を計算
            tempScore = this.GroupBlock.reckonPoint(block,this.plusItem,this.minusItem,this.rectItem);
            
            //消えてく
            if(tempScore != -2){
                oneBlockScore += tempScore;
                //消えてる最中
                if(this.GroupBlock.scale>0){
                    this.ctx.translate(this.GroupBlock.axisX,this.GroupBlock.axisY);
                    this.ctx.rotate(this.GroupBlock.angle);
                    this.ctx.scale(this.GroupBlock.scale,this.GroupBlock.scale);
                    this.ctx.translate(-this.GroupBlock.axisX,-this.GroupBlock.axisY);
                }
                //消えた後新しいのを生成
                else{
                    //ブロックの値をリセット
                    num=1;
                    const blockColor = ["red","green","blue"];
                    const color = blockColor[Math.floor(Math.random()*blockColor.length)];
                    block.reset(color);
                    this.frame = 0;
                }
            }

            //四角形外部のものはホバー
            else{
                block.mouseHover(mouseX,mouseY,this.rectItem);
            }
            
            this.ctx.fillStyle = block.choiseColor();
            this.ctx.strokeStype = "black";
            this.ctx.lineWidth = 3;
            this.ctx.rect(block.x-block.width/2, block.y-block.height/2, block.width, block.height);
            this.ctx.fill();
            this.ctx.stroke();
            this.drawStar(block);
            this.ctx.restore();
        }
        //リセット
        if(num==1){
            this.GroupBlock.reset();

            var temp = this.plusItem;
            this.plusItem = this.minusItem;
            this.minusItem = this.rectItem;
            this.rectItem = temp;
            this.score+=oneBlockScore;
        }
    }
    //ブロックのポイントを表示
    drawPoint(){
        
        this.ctx.save();
        
        
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.font = '20px sans-serif';
        this.ctx.fillText('SELECT:', this.offsetX-30, this.offsetY+260);

        this.ctx.beginPath();
        this.ctx.fillStyle = this.rectItem;
        this.ctx.rect(this.offsetX+80,this.offsetY+260,20,-20);
        this.ctx.stroke();
        this.ctx.fill();
        
        

        this.ctx.beginPath();
        this.ctx.font = '30px sans-serif';
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Score:　　'+this.score, this.offsetX+220, this.offsetY);
        this.ctx.fillText('Life:　　'+this.life, this.offsetX+220, this.offsetY+50);

        
        this.ctx.restore();
        
        
    }
    clearCheck(){
        if(this.clearScore <= this.score){
            this.isCleared = true;
        }
        else{
            this.isCleared = false;
        }
    }
}

export {PuzzleGame};