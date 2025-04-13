import PuzzleBlock from "./PuzzleBlock.js";
class PuzzleGame{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.blocks = [];
        this.createBlocks();
    }
    gamePlay(){
        this.drawBlocks();
    }
    createBlocks(){
        const rows = 3;
        const cols = 5;
        const padding = 10;
        const offsetX = 50;
        const offsetY = 50;
    
        for(let row = 0; row < rows; row++){
            for(let col = 0; col < cols; col++){
                const x = offsetX + col * (padding);
                const y = offsetY + row * (padding);
                const block = new PuzzleBlock(x, y,"A");
                this.blocks.push(block);
            }
        }
    }
    drawBlocks(){
        for(const block of this.blocks){
            if(!block.broken){
                this.ctx.beginPath();
                this.ctx.rect(block.x, block.y, block.width, block.height);
                this.ctx.fillStyle = block.color;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }
}

export {PuzzleGame};