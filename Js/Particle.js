function ParticleSystem() {
	this.particles = [];
};

ParticleSystem.prototype.spawn = function(mode, x, y, v, g) {
	var o = new Particle(mode, x, y, v, g);
	this.particles.push(o);
};

ParticleSystem.prototype.run = function() {
	for (var i in this.particles) {
		this.particles[i].run();
		if (this.particles[i].mode == "Explosion" && this.particles[i].isOutOfScreen()) {
			delete this.particles[i];
		};
		if (this.particles[i].mode == "Normal" && this.particles[i].timer >= this.particles[i].timeOut) {
			delete this.particles[i];
		} else {
			this.particles[i].timer++;
		};
	};
};

function Particle(mode, x, y, v, g) {
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 10;
	this.v = {x: v.x, y: v.y};
	this.color = "#7a306c";
	this.g = {x: g.x, y: g.y};
	this.mode = mode;
	this.timeOut = 50;
	this.timer = 0;
};

Particle.prototype.isOutOfScreen = function() {
	if (this.x < -20 || this.x > 620 || this.y > 820 || this.y < -200) {
		return true;
	} else {
		return false;
	}
}

Particle.prototype.update = function() {
	this.v.x += this.g.x;
	this.v.y += this.g.y;
	this.x += this.v.x;
	this.y += this.v.y;
};

Particle.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Particle.prototype.run = function() {
	this.update();
	this.draw();
};