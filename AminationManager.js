//全体
class AnimationManager{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.isAnimation = false;
    }


    //セレクト画面→ステージ画面(拡大)
    selectToStage1(x,y,frame){
        if(this.isAnimation){
            let animationTime = 0.5;
            let scale = 1+frame/5;
            if(frame==Math.floor(animationTime*60)){
                scale = 1;
                return 1;
            }
            if(frame>animationTime*60){
                scale = 1;
                return;
            }
            this.ctx.save();
            this.ctx.translate(x,y);
            this.ctx.scale(scale,scale);
            this.ctx.translate(-x,-y);
        }
    }
    selectToStage2(frame){
        let animationTime = 0.5;
        let waitTime = 1;
        let endTime = animationTime*2+waitTime;
        if(this.isAnimation){
            let alpha = frame/60/animationTime;
            if(frame>animationTime*60){
                alpha = 1;
            }
            if(frame>(animationTime+waitTime)*60){
                alpha = 1-(frame - (animationTime+waitTime)*60)/60/animationTime;
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.rect(0,0,800,800);
            this.ctx.fill();

            if(frame>endTime*60){
                this.isAnimation = false;
            }
        }
    }
    stageToSelect(){
        
    }
}

export {AnimationManager};