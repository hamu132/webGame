class PuzzleBlock{
    constructor(x,y,type,canvas){
        this.x = x;
        this.y = y;
        this.reset(type);
    }
    //リセット
    reset(type){
        this.type = type;
        this.width = 30;
        this.height = 30;
        this.isClicked = false;
        
    }
    mouseHover(mouseX,mouseY,rectItem){
        //単にホバー：少しづつ拡大→離れたら少しづつもとの大きさに
        //ホバー中にクリック：少しづつ小さくなって消える
        if(mouseX<=this.x+this.width/2 && this.x-this.width/2<=mouseX && mouseY<=this.y+this.height/2 && this.y-this.height/2<=mouseY){
            
            if(this.height<40 && this.type == rectItem){
                //単にホバー(タイプ"A"のみ)
                if(!this.isClicked){
                    this.width+=1;
                    this.height+=1;
                }
                //クリック後
                else{
                    this.width = 40;
                    this.height = 40;
                }

            }
        }
        //ホバーから離れる
        else{
            if(!this.isClicked && this.height>=30){
                this.width-=1;
                this.height-=1;
            }
        }
    }
    choiseColor(){
        switch(this.type){
            case "A":
                return "red";
            case "P":
                return "blue";
            case "F":
                return "black";
        }
    }


}



export default PuzzleBlock;

//役割が変わっていくシステム