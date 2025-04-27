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
        this.ShootSerifus = ["ふぉっふぉっふぉ。","わしはブロック崩しゲームの精霊、",
            "「ブロッククズシセイレイ」じゃ。",
            "これからお前さんにルールを伝授してゆくじゃ",
            "ふぉっふぉっふぉ。",
            "このゲームは今までに無かった革新的なデザインコンセプトと、ゲームシーンに没入できるよう設計された高度なグラフィックスにより、新しい体験をユーザーに提供することができるのじゃ。",
            "ふぉっふぉっふぉ。",
            "やることは至って簡単、ブロックを壊すだけじゃ。",
            "赤いブロックを壊すとスコアが貰えるようになっておる。",
            "一応アイテムとかも存在するのじゃが",
            "お主ならフィーリングでやっていけるはずじゃ",
            "このステージでは10ポイント取れたらクリアじゃから",
            "頑張るのじゃぞ","ふぉっふぉっふぉ。"];
        this.ShootEndlessSerifus = ["ふぉっふぉっふぉ。",
            "わしはブロック崩しゲームの精霊、",
            "ブロッククズシセイレイじゃ。",
            "...え？","さっきも聞いたんじゃって？",
            "ふぉっふぉっふぉ。","ふぉっふぉっふぉ。","(気まずい)",
            "...","ここから先は、真の修行の場じゃ。",
            "「エンドレス」——つまり、終わりなきエンドレスじゃな。",
            "ふぉっふぉっふぉ。","信じられるのはお主の腕だけじゃ。",
            "だがのう、","わしは知っておる。",
            "ここらへんの開発がめんどくさくなってきたので正直言って面白味に欠けることをな。じゃ。",
            "(「メタいな！」、とツッコむところ)",
            "特に、ブロックを全部消してもそれ以降新しいブロックが生まれることはないから","マジで何もすることがなくなるのじゃ。",
            "ちなみにリトライ機能も実装してないから",
            "前の画面に戻ることもできないのじゃ",
            "ふぉっふぉっふぉ。",
            "まァ...なんだ。","そういうものだと思って、",
            "生暖かい目で遊んでくれると","助かるのじゃ。",
            "ふぉっふぉっふぉ。","ふぉーふぉっふぉっふぉ！",
            "(ブロッククズシセイレイは星屑となって消えてしまった。)"
        ]
        this.puzzleSerifus = ["ククク...(眼鏡をクイッとしながら)",
            "これはまた、恐れ知らずなヤツが来たものデスねぇ。",
            "ボクはパズルゲームのマスター、",
            "「パズルゲームマスター」なのデス。",
            "キミがここにいるということは、ボクのゲームに挑戦する気があるということデスねぇ。",
            "まぁ、そんなキミの無神経さだけは評価してあげマスよ！",
            "その程度の力で挑むなんて、自ら炎の海に飛び込むのと等しいデスからねぇ。",
            "ククク...(眼鏡をクイッとしながら)",
            "ひとまず良いでしょう、ルールぐらいは説明してあげマスよ♪",
            "ボクのパズルは見ての通り、5x5マスで構成されているのデス。",
            "ここには[3種類のマス]が存在していてですねぇ、",
            "星マークのついた「プラスマス」","バツマークのついた「マイナスマス」","そしてマークが無い「選択マス」","が設置されているのデス！",
            "ククク...(眼鏡をクイッとしながら)",
            "まず最初にキミは、好きな「選択マス」を二つ選んでクリックして頂くのデスねぇ。",
            "そうしたら、2つの「選択マス」を対角に持つ長方形が存在するのが分かりマスよねぇ。",
            "その長方形の内部にある「プラスマス」と「マイナスマス」が数だけ",
            "スコアが得られる仕組みなのですねぇ。",
            "ククク...(眼鏡をクイッとしながら)",
            "こんなにカンタンなルールデスが...もしかして、ルールが全然理解できませんデスか？",
            "その場合は全部、キミの責任デスねぇ。",
            "頑張って体で覚えるしかないデスよ！",
            "わざわざもう一度説明するなんてイヤなのデスから♪",
            //"開発者のルール設定が微妙ということだけは断じて絶対に有り得ないのデスから♪",
            "サテ...今回はとりあえず、10ポイント取れたらクリアということにしてあげマスよ。",
            "どうせ、1ポイントも取れずに終わるでしょうけどねぇ！",
            "ククク...(眼鏡をクイッとしながら)"
        ]

        this.puzzleEndlessSerifus = ["ククク...(眼鏡をクイッとしながら)",
            "キミはさっきのヤツじゃないですかぁ",
            "生きてまた会うことは絶対にないと思っていましたねぇ♪",
            "ここはボクが誇るゲームの最難関、エンドレスステージなのデス",
            "ルールは先ほどと同一デスが、終わりはありませんねぇ！",
            "一度始めたら最後、もう戻ることはできませんよぉ。",
            "ククク...(眼鏡をクイッとしながら)",
            "ところで、もしかしてなんデスがねぇ",
            "「枠全体に対してパズル部分の大きさ小さくない？」...などと思っていませんかねぇ",
            "全てキミの顔に書いてありマスよ♪",
            "それに...「ルール設定が微妙じゃない？」とか、",
            "「シンプルに面白味に欠けない？」とか、",
            "「口調に違和感があるというかムカつく」とか...",
            "思ってマスよねぇ。",
            "ククク...(眼鏡をクイッとしながら)",
            "小賢しい文句の数々ですねぇ。しかし残念デス。",
            "そんなことを言われても、ボクは泣きませんよ！",
            "だってボクは、キミよりも強いのデスから♪",
            "ククク...(手で目を隠しながら)",
            "あぁもう、早く始めればいいじゃないデスか！",
            "ぐすん。"
        ]

        this.typingSerifus = ["ここはタイピングです。","以上です。"];
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
        switch(name){
            case "shoot":
                serifus = this.ShootSerifus;
                serifus = this.testSerifus;
                break;

            case "shootEndless":
                serifus = this.ShootEndlessSerifus;
                serifus = this.testSerifus;
                break;
            case "puzzle":
                serifus = this.puzzleSerifus;
                serifus = this.testSerifus;
                break;
            case "puzzleEndless":
                serifus = this.puzzleEndlessSerifus;
                break;
            case "typing":
                serifus = this.typingSerifus;
                break;
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