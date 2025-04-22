class Score{
    constructor(){
        this.score = 0;
    }
    pointUp(block,rate){
        this.score += rate * block.score;
    }
    getPoint(){
        return this.score;
    }
}

export default Score;