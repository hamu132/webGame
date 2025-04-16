class Item{
    constructor(x,y,itemName){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.isBroken = false;
        this.item = itemName;
    }
    advance(){
        this.y+=2;
    }
    //パドルとの衝突
    checkCollision(paddleX,paddleY,paddleWidth){
        if(paddleX<=this.x+this.width && this.x<= paddleX+paddleWidth && this.y<=paddleY && paddleY<=this.y+this.height){
            console.log(this.item);
            this.isBroken = true;
            return this.item;
        }
    }
}
export default Item;