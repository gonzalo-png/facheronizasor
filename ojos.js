function createEyesSketch(containerId, ojoImgPath, pupilaImgPath, espejo = false) {
  return new p5((sketch) => {
    let canvas;
    let ojoImg, pupilaImg;

    sketch.preload = () => {
      ojoImg = sketch.loadImage(ojoImgPath);
      pupilaImg = sketch.loadImage(pupilaImgPath);
    };

    sketch.setup = () => {
      const container = document.getElementById(containerId);
      canvas = sketch.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent(containerId);
      sketch.noStroke();
    };

    sketch.windowResized = () => {
      const container = document.getElementById(containerId);
      sketch.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };

    sketch.draw = () => {
      sketch.clear();

      
      let mx = sketch.mouseX;
      if (espejo) {
        mx = sketch.width - sketch.mouseX;
      }
      let my = sketch.mouseY;

      
      let eyeRadius = sketch.width * 0.08;
      let pupilRadius = eyeRadius * 1;
      let pupilDist = eyeRadius * 0.5;

      
      let eyeY = sketch.height * 0.48;
      let leftEyeX = sketch.width * 0.19;
      let rightEyeX = sketch.width * 0.42;

      
      sketch.push();
      if (espejo) {
        sketch.translate(sketch.width, 0);
        sketch.scale(-1, 1);
      }

      function drawEye(x, y) {
        let angle = Math.atan2(my - y, mx - x);
        let px = x + pupilDist * Math.cos(angle);
        let py = y + pupilDist * Math.sin(angle);

        sketch.imageMode(sketch.CENTER);
        sketch.image(ojoImg, x, y, eyeRadius * 2, eyeRadius * 2);
        sketch.image(pupilaImg, px, py, pupilRadius * 2, pupilRadius * 2);
      }

      drawEye(leftEyeX, eyeY);
      drawEye(rightEyeX, eyeY);

      sketch.pop();
    };
  });
}

createEyesSketch('p5-container-left', 'MATERIAL_TP/calaveras/ojo.png', 'MATERIAL_TP/calaveras/iris.png', true);

createEyesSketch('p5-container-right', 'MATERIAL_TP/calaveras/ojo.png', 'MATERIAL_TP/calaveras/iris.png', false);
