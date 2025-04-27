import StageRect from "./stageRect.js";
class StageSelect{
    constructor(clickManager,canvas,ctx){
        this.frame = 0;
        this.number = 0;//ステージいくつまで解禁されているか
        this.canvas = canvas;
        this.ctx = ctx;
        this.buttons = [];
        this.createButton();
        this.roads = [];
        this.createRoad();
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
    returnStageSelect(stageNum){
        //1→2&3が解禁
        //2→なし
        //3→4&5が解禁
        //4→なし
        //5→6&7が解禁
        //6→なし
        //7→なし
        let kaikinNum = [];
        switch(stageNum){
            case 1:
                kaikinNum = [2,3]
                break;
            case 3:
                kaikinNum = [4,5];
                break;
            case 5:
                kaikinNum = [6,7];
                break;
            default:
                kaikinNum = [];
        }
        this.nextStage = new StageRect(0,0,400,400,"選択画面",0,0);
        this.number++;
        this.setReady(kaikinNum);
    }
    createButton(){
        this.buttons.push(new StageRect(this.canvas,this.ctx,300,100,"ブロック崩し",true,1,[1,2]));//0
        this.buttons.push(new StageRect(this.canvas,this.ctx,600,150,"ブロック崩し(Endless)",false,2,[]));//1
        this.buttons.push(new StageRect(this.canvas,this.ctx,200,300,"パズル",false,3,[3,4]));//2
        this.buttons.push(new StageRect(this.canvas,this.ctx,500,350,"パズル(Endless)",false,4,[]));//3
        this.buttons.push(new StageRect(this.canvas,this.ctx,300,500,"タイピング",false,5,[5,6]));//4
        this.buttons.push(new StageRect(this.canvas,this.ctx,600,550,"タイピング(Endless)",false,6,[]));//5
        this.buttons.push(new StageRect(this.canvas,this.ctx,200,700,"ブロック崩し+パズル+タイピングを同時にやるやつ",false,7,[]));//6
    }
    createRoad(){

        let po1;
        let po2;
        let po3;
        let po4;
        for(let b of this.buttons){
            po1 = [b.x,b.y];
            po2 = [b.x+10,b.y];
            for(let j of b.connectNum){
                po3 = [this.buttons[j].x+10,this.buttons[j].y];
                po4 = [this.buttons[j].x,this.buttons[j].y];
                this.roads.push([po1,po2,po3,po4]);
            }
        }
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
    setReady(kaikinNum){
        for(let k of kaikinNum){
            this.buttons[k-1].isReady = true;
        }
        
    }
    drawRoad(){
        // let prevX;
        // let prevY;
        // for(const b of this.buttons){
        //     if(prevX!=undefined){
        //         this.ctx.fillStyle = "green";
        //         this.ctx.beginPath();
        //         this.ctx.moveTo(b.x, b.y);
        //         this.ctx.lineTo(b.x+10, b.y);
        //         this.ctx.lineTo(prevX+10, prevY);
        //         this.ctx.lineTo(prevX, prevY);
        //         this.ctx.closePath();
        //         this.ctx.fill();
        //     }
        //     prevX = b.x;
        //     prevY = b.y;
        // }
        for(let r of this.roads){
            this.ctx.fillStyle = "green";
            this.ctx.beginPath();
            this.ctx.moveTo(r[0][0], r[0][1]);
            this.ctx.lineTo(r[1][0], r[1][1]);
            this.ctx.lineTo(r[2][0], r[2][1]);
            this.ctx.lineTo(r[3][0], r[3][1]);
            this.ctx.closePath();
            this.ctx.fill();
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
        }

    }
    allOff(){
        for(const b of this.buttons){
            b.isHovered = false;
        }
    }

}

export {StageSelect};