class Item{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
    }
    advance(){
        this.y+=2;
    }
}
export default Item;