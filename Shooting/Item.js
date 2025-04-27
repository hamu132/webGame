class Item{
    constructor(x,y,itemName){
        this.x = x;
        this.y = y;
        this.isBroken = false;
        this.item = itemName;
        if(itemName == "pointUp"){
            this.width = 10;
            this.height = 10;
        }
        if(itemName == "bigSize"){
            this.width = 17;
            this.height = 8;
        }
    }
    advance(){
        this.y+=2;
    }
    //パドルとの衝突
    checkCollision(paddleX,paddleY,paddleWidth){
        if(paddleX<=this.x+this.width && this.x<= paddleX+paddleWidth && this.y<=paddleY && paddleY<=this.y+this.height){
            this.isBroken = true;
            return this.item;
        }
    }
}
export default Item;