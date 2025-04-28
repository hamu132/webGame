
class Block{
    constructor(x,y,width,height,score,color,item){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.score = score;
        this.color = color;
        this.item = item;
        this.isBroken = false;
        this.frame = 0;
    }

    //ブロックとボールの接触を検知
    checkCollision(ballX,ballY,radius){
        if(ballX+radius>=this.x && ballX-radius<=this.x+this.width && ballY+radius>=this.y && ballY-radius<=this.y+this.height){
            
            //ブロックの左右に衝突
            if(ballY>=this.y && ballY<=this.y+this.height){
                return 2;
            }
            //ブロックの上下に衝突
            else{
                return 1;
            }
        }
        return;
    }

    update(){
        if(this.isBroken){
            this.frame++;
        }
        if(this.frame>1000){
            this.isBroken = false;
            this.frame = 0;
            this.item.x = this.x;
            this.item.y = this.y;
            this.item.isBroken = false;
        }
    }
    revive(){

    }
}

export default Block;