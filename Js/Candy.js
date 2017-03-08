function CandySystem() {
	this.candies = [];
};

CandySystem.prototype.spawn = function() {
	var o = new Candy(Math.floor(Math.random()*400) + 100, Math.floor(Math.random()*600) + 100);
	this.candies.push(o);
};

CandySystem.prototype.run = function() {
	for (var i in this.candies) {
		if (this.candies[i].isCollidingWithBall(ball.x, ball.y, ball.radius*2, ball.radius*2)) {
			delete this.candies[i];
			candySystem.spawn();
			Game.score++;
			break;
		}
		this.candies[i].update();
		this.candies[i].draw();
	};
};

function Candy(x, y) {
	this.x = x;
	this.y = y;
	this.width = 25;
	this.height = 25;
	this.color = "#f21b3f";
};

Candy.prototype.isCollidingWithBall = function(x, y, width, height) {
	if (x < this.x+this.width && x+width > x && y < this.y + this.height && this.height + this.y > y) {
		return true;
	};		  
};

Candy.prototype.update = function() {

};

Candy.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};