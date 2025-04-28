class Word{
    constructor(hiragana){
        this.scale = 1;
        this.angle = -Math.PI/6;
        this.maxTime = 10;
        this.limitTime = this.maxTime;
        //ワード（ひらがな）
        this.hiragana = hiragana;
        this.roma = this.getRoma();
        this.length = this.roma.length;
    }
    //入力されたキーが今必要とされているキーかどうか
    //[ふ]→[f]/[h]
    checkWord(roma,num){
        if(this.roma[num] == roma){
            return 1;
        }
        else{
            return 0;
        }
    }
    getRoma(){
        var roma = "";
        for(let i = 0;i<this.hiragana.length;i++){
            //ひらがなからローマ字を作成
            roma += this.wordToRoma(this.hiragana[i]);
        }
        return roma;
    }

    //ひらがなからローマ字を返す
    wordToRoma(hiragana){
        var roma = "";
        let boin = {
            "あいうえおアイウエオ":"",
            "かきくけこカキクケコ":"k",
            "さしすせそサシスセソ":"s",
            "たちつてとタチツテト":"t",
            "なにぬねのナニヌネノ":"n",
            "はひふへほハヒフヘホ":"h",
            "まみむめもマミムメモ":"m",
            "やゆよヤユヨ":"y",
            "らりるれろラリルレロ":"r",
            "わをワヲ":"w",
            "んン":"n",
            "がぎぐげごガギグゲゴ":"g",
            "ざじずぜぞザジズゼゾ":"z",
            "だぢづでどダヂヅデド":"d",
            "ばびぶべぼバビブベボ":"b",
            "ぱぴぷぺぽパピプペポ":"p"
        }
        let small = {
            "ゃ":"ya",
            "ゅ":"yu",
            "ょ":"yo"
        }
        let shiin = {
            "あかさたなはまやらわがざだぱばアカサアカサタナハマヤラワガザダバパ":"a",
            "いきしちにひみりぎじぢぴびイキシチニヒミリギジヂビピ":"i",
            "うくすつぬふむゆるぐずづぶぷウクスツヌフムユルグズヅブプ":"u",
            "えけせてねへめれげぜでべぺエケセテネヘメレゲゼデベペ":"e",
            "おこそとのほもよろをごぞどぼぽオコソトノホモヨロヲゴゾドボポ":"o",
            "んン":"n"
        }
        //母音
        for(let i in boin){
            if(i.includes(hiragana)){
                roma += boin[i];
            }
        }
        //"しゃ"とかそういうやつ(無理だった)
        for(let i in small){
            if(i.includes(hiragana)){
                console.log(roma.length);
                let tempRoma = "";
                for(let j = 0;j<roma.length-1;j++){
                    tempRoma += roma[j];
                }
                roma = tempRoma;
                roma += small[i];
            }
        }
        for(let i in shiin){
            if(i.includes(hiragana)){
                roma += shiin[i];
            }
        }
        return roma;
    }

    timeProcess(frame){
        if(frame%60 == 0){
            this.limitTime -= 1;
        }
        return this.limitTime;
    }
}

export default Word;