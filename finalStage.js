class FinalStage{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.angle = 0;
    }
    drawScore(ss,sl,ps,pl,ts,tl){
        let shootScore = ss;
        let shootLife = sl;
        let puzzleScore = ps;
        let puzzleLife = pl;
        let typingScore = ts;
        let typingLife = tl;
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
        this.ctx.rotate(this.angle);//angleを定義しておく
        this.ctx.fillStyle = "red";
        this.ctx.fillText("【Shooting】",titleX,0);
        this.ctx.fillText(shootScore,valueX,kannkaku);
        this.ctx.fillText("♥".repeat(shootLife),valueX,kannkaku*2);

        this.ctx.rotate(Math.PI/1.5);
        this.ctx.fillStyle = "blue";
        this.ctx.fillText("【Puzzle】",titleX,0);
        this.ctx.fillText(puzzleScore,valueX,kannkaku);
        this.ctx.fillText("♥".repeat(puzzleLife),valueX,kannkaku*2);

        this.ctx.rotate(Math.PI/1.5);
        this.ctx.fillStyle = "green";
        this.ctx.fillText("【Typing】",titleX,0);
        this.ctx.fillText(typingScore,valueX,kannkaku);
        this.ctx.fillText("♥".repeat(typingLife),valueX,kannkaku*2);
        this.ctx.fill();
        this.ctx.restore();
        this.angle+=0.003;
    }
}

export {FinalStage};