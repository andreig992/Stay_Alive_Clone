  var canvas;
  var ctx;
  var mouse = {
    x: 0,
    y: 0
  }

  var bubbles = [];

  var translation = {
    x: 0,
    y: 0
  }

  var isGameOver = false;

  main();

  function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    add50Bubbles();
    console.log(bubbles);
  }

  function add50Bubbles() {
    for (var i = 0; i < 50; i++) {
      addCircle(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() * 5) + 5);
    }
  }

  var timer = 0;

  var state;

  var velocity = .2;

  function drawLoop() {
    timer += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bubbles.length; i++) {

      drawCircle(bubbles[i].x , bubbles[i].y , bubbles[i].rad);
      if (bubbles[i].x > canvas.width) {
        bubbles[i].x -= canvas.width;
      }
      if (bubbles[i].x < 0) {
        bubbles[i].x += canvas.width;
      }
      if (bubbles[i].y > canvas.height) {
        bubbles[i].y -= canvas.height;
      }
      if (bubbles[i].y < 0) {
        bubbles[i].y += canvas.height;
      }

      switch (state) {
        case 0:
          bubbles[i].x += velocity
          break;
        case 1:
          bubbles[i].y -= velocity
          break;
        case 2:
          bubbles[i].x += velocity
          break;
        case 3:
          bubbles[i].y -= velocity
          break;
        case 4:
          bubbles[i].x += velocity
          bubbles[i].y += velocity
          break;
        case 5:
          bubbles[i].x -= velocity
          bubbles[i].y -= velocity
          break;
        case 6:
          bubbles[i].x += velocity
          bubbles[i].y -= velocity
          break;
        case 7:
          bubbles[i].x -= velocity
          bubbles[i].y += velocity
          break;
        case 8:
          break;

      }
    }

    drawSquare(mouse.x, mouse.y, 10);


  }

  setInterval(drawLoop, 1 / 60);

  function randomizePhase() {
    state = Math.floor(Math.random() * 15);
    console.log("changing phase");
  }
  setInterval(randomizePhase, 5000)

  function drawCircle(posX, posY, sizeRadius) {
    ctx.beginPath();
    ctx.arc(posX, posY, sizeRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  function addCircle(posX, posY, sizeRadius) {
    var bubble = {
      x: posX,
      y: posY,
      rad: sizeRadius
    }
    bubbles.push(bubble);
  }

  function drawSquare(x, y, side) {
    ctx.beginPath();
    ctx.rect(x - side / 2, y - side / 2, side, side);
    ctx.stroke();
    ctx.fillStyle = "#FF0000"
    ctx.fill();
  }

  window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    for (var i = 0; i < bubbles.length; i++) {
      var disX = (mouse.x - bubbles[i].x );
      var disY = (mouse.y - bubbles[i].y );
      var distance = Math.sqrt(disX * disX + disY * disY);
      if (distance < bubbles[i].rad) {
        isGameOver = true;
        gameOver();
      }
    }
  })

  window.addEventListener("click", function(e) {
    if (isGameOver) {
      add50Bubbles();
      isGameOver = false;
    }
  })


  function gameOver() {
    bubbles = [];
    console.log("You're dead");
  }
