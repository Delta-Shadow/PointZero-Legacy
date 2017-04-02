function EnemySystem() {
	this.enemies = [];
	this.difficulty = 70;
};

EnemySystem.prototype.spawn = function() {
	var x;
	if (Math.random() < 0.50) {x = -100} else {x = 900};
	var y = Math.floor((Math.random() * 600) + 1);
	var dX = ball.x - x;
	var dY = ball.y - y;
	var distance = Math.sqrt((dX*dX) + (dY*dY));
	var directionalVels = {
		x: (distance/dX) * 5,
		y: (distance/dY) * 5
	}
	var o = new Enemy(x, y, directionalVels.x, directionalVels.y);
	this.enemies.push(o);
};

EnemySystem.prototype.run = function() {
	if (Game.score >= 10 && Game.ticker % this.difficulty == 0) {
		if (Game.ticker % 250 == 0 && this.difficulty > 10) {this.difficulty -= 10}; 
		this.spawn();
	};
	for (var i in this.enemies) {
		this.enemies[i].update();
		this.enemies[i].draw();
		if (this.enemies[i].isOutOfScreen()) {
			delete this.enemies[i];
		};
	};
};

function Enemy(x, y, xV, yV) {
	this.x = x;
	this.y = y;
	this.radius = 10;
	this.color = "#f21b3f";
	this.speed = {x: xV, y: yV};
};

Enemy.prototype.isOutOfScreen = function() {
	if (this.x < -200 || this.x > 1000 || this.y < -200 || this.y > 800) {
		return true;
	} else {
		return false;
	};
};

Enemy.prototype.update = function() {
	this.x += this.speed.x;
	this.y += this.speed.y;
};

Enemy.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
};