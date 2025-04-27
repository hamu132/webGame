class StageRect{
    constructor(canvas,ctx,x,y,stageName,isReady,stageNum,connectNum){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.stageName = stageName;
        this.frame = 0;
        this.rectWidth = 200;
        this.isHovered = false;
        this.isReady = isReady;
        this.stageNum = stageNum;
        this.connectNum = connectNum;
    }
    mouseHover(){
        this.isHovered = true;
        this.frame++;
        this.ctx.translate(this.x,this.y);
        this.ctx.scale(1+Math.sin(this.frame/10)/10,1+Math.sin(this.frame/10)/10);
        this.ctx.translate(-this.x,-this.y);
        
    }
    mouseLeave(){
        this.isHovered = false;
        const scale = 1+Math.sin(this.frame/10)/10;
        if(0.99>scale || scale>1.01){
            this.frame++;
            this.ctx.translate(this.x,this.y);
            this.ctx.scale(1+Math.sin(this.frame/10)/10,1+Math.sin(this.frame/10)/10);
            this.ctx.translate(-this.x,-this.y);
        }
    }
}

export default StageRect;