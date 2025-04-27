import { ShootingGame } from "./Shooting/ShootingGame.js";
import { PuzzleGame } from "./Puzzle/Puzzle.js";
import { Typing } from "./Typing/Typing.js";
import { StageSelect } from "./SelectStage/stageSelect.js";
import { AnimationManager }  from "./AminationManager.js";
import { FinalStage } from "./finalStage.js";
import { GameExplain } from "./GameExplain.js";
import { ClickManager } from "./ClickManager.js";

class Game{
    constructor(){
        this.frame = 0;
        
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.mouseX = 0;
        this.mouseY = 0;
        this.clickManager = new ClickManager(this.canvas);
        this.animationManager = new AnimationManager(this.canvas,this.ctx);
        this.shootingGame = new ShootingGame(this.clickManager,this.canvas,this.ctx,10);
        this.puzzleGame = new PuzzleGame(this.canvas,this.ctx);
        this.typing = new Typing(this.canvas,this.ctx);
        this.finalStage = new FinalStage();
        this.stageSelect = new StageSelect(this.clickManager,this.canvas,this.ctx);
        this.gameExplain = new GameExplain(this.clickManager,this.canvas,this.ctx);
        this.currentStageNum1 = 0;//0:選択画面 1&2:ボール 3&4:パズル 5&6:タイピング 7:全て
        this.currentStageNum2 = 0;//0:選択画面 1&2:ボール 3&4:パズル 5&6:タイピング 7:全て
        this.clearRectframe = 0;
        this.clickManager.addClickHandler(this.click.bind(this));
    }
    //マウス位置を取得
    mouseMove(){
        const rect = canvas.getBoundingClientRect(); // canvasの位置とサイズ
        this.mouseX = event.clientX - rect.left; // canvas内のx座標
        this.mouseY = event.clientY - rect.top;  // canvas内のy座標
    }

    //ここでリトライ機能をつける
    reset(){
        this.shootingGame = new ShootingGame(this.clickManager, this.canvas, this.ctx,10);
        this.puzzleGame = new PuzzleGame(this.canvas, this.ctx);
        this.typing.destroy();
        this.typing = new Typing(this.canvas,this.ctx);
        this.gameExplain = new GameExplain(this.clickManager,this.canvas,this.ctx);
    }

    startGame() {
        this.canvas.addEventListener("mousemove",this.mouseMove.bind(this))
        // window.addEventListener("keydown", (e) => {
        //     if (e.key === "r" || e.key === "R") {
        //         this.reset();
        //     }
        // });
        this.update();
    }

    click(){
        if(this.clearRectframe!=0){
            //console.log("a");/////////////////////////////////////////
            this.stageSelect.returnStageSelect(this.currentStageNum1);
        }
    }
    //クリア（ステージ共通）
    clear(){
        this.ctx.save();
        this.ctx.textAlign = "center"; 
        this.ctx.textBaseline = "middle";
        this.ctx.font = '30px Roboto medium';
        this.ctx.fillStyle = "blue";
        this.ctx.fillText("クリア!",400,300);
        if(300<this.mouseX && this.mouseX<500 && 375<this.mouseY && this.mouseY<425){
            this.clearRectframe ++;
            let size = 1+0.1*Math.sin(this.clearRectframe/10);
            this.ctx.translate(400,400);
            this.ctx.scale(size,size);
            this.ctx.translate(-400,-400);
        }
        else{
            this.clearRectframe = 0;
        }
        


        this.ctx.beginPath();
        this.ctx.rect(300,375,200,50);
        this.ctx.stroke();

        this.ctx.fillText("次のステージ",400,400);
        this.ctx.restore();
    }


    //どのステージを描画するか（毎フレーム）
    update(){
        this.frame++;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//前のフレームを消す
        this.ctx.save();

        //ステージ
        //クリックかつホバーされていたらstagenumが更新
        //animation変数、this.currentStageNum1を更新
        //アニメーションが始まる
        //中間まで終わったらthis.currentStageNum2が更新
        //実際の描画ステージが変更
        //最後まで終わったらanimationが更新
        const { x, y,stageNum} = this.stageSelect.nextStage;


        const isAnimation = this.animationManager.isAnimation;
        if(this.currentStageNum1 != stageNum){//ステージ変更(変更アニメーションが始まる直前に一回だけ。this.currentStageNum1とstageNumは次の数字になる。)
            this.frame = 0;
            this.animationManager.isAnimation = true;
            this.currentStageNum1 = stageNum;
        }
        
        
        let stageChangeFlag = this.animationManager.selectToStage1(x,y,this.frame);
        //アニメーション1（アニメーション前半が終わったら一回だけ。this.currentStageNum2は次の数字になる。）
        if(stageChangeFlag == 1){
            this.reset();
            this.currentStageNum2 = this.currentStageNum1;
            this.clearRectframe = 0;
            this.stageSelect.allOff();
        }

        //this.shootingGame.gamePlay(this.mouseX,this.mouseY);//シューティング
        let isExplainEnd;
        switch(this.currentStageNum2){
            case 0:
                this.stageSelect.display(this.mouseX,this.mouseY); //選択画面
                break;
            case 1:
                isExplainEnd = this.gameExplain.explain(isAnimation,"shoot");//説明
                this.shootingGame.gamePlay(this.mouseX,this.mouseY,isExplainEnd);//シューティング
                if(this.shootingGame.score.score>=1){
                    this.clear();
                }
                break;
            case 2:
                isExplainEnd = this.gameExplain.explain(isAnimation,"shootEndless");//説明
                this.shootingGame.gamePlay(this.mouseX,this.mouseY,isExplainEnd);//シューティング
                if(this.shootingGame.score.score>=100000){
                    this.clear();
                }
                break;

            case 3:
                isExplainEnd = this.gameExplain.explain(isAnimation,"puzzle");//説明
                this.puzzleGame.gamePlay(this.mouseX,this.mouseY,isExplainEnd);//パズル
                
                break;
            case 8:
                this.shootingGame.gamePlay(this.mouseX,this.mouseY);//シューティング
                this.puzzleGame.gamePlay(this.mouseX,this.mouseY);//パズル
                this.typing.gamePlay();//タイピング
                this.drawScore();
                break;
        }

        //白
        this.animationManager.selectToStage2(this.frame);
        console.log(stageNum,this.currentStageNum1,this.currentStageNum2);///////////////////////////////////////////////////////
        
        this.ctx.restore();
        requestAnimationFrame(this.update.bind(this));//毎フレーム更新？
    }

}




const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{
    startBtn.style.display = "none";
    var obj = new Game();
    obj.startGame();
})

