function Ball() {
	this.x = 275;
	this.y = 700;
	this.radius = 25;
	this.color = "#7a306c";
	this.v = {x: 0, y: -12};
	this.g = {x: 0, y: 0.2};
};

Ball.prototype.checkCollisionWithSpikes = function() {
	if (this.x < 45 || this.x > 555 || this.y < 45 || this.y > 755) {
		return true;
	} else {
		return false;
	}
}

Ball.prototype.update = function() {
	if (this.checkCollisionWithSpikes()) {
		Game.mode = 2;
		Game.music.drop.play();
		for (var i = 0; i <= 20; i++) {
			particleSystem.spawn("Explosion", this.x, this.y, {x: Math.floor(Math.random()*5)-3, y: -(Math.floor(Math.random()*12)+4)}, {x: 0, y: 0.2});			
		};
	};
	this.v.x += this.g.x;
	this.v.y += this.g.y;
	this.x += this.v.x;
	this.y += this.v.y;
	if (Game.ticker % 10 == 0) {
		particleSystem.spawn("Normal", this.x, this.y, {x: -this.v.x, y: -this.v.y}, {x: 0, y: 0});
	};
};

Ball.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
};

Ball.prototype.run = function() {
	if (Game.mode == 1) {
		this.update();
		this.draw();
	};
};