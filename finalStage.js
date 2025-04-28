class FinalStage{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.angle = 0;
    }
    drawScore(ss,sl,ps,pl,ts,tl){
        if(sl==0 || pl==0 || tl==0){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            
            this.ctx.rect(0,0,800,800);
            this.ctx.fill();
            this.ctx.fillStyle = "black";
            this.ctx.font = "100px sans-serif";
            this.ctx.fillText("game over(泣)",400,400);
            this.ctx.font = "30px sans-serif";
            this.ctx.fillText("遊んでいただき本当にありがとうございました。",400,500);
            this.ctx.fillText("これにてこのゲームは終了です。お帰り下さい。(雑)",400,550);
            this.ctx.restore();
        }
        else{
            let shootScore = ss;
            let shootLife = sl;
            let puzzleScore = ps;
            let puzzleLife = pl;
            let typingScore = ts;
            let typingLife = tl;
            let totalScore = shootScore + puzzleScore + typingScore;
            let x = this.canvas.width/2;
            let y = this.canvas.height/2;
            const kannkaku = 50;
            const titleX = x/10;
            const valueX = x/5;
    
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "48px sans-serif";
            
            this.ctx.translate(x,y);
            this.ctx.rotate(this.angle);//angleを定義しておく
            this.ctx.fillStyle = "red";
            this.ctx.fillText("【Shooting】",titleX,0);
            this.ctx.strokeText("【Shooting】",titleX,0);
            this.ctx.fillText(shootScore,valueX,kannkaku);
            this.ctx.strokeText(shootScore,valueX,kannkaku);
            this.ctx.fillText("♥".repeat(shootLife),valueX,kannkaku*2);
            this.ctx.strokeText("♥".repeat(shootLife),valueX,kannkaku*2);
    
            this.ctx.rotate(Math.PI/1.5);
            this.ctx.fillStyle = "blue";
            this.ctx.fillText("【Puzzle】",titleX,0);
            this.ctx.strokeText("【Puzzle】",titleX,0);
            this.ctx.fillText(puzzleScore,valueX,kannkaku);
            this.ctx.strokeText(puzzleScore,valueX,kannkaku);
            this.ctx.fillText("♥".repeat(puzzleLife),valueX,kannkaku*2);
            this.ctx.strokeText("♥".repeat(puzzleLife),valueX,kannkaku*2);
    
            this.ctx.rotate(Math.PI/1.5);
            this.ctx.fillStyle = "green";
            this.ctx.fillText("【Typing】",titleX,0);
            this.ctx.strokeText("【Typing】",titleX,0);
            this.ctx.fillText(typingScore,valueX,kannkaku);
            this.ctx.strokeText(typingScore,valueX,kannkaku);
            this.ctx.fillText("♥".repeat(typingLife),valueX,kannkaku*2);
            this.ctx.strokeText("♥".repeat(typingLife),valueX,kannkaku*2);
            this.ctx.fill();
            this.ctx.restore();
            this.angle+=0.003;
    
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.fillStyle = "red"
            this.ctx.font = "bold 48px serif";
            this.ctx.fillText("Total Score:"+totalScore,450,770);
            this.ctx.restore();
        }

    }

}

export {FinalStage};