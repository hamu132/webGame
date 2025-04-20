class Word{
    constructor(hiragana){
        this.scale = 1;
        this.angle = -Math.PI/6;
        this.limitTime = 10;
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
            "あいうえお":"",
            "かきくけこ":"k",
            "さしすせそ":"s",
            "たちつてと":"t",
            "なにぬねの":"n",
            "はひふへほ":"h",
            "まみむめも":"m",
            "やゆよ":"y",
            "らりるれろ":"r",
            "わを":"w",
            "ん":"n",
            "がぎぐげご":"g",
            "ざじずぜぞ":"z",
            "だぢづでど":"d",
            "ばびぶべぼ":"b",
            "ぱぴぷぺぽ":"p",
        }
        let small = {
            "ゃゅょ":"y"
        }
        let shiin = {
            "あかさたなはまやらわがざだぱば":"a",
            "いきしちにひみりぎじぢぴび":"i",
            "うくすつぬふむゆるぐずづぶぷ":"u",
            "えけせてねへめれげぜでべぺ":"e",
            "おこそとのほもよろをごぞどぼぽ":"o",
            "ん":"n"
        }
        //母音
        for(let i in boin){
            if(i.includes(hiragana)){
                roma += boin[i];
            }
        }
        //"しゃ"とかそういうやつ（ここはできてない）
        for(let i in small){
            if(i.includes(hiragana)){
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
}

export default Word;