class PuzzleBlock{
    constructor(x,y,type,canvas){
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 30;
        this.height = 30;
        this.isClicked = false;
        this.animation = false;

        this.rotate = 0;
    }
    mouseHover(mouseX,mouseY){
        //単にホバー：少しづつ拡大→離れたら少しづつもとの大きさに
        //ホバー中にクリック：少しづつ小さくなって消える
        if(mouseX<=this.x+this.width/2 && this.x-this.width/2<=mouseX && mouseY<=this.y+this.height/2 && this.y-this.height/2<=mouseY){
            //単にホバー(タイプ"A"のみ)
            if(!this.isClicked && this.height<=40 && this.type == "A"){
                this.width+=1;
                this.height+=1;
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
    //消されるアニメーション（回転しながら消えていく）
    vanish(axisX,axisY){
        this.rotate += 1;
        this.width-=0.1;
        this.height-=0.1;
    }

}



export default PuzzleBlock;

//役割が変わっていくシステム