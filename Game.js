import { ShootingGame } from "./Shooting/ShootingGame.js";
import { PuzzleGame } from "./Puzzle/Puzzle.js";
import { Typing } from "./Typing/Typing.js";

class Game{
    constructor(){
        this.frame = 0;
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.mouseX = 0;
        this.mouseY = 0;
        this.angle = 0;
        this.shootingGame = new ShootingGame(this.height,this.canvas,this.ctx);
        this.puzzleGame = new PuzzleGame(this.canvas,this.ctx);
        this.typing = new Typing(this.canvas,this.ctx);
    }
    //マウス位置を取得
    mouseMove(){
        const rect = canvas.getBoundingClientRect(); // canvasの位置とサイズ
        this.mouseX = event.clientX - rect.left; // canvas内のx座標
        this.mouseY = event.clientY - rect.top;  // canvas内のy座標
        //console.log(`マウス座標: x=${this.mouseX}, y=${this.mouseY}`);
    }

    //ここでリトライ機能をつける
    reset(){
        this.frame = 0;
        this.shootingGame = new ShootingGame(this.height, this.canvas, this.ctx);
        this.puzzleGame = new PuzzleGame(this.canvas, this.ctx);
        this.typing.destroy();
        this.typing = new Typing(this.canvas,this.ctx);
    }
    drawScore(){
        let shootScore = this.shootingGame.score.score;
        let shootLife = 0;
        let puzzleScore = this.puzzleGame.score;
        let puzzleLife = 0;
        let typingScore = this.typing.score;
        let typingLife = 0;
        let allScore = shootScore + puzzleScore + typingScore;
        let x = this.canvas.width/2;
        let y = this.canvas.height/2;
        const kannkaku = 50;
        const titleX = x/10;
        const valueX = x/5;

        this.ctx.save();
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "48px sans-serif";
        
        this.ctx.translate(x,y);
        this.ctx.rotate(this.angle);
        this.ctx.fillStyle = "red";
        this.ctx.fillText("【Shooting】",titleX,0);
        this.ctx.translate(0,kannkaku);
        this.ctx.fillText(shootScore,valueX,0);

        this.ctx.translate(0,-kannkaku);
        this.ctx.rotate(Math.PI/1.5);
        this.ctx.fillStyle = "blue";
        this.ctx.fillText("【Puzzle】",titleX,0);
        this.ctx.translate(0,kannkaku);
        this.ctx.fillText(puzzleScore,valueX,0);
        this.ctx.translate(0,-kannkaku);

        this.ctx.rotate(Math.PI/1.5);
        this.ctx.fillStyle = "green";
        this.ctx.fillText("【Typing】",titleX,0);
        this.ctx.translate(0,kannkaku);
        this.ctx.fillText(typingScore,valueX,0);
        this.ctx.translate(0,-kannkaku);
        this.ctx.fill();
        this.ctx.restore();
        this.angle+=0.003;
    }
    startGame() {
        this.canvas.addEventListener("mousemove",this.mouseMove.bind(this))
        window.addEventListener("keydown", (e) => {
            if (e.key === "r" || e.key === "R") {
                this.reset();
            }
        });
        this.update();
    }
    update(){
        this.frame++;
        this.height = this.canvas.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//前のフレームを消す
        this.shootingGame.gamePlay(this.mouseX,this.mouseY);//シューティング
        this.puzzleGame.gamePlay(this.mouseX,this.mouseY);
        this.typing.gamePlay();
        this.drawScore();
        requestAnimationFrame(this.update.bind(this));
    }
}




const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{
    startBtn.style.display = "none";
    var obj = new Game();
    obj.startGame();
})

