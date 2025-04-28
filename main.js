// 💡 画面サイズに応じてcanvasサイズを調整
function resizeCanvas() {
  // canvas.width = Math.min(800, window.innerWidth*0.9,window.innerHeight*0.9); // 最大600px、画面の90%まで
  canvas.width = 800;
  canvas.height = canvas.width; // アスペクト比を固定（横長）
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // 初回実行




