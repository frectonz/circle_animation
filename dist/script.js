let canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let innerHeight = canvas.height;
let innerWidth = canvas.width;
let mouse = {
  x: undefined,
  y: undefined,
};

let maxR = 40;
let circlesNum = 1000;
let context = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  innerHeight = canvas.height;
  innerWidth = canvas.width;
  init();
});

window.addEventListener("touchstart", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchend", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchcancel", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function Circle(x, y, r, vx, vy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.minR = r;

  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  };

  this.update = () => {
    if (this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.r < maxR) {
        this.r += 1;
      }
    } else if (this.r > this.minR) {
      this.r -= 1;
    }

    this.draw();
  };
}

let circles = [];

function init() {
  circles = [];
  for (let i = 0; i < circlesNum; i++) {
    let randR = Math.random() * 5 + 1;

    let randX = Math.random() * (innerWidth - randR * 2) + randR;
    let randY = Math.random() * (innerHeight - randR * 2) + randR;

    let randVx = (Math.random() - 0.5) * 8;
    let randVy = (Math.random() - 0.5) * 8;

    let randColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)},${Math.random()})`;

    circles.push(new Circle(randX, randY, randR, randVx, randVy, randColor));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach((circle) => {
    circle.update();
  });
}

animate();
init();

//controls
function fullscreen() {
  document.body.requestFullscreen();
  document.querySelector("#controls").style.top = "-50%";
}

document.querySelector("#circlesNum").addEventListener("mousemove", (e) => {
  let circlesNumDis = document.querySelector("#circlesNumDis");
  circlesNumDis.textContent = `${e.target.value} circles`;
});

document.querySelector("#circlesNum").addEventListener("touchmove", (e) => {
  let circlesNumDis = document.querySelector("#circlesNumDis");
  circlesNumDis.textContent = `${e.target.value} circles`;
});

document.querySelector("#circlesNum").addEventListener("change", (e) => {
  circlesNum = e.target.value;
  init();
});

document.querySelector("#btn").addEventListener("click", function () {
  document.querySelector("#controls").style.top = "50%";
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector("#controls").style.top = "-50%";
});

document.body.addEventListener("dblclick", () => {
  document.querySelector("#controls").style.top = "-50%";
});
