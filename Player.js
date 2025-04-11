class Block{
    constructor(){
        this.frame = 0;
        this.ctx = document.getElementById("canvas").getContext("2d");
        this.canvas = document.getElementById("canvas")
    }
    // 🎮 ゲーム開始処理（簡単なアニメーション例）
    circle(frame){
        var ctx = this.ctx;
        var x = frame*4;
        x = x %(this.canvas.width + 20);
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.arc(x, this.canvas.height / 2, 20, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    startGame(){
        this.update();
    }

    update(){
        this.frame++;
        
        this.circle(this.frame);
        requestAnimationFrame(this.update.bind(this));
    }
}

