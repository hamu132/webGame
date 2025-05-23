class PuzzleBlock{
    constructor(x,y,color,size){
        //xとyはブロックの中心座標
        this.x = x;
        this.y = y;
        this.reset(color,size);
    }
    //リセット
    reset(color,size){
        this.color = color;
        this.width = 30;
        this.height = 30;
        this.isClicked = false;
    }
    mouseHover(mouseX,mouseY,rectItem){
        //単にホバー：少しづつ拡大→離れたら少しづつもとの大きさに
        //ホバー中にクリック：少しづつ小さくなって消える
        if(mouseX<=this.x+this.width/2 && this.x-this.width/2<=mouseX && mouseY<=this.y+this.height/2 && this.y-this.height/2<=mouseY){
            
            if(this.height<40 && this.color == rectItem){
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
        switch(this.color){
            case "blue":
                return "blue";
            case "red":
                return "red";
            case "green":
                return "green";
        }
    }
}



export default PuzzleBlock;

//役割が変わっていくシステム