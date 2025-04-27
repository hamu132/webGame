class GameExplain{
    constructor(clickManager,canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        clickManager.addClickHandler(this.click.bind(this));
        this.frame = 0;
        this.serifuNum = 0;
        this.alpha = 1;
        this.isStaged = false;
        this.isCanClick = false;
        this.isExplainEnd = false;
        this.ShootSerifus = ["ふぉっふぉっふぉ。","わしはブロック崩しゲームの精霊、","ブロッククズシセイレイじゃ。","これからお前さんにルールを伝授してゆくじゃ",
            "ふぉっふぉっふぉ。","このゲームは今までに無かった革新的なデザインコンセプトと、ゲームシーンに没入できるよう設計された高度なグラフィックスにより、新しい体験をユーザーに提供することができるのじゃ。",
            "ふぉっふぉっふぉ。","やることは至って簡単、ブロックを壊すだけじゃ。","赤いブロックを壊すとスコアが貰えるようになっておる。",
            "一応アイテムとかも存在するのじゃが","お主ならフィーリングでやっていけるはずじゃ","このステージでは10ポイント取れたらクリアじゃから",
            "頑張るのじゃぞ","ふぉっふぉっふぉ。"];
            //"赤：スコア　　　青：アイテム　　　緑：何もなし","という感じなのじゃが",
            // "まあ気にせず適当に崩してもOKじゃ。","ふぉっふぉっふぉ。",
            // "アイテムは2種類あってじゃ、","受け取るといいことが起こるのじゃ。",
            // "パドルの長さが伸びる「ナガサノビール」","貰えるスコアが2倍になる「スコアバイーン」","があるのじゃが いも。","どちらも持続時間は10秒程度なので注意するのじゃ。",
            // "ま、よく分んなくてもフィーリングでなんとかできるはずじゃ。","最後にじゃ。","ボールが下に落ちてしまったらライフが減っていくことに気を付けるのじゃ。",
            // "今回は初めてなので、10ポイント取れたらクリアということにしてやるじゃ。","ふぉっふぉっふぉ。","マウスをクリックしてスタートするのじゃ！"];
        this.testSerifus = ["これはテスト台詞。"];
    }
    click(){
        if(this.isStaged && !this.isCanClick){
            this.frame = 10000;
        }
        if(this.isCanClick){
            this.frame = 0;
            this.serifuNum++;
        }
    }
    drawNext(){
        let y = 3*Math.sin(this.frame/10);
        this.ctx.beginPath();
        this.ctx.moveTo(700, 720+y);
        this.ctx.lineTo(730, 720+y);
        this.ctx.lineTo(715, 735+y);
        this.ctx.fill();
        this.ctx.closePath();
    }

    deawRect(){
        //枠
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.beginPath();
        this.ctx.rect(50,600,700,150);
        this.ctx.stroke();
        this.ctx.restore();
    }
    drawText(serifus){
        let serifu = serifus[this.serifuNum];
        let textIndex = Math.floor(this.frame/5);
        
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "middle";
        let allWid = this.ctx.measureText(serifu).width;
        if(allWid>1600){
            this.ctx.font = "20px sans-serif";
        }
        else{
            this.ctx.font = "30px sans-serif";
        }

        this.ctx.beginPath();
        let x = 0;
        let upLineLength = 0;
        const sleepTIme = 10;
        //1文字ずつ
        for (let i = 0; i < serifu.length; i++) {
            const ch = serifu[i];
            const charWidth = this.ctx.measureText(ch).width;
            this.ctx.fillStyle = "black";
            if(i<textIndex){
                if(x+100<700){
                    this.ctx.fillText(ch, x+90, 650);
                    upLineLength = x+charWidth;
                }
                else{
                    this.ctx.fillText(ch, x+90-upLineLength, 690);
                }
            }
            //次の三角形を表示
            if(textIndex>serifu.length+sleepTIme){
                this.drawNext();
                this.isCanClick = true;
            }
            else{
                this.isCanClick = false;
            }
            x += charWidth;
        }
    }
    explain(isAnimation,name){
        let serifus;
        if(name == "shoot"){
            serifus = this.ShootSerifus;
            serifus = this.testSerifus;
        }
        this.isStaged = true;
        if(isAnimation){
            this.frame = 0;
        }
        else{
            this.frame ++;
        }

        //文字
        if(this.serifuNum>=serifus.length){
            //説明が終わった場合
            this.alpha-=0.1;
            if(this.alpha<0){
                this.alpha = 0;
                this.isExplainEnd = true;
                return true;
            }
        }
        else{
            this.drawText(serifus);
        }
        this.deawRect();
        
    }
}

export {GameExplain};