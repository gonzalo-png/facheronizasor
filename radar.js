new p5((sketch) => {
  let detections = [];
  const messages = [
    "Señal detectada en zona facha.",
    "Presencia confirmada de un estilazo.",
    "¡Alerta! Fachero en proximidad.",
    "Nivel de flow: ¡PELIGROSAMENTE ALTO!",
    "Señal ultra estilosa captada.",
    "¡Facha inminente!"
  ];

  const getContainerSize = () => {
    const container = document.getElementById('radar-container');
    return {
      width: container.clientWidth,
      height: container.clientHeight
    };
  };

  sketch.setup = () => {
    const { width, height } = getContainerSize();
    const canvas = sketch.createCanvas(width, height);
    canvas.parent('radar-container');
    sketch.angleMode(sketch.DEGREES);

    setInterval(() => {
      if (sketch.frameCount > 0) {
        
        const msg = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('message').textContent = msg;

        
        let r = sketch.random(30, sketch.height / 2 - 20);
        let a = sketch.random(0, 360);
        detections.push({
          x: r * sketch.cos(a),
          y: r * sketch.sin(a),
          life: 255
        });
      }
    }, 2000);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.stroke(0, 255, 0);
    sketch.noFill();

    
    for (let r = 100; r <= sketch.height / 2; r += 100) {
      sketch.ellipse(0, 0, r * 2);
    }

    
    for (let a = 0; a < 360; a += 45) {
      let x = (sketch.width / 2) * sketch.cos(a);
      let y = (sketch.height / 2) * sketch.sin(a);
      sketch.line(0, 0, x, y);
    }

    
    let angle = sketch.frameCount % 360;
    let bx = (sketch.width / 2) * sketch.cos(angle);
    let by = (sketch.height / 2) * sketch.sin(angle);
    sketch.stroke(0, 255, 0, 150);
    sketch.line(0, 0, bx, by);

    
    for (let i = detections.length - 1; i >= 0; i--) {
      let d = detections[i];
      sketch.fill(0, 255, 0, d.life);
      sketch.noStroke();
      sketch.ellipse(d.x, d.y, 8, 8);
      d.life -= 3;
      if (d.life <= 0) detections.splice(i, 1);
    }
  };

  sketch.windowResized = () => {
    const { width, height } = getContainerSize();
    sketch.resizeCanvas(width, height);
  };
});