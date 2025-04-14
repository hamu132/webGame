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
                block.isClicked = true;
            }
        }
    }
    createBlocks(){
        const rows = 3;
        const cols = 5;
        const padding = 50;
        const offsetX = 50;
        const offsetY = 50;
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = offsetX + col * (padding);
                const y = offsetY + row * (padding);
                const block = new PuzzleBlock(x, y,"A",this.canvas);
                this.blocks.push(block);
            }
        }
    }
    drawBlocks(mouseX,mouseY){
        for(const block of this.blocks){
            if(!block.broken){
                block.mouseHover(mouseX,mouseY);
                this.ctx.beginPath();
                this.ctx.rect(block.x, block.y, block.width, block.height);
                this.ctx.fillStyle = "black";
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

}

export {PuzzleGame};