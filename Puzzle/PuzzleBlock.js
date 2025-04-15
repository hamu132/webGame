class PuzzleBlock{
    constructor(x,y,type,canvas){
        this.x = x;
        this.y = y;
        this.type = type;
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
    choiseColor(){
        switch(this.type){
            case "A":
                return "red";
            case "B":
                return "green";
            case "C":
                return "blue";
            case "P":
                return "yellow";
            case "F":
                return "black";
        }
    }

}

export default PuzzleBlock;