class GroupBlock{
    constructor(){
        this.axisX;
        this.axisY;
        this.angle=0;
        this.scale=1;
        this.minX;
        this.maxX;
        this.minY;
        this.maxY;
    }
    setValue(a,b){
        this.minX = Math.min(a.x,b.x);
        this.minY = Math.min(a.y,b.y);
        this.maxX = Math.max(a.x,b.x);
        this.maxY = Math.max(a.y,b.y); 
        this.axisX = (this.minX+this.maxX)/2;
        this.axisY = (this.minY+this.maxY)/2;
    }
    change(){
        this.angle+=0.1;
        this.scale-=0.1;
        if(this.scale<0){
            this.scale = 0;
        }
        
    }
    reckonPoint(block){
        var plus,minus,rect = 0;
        if(this.minX<=block.x && block.x<=this.maxX && this.minY<=block.y && block.y<=this.maxY){
            switch(block.type){
                case "A":
                    rect++;
                    break;
                case "P":
                    plus++;
                    break;
                case "F":
                    minus++;
                    break;
            }
            return plus-minus;
        }
        return 0;
    }
}

export default GroupBlock;