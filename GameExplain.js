class GameExplain{
    constructor(clickManager,canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        clickManager.addClickHandler(this.click.bind(this));

    }
    click(){

    }
    explainShoot(){
        //枠
        this.ctx.beginPath();
        this.ctx.rect(50,600,700,150);
        this.ctx.stroke();
        //文字
        //this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.beginPath();
        this.ctx.fillText("こんにちは",50,600);

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
    }
}

export {GameExplain};