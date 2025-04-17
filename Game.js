import { ShootingGame } from "./Shooting/ShootingGame.js";
import { PuzzleGame } from "./Puzzle/Puzzle.js";

class Game{
    constructor(){
        this.frame = 0;
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.mouseX = 0;
        this.mouseY = 0;
        this.shootingGame = new ShootingGame(this.height,this.canvas,this.ctx);
        this.puzzleGame = new PuzzleGame(this.canvas,this.ctx);
        this.test = new Test(this.ctx);
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
        //this.test.draw();
        //this.debug();
        requestAnimationFrame(this.update.bind(this));
    }
}

class Test{
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
    }
    draw(){
        this.ctx.save();
        this.ctx.rotate(-Math.PI/3);
        this.ctx.translate(0, 800);
        
        this.ctx.beginPath();
        this.ctx.rect(this.x,this.y,this.width,this.height);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}


const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click",()=>{
    startBtn.style.display = "none";
    var obj = new Game();
    obj.startGame();
})

