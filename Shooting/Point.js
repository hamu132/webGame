class Point{
    constructor(){
        this.point = 0;
    }
    pointUp(block){
        if(block.color == "red"){
            this.point+=2;
        }
        else{
            this.point+=1;
        }
    }
    getPoint(){
        return this.point;
    }
}

export default Point;