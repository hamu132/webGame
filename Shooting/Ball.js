class Ball{
    constructor(paddle){
        this.x = 100;
        this.y = 600;
        this.xspeed = 4;
        this.yspeed = 4;
        this.radius = 10;
        this.isClicked = false
        this.initY = paddle.y-this.radius;
        this.isPenetrate = false;
        this.penetrateFrame = 0;
    }
    getBottom(){
        return this.y + this.radius;
    }
    advance(mouseX,mouseY){
        if(this.isClicked){
            this.x+=this.xspeed;
            this.y+=this.yspeed;
        }
        else{
            this.x = mouseX;
            this.y = this.initY;
        }
        if(this.penetrateFrame>0){
            this.isPenetrate = true;
            this.penetrateFrame-=1;
        }
        else{
            this.isPenetrate = false;
        }
    }
}
export default Ball;