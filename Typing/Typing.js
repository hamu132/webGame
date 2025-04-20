import Word from "./Word.js";
import WordToRoma from "./wordToRoma.js";

class Typing{
    constructor(canvas,ctx){
        this.life = 5;
        this.score = 0;
        this.hiraganas = ["こんにちは","ねむい","にほん","ごめんなさい","たいぴんぐ","たつのおとしご"];
        this.canvas = canvas;
        this.ctx = ctx;
        this.createText();
        this.boundKeyDown = this.keyDown.bind(this);
        window.addEventListener("keydown", this.boundKeyDown);
    }
    //リセット用
    destroy() {
        window.removeEventListener("keydown", this.boundKeyDown);
    }
    //毎フレーム呼び出される
    gamePlay(){
        this.drawText();
    }
    //問題のテキストを選ぶ+ローマ字を取得(最初＆問題クリア時)
    createText(){
        const index = Math.floor(Math.random()*this.hiraganas.length);
        const hiragana = this.hiraganas[index];
        this.word = new Word(hiragana);

        this.currentNumRoma = 0;
    }

    //キーを押し込んだとき
    keyDown(key){
        //console.log(key.key);
        if(this.word.checkWord(key.key,this.currentNumRoma) == 1){
            this.currentNumRoma+=1;
            if(this.currentNumRoma == this.word.length){
                this.createText();
                this.score++;
            }
        }
    }

    //描画
    drawText(){
        this.word.scale*=1.001;
        this.ctx.save();
        //ちょっとずつ大きくなってくやつ
        this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
        this.ctx.scale(this.word.scale,this.word.scale);
        //this.ctx.rotate(this.word.angle);
        this.ctx.translate(-this.canvas.width/2, -this.canvas.height/2);

        
        const typedColor = "red";
        const notTypedColor = "black";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        //ひらがなの描画
        let x = this.canvas.width / 2;
        const hiragana = this.word.hiragana;
        this.ctx.font = "48px sans-serif";
        this.ctx.fillStyle = notTypedColor;
        this.ctx.fillText(hiragana, x, this.canvas.height/2);

        //ローマ字の描画
        this.ctx.font = "24px sans-serif";
        const roma = this.word.roma;
        const romaWidth = this.ctx.measureText(roma).width;
        
        // 各文字ごとの幅に基づいて描画
        for (let i = 0; i < roma.length; i++) {
            const ch = roma[i];
            const charWidth = this.ctx.measureText(ch).width;
            if(this.currentNumRoma <= i){
                this.ctx.fillStyle = notTypedColor;
            }
            else{
                this.ctx.fillStyle = typedColor;
            }
            //(キャンパスの中心)+(1文字の幅/2)-(全ての文字の幅/2)
            this.ctx.fillText(ch, x+charWidth/2-romaWidth/2, this.canvas.height/2.2);
            x += charWidth;
        }

        this.ctx.restore();
        this.ctx.font = "48px sans-serif";
        this.ctx.fillText("Score:"+this.score, this.canvas.width*0.7, this.canvas.height*0.8);
    }
}

export {Typing};