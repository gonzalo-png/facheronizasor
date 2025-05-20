new p5((sketch) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789TIKIABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789SURFABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789GONZA_<3ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charArray = chars.split('');
  const charSize = 20;
  const baseWaveLength = 100;
  const baseAmplitude = 20;
  const speed = 1.2;

  let rows = [];
  let cols;

  function generarFilas() {
    rows = [];
    cols = Math.ceil(sketch.width / (charSize * 1.5)) + 2;

    const extra = 10; 
    const rowCount = Math.floor(sketch.height / (charSize * 2)) + extra * 2;

    for (let r = -extra; r < rowCount - extra; r++) {
      let waveLength = baseWaveLength * (0.7 + 0.6 * ((r + extra) / rowCount));
      let amplitude = baseAmplitude * (0.5 + 0.8 * ((r + extra) / rowCount));
      let positions = [];

      for (let c = 0; c < cols; c++) {
        positions.push(c * charSize * 1.5);
      }

      rows.push({
        yBase: r * charSize * 2 + charSize,
        positions: positions,
        waveLength: waveLength,
        amplitude: amplitude,
      });
    }
  }

  sketch.setup = () => {
    const container = document.getElementById('p5-background-container');
    sketch.createCanvas(window.innerWidth, window.innerHeight).parent(container);
    sketch.textSize(charSize);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textFont('monospace');
    sketch.noStroke();
    generarFilas();
  };

  sketch.draw = () => {
    sketch.background(0);
    let time = sketch.frameCount * 0.05;

    for (let row of rows) {
      for (let i = 0; i < row.positions.length; i++) {
        let c = charArray[(i + Math.floor(sketch.frameCount / 10)) % charArray.length];
        let y = row.yBase + Math.sin((row.positions[i] / row.waveLength) + time) * row.amplitude;

        
        sketch.drawingContext.shadowColor = "#0f0";
        sketch.drawingContext.shadowBlur = 15;

        
        sketch.fill("#0f0");
        sketch.text(c, row.positions[i], y);

        
        sketch.drawingContext.shadowBlur = 0;

        
        row.positions[i] -= speed;
        if (row.positions[i] < -charSize) {
          row.positions[i] = sketch.width + charSize;
        }
      }
    }
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    generarFilas();
  };
});
