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
            let scale = 1+frame/5;
            if(frame>90){
                scale = 1;
            }
            let alpha = 1+frame/100;
            this.ctx.save();


            this.ctx.translate(x,y);
            this.ctx.scale(scale,scale);
            this.ctx.translate(-x,-y);
        }

    }
    selectToStage2(frame){
        if(this.isAnimation){
            let alpha = 1+frame/100;
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
            this.ctx.rect(0,0,800,800);
        }
    }
    stageToSelect(){
        
    }
}

export {AnimationManager};