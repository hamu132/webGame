class WordToRoma{
    constructor(){
        this.boin = {
            "あいうえお":"",
            "かきくけこ":"k",
            "さしすせそ":"s",
            "たちつてと":"t"
        }
        this.shiin = {
            "あかさたなはまやらわ":"a",
            "いきしちにひみり":"i"
        }
    }
    getRoma(japanese){
        return this.boin["あいうえお"];
    }
}

export default WordToRoma;