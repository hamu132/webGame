
class Block{
    constructor(x,y,width,height,point,color,item){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.point = point;
        this.color = color;
        this.item = item;
        this.isBroken = false;
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
}

export default Block;