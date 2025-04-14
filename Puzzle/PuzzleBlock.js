class PuzzleBlock{
    constructor(x,y,proparty,canvas){
        this.x = x;
        this.y = y;
        this.proparty = proparty;
        this.width = 30;
        this.height = 30;
        this.isClicked = false;

    }
    mouseHover(mouseX,mouseY){
        if(this.isClicked||(this.x<=mouseX && mouseX<=this.x+this.width && this.y<=mouseY && mouseY<=this.y+this.height)){
            this.width = 40;
            this.height = 40;
        }
        else{
            this.width = 30;
            this.height = 30;
        }
    }

}

export default PuzzleBlock;