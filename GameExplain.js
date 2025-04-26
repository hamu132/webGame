class GameExplain{
    constructor(clickManager,canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        clickManager.addClickHandler(this.click.bind(this));
        this.frame = 0;
        this.serifuNum = 0;
        this.isStaged = false;
        this.isCanClick = false;
        this.ShootSerifus = ["ふぉっふぉっふぉ。","わしはブロック崩しゲームの精霊、","ブロッククズシセイレイじゃ。","これからお前さんにルールを伝授してゆくじゃ",
            "ふぉっふぉっふぉ。","このゲームは今までに無かった革新的なゲームデザインにより、新しい体験をユーザーに提供することができるじゃ。","ふぉっふぉっふぉ。",
            "やることは至って簡単","緑の板を操作して、","四角いブロックを崩してみるのじゃ。",
            "赤いブロックを壊すとスコアが貰えるようになっておるじゃ。",
            "一応アイテムとかも存在するのじゃが いも","お主ならフィーリングでやっていけると信じておるじゃ","このステージでは10ポイント取れたらクリアじゃから",
            "頑張るのじゃぞ","ふぉっふぉっふぉ。"];
            //"赤：スコア　　　青：アイテム　　　緑：何もなし","という感じなのじゃが",
            // "まあ気にせず適当に崩してもOKじゃ。","ふぉっふぉっふぉ。",
            // "アイテムは2種類あってじゃ、","受け取るといいことが起こるのじゃ。",
            // "パドルの長さが伸びる「ナガサノビール」","貰えるスコアが2倍になる「スコアバイーン」","があるのじゃが いも。","どちらも持続時間は10秒程度なので注意するのじゃ。",
            // "ま、よく分んなくてもフィーリングでなんとかできるはずじゃ。","最後にじゃ。","ボールが下に落ちてしまったらライフが減っていくことに気を付けるのじゃ。",
            // "今回は初めてなので、10ポイント取れたらクリアということにしてやるじゃ。","ふぉっふぉっふぉ。","マウスをクリックしてスタートするのじゃ！"];
    }
    click(){
        
        if(this.isStaged && !this.isCanClick){
            console.log(this.isCanClick);
            this.frame = 10000;
        }
        if(this.isCanClick){
            this.frame = 0;
            this.serifuNum++;
        }
    }
    explain(isAnimation,name){
        let serifus;
        if(name == "shoot"){
            serifus = this.ShootSerifus;
        }
        this.isStaged = true;
        if(isAnimation){
            this.frame = 0;
        }
        else{
            this.frame ++;
        }
        //枠
        this.ctx.beginPath();
        this.ctx.rect(50,600,700,150);
        this.ctx.stroke();
        //文字
        if(this.serifuNum>=serifus.length){
            return;
        }
        let serifu = serifus[this.serifuNum];
        let textIndex = Math.floor(this.frame/5);
        console.log(textIndex);
        
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        let allWid = this.ctx.measureText(serifu).width;
        if(allWid>1600){
            this.ctx.font = "30px sans-serif";
        }
        else{
            this.ctx.font = "40px sans-serif";
        }
        this.ctx.beginPath();

        let x = 0;
        let upLineLength = 0;
        const sleepTIme = 10;
        for (let i = 0; i < serifu.length; i++) {
            const ch = serifu[i];
            const charWidth = this.ctx.measureText(ch).width;
            this.ctx.fillStyle = "black";
            if(i<textIndex){
                if(x+100<700){
                    this.ctx.fillText(ch, x+100, 650);
                    upLineLength = x+charWidth;
                }
                else{
                    this.ctx.fillText(ch, x+100-upLineLength, 690);
                }
            }

            if(textIndex>serifu.length+sleepTIme){
                this.isCanClick = true;
            }
            else{
                this.isCanClick = false;
            }
            x += charWidth;
        }
    }
}

export {GameExplain};