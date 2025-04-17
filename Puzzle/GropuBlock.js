class GroupBlock{
    constructor(){
        this.reset();
    }
    reset(){
        this.clickedCount = 0;
        this.axisX = 0;
        this.axisY = 0;
        this.angle=0;
        this.scale=1;
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
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

    reckonPoint(block,plusItem,minusItem,rectItem){
        //点数あり（内部）：0以上の数値
        if(this.minX<=block.x && block.x<=this.maxX && this.minY<=block.y && block.y<=this.maxY){
            switch(block.color){
                case plusItem:
                    return 1;
                case minusItem:
                    return -1;
                case rectItem:
                    return 0;
            }
        }
        //点数無し（外部）：-1
        return -2;
    }
}

export default GroupBlock;