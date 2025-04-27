import StageRect from "./stageRect.js";
class StageSelect{
    constructor(clickManager,canvas,ctx){
        this.frame = 0;
        this.canvas = canvas;
        this.ctx = ctx;
        this.buttons = [];
        this.createButton();
        this.nextStage = new StageRect(0,0,0,0,0,0,0);
        clickManager.addClickHandler(this.clickJudge.bind(this));
    }
    display(mouseX,mouseY){
        this.frame++;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.drawRoad();
        this.drawButton();
        
    }
    returnStageSelect(){
        this.nextStage = new StageRect(0,0,400,400,"選択画面",0,0);
    }
    createButton(){
        this.buttons.push(new StageRect(this.canvas,this.ctx,300,100,"ブロック崩し",true,1));
        this.buttons.push(new StageRect(this.canvas,this.ctx,200,300,"パズル",false,2));
        this.buttons.push(new StageRect(this.canvas,this.ctx,300,500,"タイピング",false,3));
        this.buttons.push(new StageRect(this.canvas,this.ctx,200,700,"ブロック崩し+パズル+タイピングを同時にやるやつ",false,4));
    }
    clickJudge(){
        for(const b of this.buttons){
            if(b.isHovered){
                this.nextStage = b;
                console.log("ステージ変更"+b.stageNum);//////////////////////////////
                return;
            }
        }
    }
    drawRoad(){
        let prevX;
        let prevY;
        for(const b of this.buttons){
            if(prevX!=undefined){
                this.ctx.fillStyle = "green";
                this.ctx.beginPath();
                this.ctx.moveTo(b.x, b.y);
                this.ctx.lineTo(b.x+10, b.y);
                this.ctx.lineTo(prevX+10, prevY);
                this.ctx.lineTo(prevX, prevY);
                this.ctx.closePath();
                this.ctx.fill();
            }
            prevX = b.x;
            prevY = b.y;
        }
    }
    drawButton(){
        for(const b of this.buttons){
            this.ctx.save();
            const wid = b.rectWidth;
            const hei = wid * 0.3;
            //xとyは中心の座標
            //四角形
            if(b.x-wid/2<this.mouseX && b.x+wid/2>this.mouseX && b.y-hei/2<this.mouseY && b.y+hei/2>this.mouseY){
                if(b.isReady){
                    b.mouseHover();
                }
            }
            else{
                b.mouseLeave();
            }
            //四角形
            this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.rect(b.x-wid/2,b.y-hei/2,wid,hei);
            this.ctx.fill();
            this.ctx.stroke();
    
            //文字
            this.ctx.beginPath();
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "30px sans-serif";
            if(b.isReady){
                this.ctx.fillStyle = "red";
                this.ctx.fillText(b.stageName, b.x, b.y);
            }
            else{
                this.ctx.fillStyle = "black";
                this.ctx.fillText("???", b.x, b.y);
            }
            this.ctx.fill();
            this.ctx.restore();


            //別のステージの時はfalseにしとかないとなんかやばかった
            
        }

    }
    allOff(){
        for(const b of this.buttons){
            b.isHovered = false;
        }
    }

}

export {StageSelect};