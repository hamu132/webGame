import Word from "./Word.js";
import WordToRoma from "./wordToRoma.js";

class Typing{
    constructor(canvas,ctx){
        this.life = 5;
        this.texts = [];
        this.canvas = canvas;
        this.ctx = ctx;
        this.word = new Word();
    }
    CreateText(){
        this.texts = ["こんにちは","テストです"];
    }
    gamePlay(){
        this.drawText();
    }
    drawText(){
        this.word.scale*=1.001;
        this.ctx.save();
        this.ctx.font = '100px Roboto medium';
        this.ctx.textAlign = "center";
        this.ctx.translate(this.canvas.width/2+100, 600);
        this.ctx.scale(this.word.scale,this.word.scale);
        this.ctx.rotate(this.word.angle);
        this.ctx.translate(-this.canvas.width/2, -350);
        this.ctx.fillText('TEXT', this.canvas.width/2, 400);
        this.ctx.restore();
    }
}

export {Typing};