import PuzzleBlock from "./PuzzleBlock.js";
import GroupBlock from "./GropuBlock.js";
class PuzzleGame{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.blocks = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.createBlocks();
        this.canvas.addEventListener("click", () => {
            this.handleClick(this.mouseX, this.mouseY);
        });

        this.GroupBlock = new GroupBlock();
    }
    gamePlay(mouseX,mouseY){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.drawBlocks(mouseX,mouseY);
    }
    //クリック
    handleClick(mouseX, mouseY) {
        for (const block of this.blocks) {
            if (mouseX<=block.x+block.width/2 && block.x-block.width/2<=mouseX && mouseY<=block.y+block.height/2 && block.y-block.height/2<=mouseY) {
                block.isClicked = !block.isClicked;
            }
        }
    }
    //ブロックを作成
    createBlocks(){
        const rows = 5;
        const cols = 5;
        const padding = 40;
        const offsetX = 50;
        const offsetY = 250;
        const blockType = ["A","P","F"]
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = offsetX + col * (padding);
                const y = offsetY + row * (padding);
                const type = blockType[Math.floor(Math.random()*blockType.length)];
                const block = new PuzzleBlock(x, y,type,this.canvas);
                this.blocks.push(block);
            }
        }
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
        if(clicked.length>=2){
            this.GroupBlock.setValue(clicked[0],clicked[1]);
            this.GroupBlock.change();
        }

        var point = 0;
        var tempPoint;
        
        for(const block of this.blocks){
            this.ctx.save();
            this.ctx.beginPath();
            //四角形内部にあるもので、点数を計算
            tempPoint = this.GroupBlock.reckonPoint(block);
            point+=tempPoint;
            if(tempPoint != 0){
                this.ctx.translate(this.GroupBlock.axisX,this.GroupBlock.axisY);
                this.ctx.rotate(this.GroupBlock.angle);
                this.ctx.scale(this.GroupBlock.scale,this.GroupBlock.scale);
                this.ctx.translate(-this.GroupBlock.axisX,-this.GroupBlock.axisY);
            }
            else{
                block.mouseHover(mouseX,mouseY);
            }
            
            this.ctx.rect(block.x-block.width/2, block.y-block.height/2, block.width, block.height);
            this.ctx.fillStyle = block.choiseColor();
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.restore();
        }
        
    }

}

export {PuzzleGame};