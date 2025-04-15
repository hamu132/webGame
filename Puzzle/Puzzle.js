import PuzzleBlock from "./PuzzleBlock.js";
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
    }
    gamePlay(mouseX,mouseY){
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.drawBlocks(mouseX,mouseY);
    }
    handleClick(mouseX, mouseY) {
        for (const block of this.blocks) {
            if (
                mouseX >= block.x &&
                mouseX <= block.x + block.width &&
                mouseY >= block.y &&
                mouseY <= block.y + block.height
            ) {
                block.isClicked = !block.isClicked;
            }
        }
    }
    createBlocks(){
        const rows = 3;
        const cols = 5;
        const padding = 50;
        const offsetX = 50;
        const offsetY = 250;
        const blockType = ["A","B","C","P","F"]
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = offsetX + col * (padding);
                const y = offsetY + row * (padding);
                const type = blockType[Math.floor(Math.random()*5)];
                const block = new PuzzleBlock(x, y,type,this.canvas);
                this.blocks.push(block);
            }
        }
    }
    keisan(a,b){

    }
    drawBlocks(mouseX,mouseY){
        var clicked = []
        for(const block of this.blocks){
            if(block.isClicked){
                clicked.push({x:block.x,y:block.y});
            }
        }
        var minX,maxX,minY,maxY;
        if(clicked.length>=2){
            minX = Math.min(clicked[0].x,clicked[1].x);
            maxX = Math.max(clicked[0].x,clicked[1].x);
            minY = Math.min(clicked[0].y,clicked[1].y);
            maxY = Math.max(clicked[0].y,clicked[1].y);
        }
        for(const block of this.blocks){
            if(minX<=block.x && block.x<=maxX && minY<=block.y && block.y<=maxY){
                block.isClicked = true;
            }
            block.mouseHover(mouseX,mouseY);
            this.ctx.beginPath();
            this.ctx.rect(block.x, block.y, block.width, block.height);
            this.ctx.fillStyle = block.choiseColor();
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

}

export {PuzzleGame};