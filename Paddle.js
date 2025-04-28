class Paddle{
    constructor(canvas,ctx){
        this.height = 10;
        this.width = 100;
        this.ctx = ctx;
        this.x = 0;
        this.y = canvas.height*0.9;
    }
    setx(mouseX,height){
        this.x = mouseX-this.width/2;
        this.y = height*0.9;
    }
    //3段階で角度を変える
    collision(ballBottom,ballX,yspeed,ballY){
        const paddleLL = this.x;
        const paddleLR = this.x + this.width/3;
        const paddleRL = this.x + this.width*2/3;
        const paddleRR = this.x + this.width;

        if(ballBottom >= this.y && yspeed>=0 && ballY<=this.y+this.height){
            if(paddleLL<=ballX && ballX<= paddleLR){
                return -2;
            }
            if(paddleLR<ballX && ballX<= paddleRL){
                return 0;
            }
            if(paddleRL<ballX && ballX<=paddleRR){
                return 2;
            }
        }
        return 100;
    }
}
export default Paddle;