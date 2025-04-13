class Ball{
    constructor(height){
        this.x = 100;
        this.y = 600;
        this.xspeed = 4;
        this.yspeed = 4;
        this.radius = 10;
    }
    getBottom(){
        return this.y + this.radius;
    }
    advanceX(){
        this.x+=this.xspeed;
        return this.x;
    }
    advanceY(){
        this.y+=this.yspeed;
        return this.y;
    }
    // isInCanpas(width,height){
    //     if(width<this.x+this.radius || this.x-this.radius<0){
    //         this.xspeed = -this.xspeed;
    //     }
    //     if(height<this.y+this.radius || this.y-this.radius<0){
    //         this.yspeed = -this.yspeed;
    //     }
    // }
}
export default Ball;