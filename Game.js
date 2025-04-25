import { ShootingGame } from "./Shooting/ShootingGame.js";
import { PuzzleGame } from "./Puzzle/Puzzle.js";
import { Typing } from "./Typing/Typing.js";
import { StageSelect } from "./SelectStage/stageSelect.js";
import { AnimationManager }  from "./AminationManager.js";
import { FinalStage } from "./finalStage.js";

class Game{
    constructor(){
        this.frame = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationManager = new AnimationManager(this.canvas,this.ctx);
        this.shootingGame = new ShootingGame(this.height,this.canvas,this.ctx);
        this.puzzleGame = new PuzzleGame(this.canvas,this.ctx);
        this.typing = new Typing(this.canvas,this.ctx);
        this.finalStage = new FinalStage();
        this.stageSelect = new StageSelect(this.canvas,this.ctx);
        this.currentStageNum = 0;//0:選択画面 1&2:ボール 3&4:パズル 5&6:タイピング 7:全て
    }
    //マウス位置を取得
    mouseMove(){
        const rect = canvas.getBoundingClientRect(); // canvasの位置とサイズ
        this.mouseX = event.clientX - rect.left; // canvas内のx座標
        this.mouseY = event.clientY - rect.top;  // canvas内のy座標
    }

    //ここでリトライ機能をつける
    reset(){
        this.frame = 0;
        this.shootingGame = new ShootingGame(this.height, this.canvas, this.ctx);
        this.puzzleGame = new PuzzleGame(this.canvas, this.ctx);
        this.typing.destroy();
        this.typing = new Typing(this.canvas,this.ctx);
    }
    //これは別の場所へ

    startGame() {
        this.canvas.addEventListener("mousemove",this.mouseMove.bind(this))
        // window.addEventListener("keydown", (e) => {
        //     if (e.key === "r" || e.key === "R") {
        //         this.reset();
        //     }
        // });
        this.update();
    }
    //どのステージを描画するか（毎フレーム）
    update(){
        this.frame++;
        //this.height = this.canvas.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//前のフレームを消す
        this.ctx.save();

        //ステージ
        //ステージ変更は：
        //ボタンを押す→this.stageSelect.nextStageが変化&リセットした後すぐにstageNumも変化
        //this.stageSelect.nextStageかstageNumに応じたアニメーションが開始
        //アニメーションの終了→frameで判定？
        //ステージはswitchの択一じゃない方がいいかもしれない
        //アニメーションの内容：
        //stageNumが0の場合：クリックした部分に向けて拡大＋次のステージが透明度をさげつつ見えてくる
        //それ以外：ステージ選択に戻るときは縮小しながら元に戻る
        //選択画面は常に外部でも動いてる感じがいいのか
        const { x, y,stageNum} = this.stageSelect.nextStage;
        if(this.currentStageNum != stageNum){//ステージ変更
            this.reset();
            this.animationManager.isAnimation = true;
            this.currentStageNum = stageNum; 
            console.log("reset");
        }
        
        //アニメーション
        this.animationManager.selectToStage1(x,y,this.frame);

        this.stageSelect.display(this.mouseX,this.mouseY); //選択画面(常に)
        this.animationManager.selectToStage2(this.frame);
        // switch(this.currentStage){
        //     case 0:
        //         this.stageSelect.display(this.mouseX,this.mouseY); //選択画面
        //         break;
        //     case 1:
        //         this.shootingGame.gamePlay(this.mouseX,this.mouseY);//シューティング
        //         this.explain("shoot");
        //         if(this.shootingGame.score.score>=10){
        //             this.currentStage = 0;
        //         }
        //         break;
        //     case 8:
        //         this.shootingGame.gamePlay(this.mouseX,this.mouseY);//シューティング
        //         this.puzzleGame.gamePlay(this.mouseX,this.mouseY);//パズル
        //         this.typing.gamePlay();//タイピング
        //         this.drawScore();
        //         break;
        // }
        this.ctx.restore();
        requestAnimationFrame(this.update.bind(this));//毎フレーム更新？
    }
    explain(game){
        this.ctx.beginPath();
        this.ctx.rect(50,600,700,150);
        this.ctx.stroke();
    }
}




const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{
    startBtn.style.display = "none";
    var obj = new Game();
    obj.startGame();
})

