function ExplosionSystem() {
  this.explosions = [];
};

ExplosionSystem.prototype.spawn = function(dir, x, y) {
  var o = new Explosion(dir, x, y);
  this.explosions.push(o);
};

ExplosionSystem.prototype.run = function() {
  for (var i in this.explosions) {
    if (this.explosions[i].shouldBeKilled()) {
      delete this.explosions[i];
    } else {
      this.explosions[i].update();
      this.explosions[i].draw();
    };
  };
};

function Explosion(dir, x, y) {
  this.color = "#f21b3f";
  this.x = x;
  this.y = y;
  this.radius = 0;
  this.lineWidth = 0;
  this.dirAnimation = dir;
  this.init();
};

Explosion.prototype.init = function() {
  if (this.dirAnimation == "linear") {
    this.radius = 0;
    this.lineWidth = 10;
  } else if (this.dirAnimation == "reverse") {
    this.radius = 80;
    this.lineWidth = 0;
  };
};

Explosion.prototype.shouldBeKilled = function() {
  if (this.dirAnimation == "linear" && this.radius >= 100) {
    return true;
  } else if (this.dirAnimation == "reverse" && this.radius <= 0) {
    return true;
  } else {
    return false;
  };
};

Explosion.prototype.update = function() {
  if (this.dirAnimation == "linear") {
    if (this.radius < 100) {
      this.radius += 10;
      this.lineWidth -= 1;
    };

  } else if (this.dirAnimation == "reverse") {
    if (this.radius > 0) {
      this.radius -= 10;
      this.width += 1;
    };
  };
};

Explosion.prototype.draw = function() {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = this.lineWidth;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  ctx.stroke();
};