class Score{
    constructor(){
        this.score = 0;
    }
    pointUp(block){
        this.score += block.score;
    }
    getPoint(){
        return this.score;
    }
}

export default Score;