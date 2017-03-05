function Ball() {
	this.x = 275;
	this.y = 375;
	this.radius = 25;
	this.color = "#7a306c";
	this.v = {x: 0, y: 0};
	this.g = {x: 0, y: 0.2};
};

Ball.prototype.update = function() {
	this.v.x += this.g.x;
	this.v.y += this.g.y;
	this.x += this.v.x;
	this.y += this.v.y;
}

Ball.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
};

Ball.prototype.run = function() {
	this.update();
	this.draw();
};