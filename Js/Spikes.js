function Spikes() {
	this.color = "#4ad072";
	this.height = 50;
	this.width = 25;
};

Spikes.prototype.update = function() {

};

Spikes.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	var x = 0;
	var y = 50;
	for (var i = 0; i <= 32; i++) {
		ctx.moveTo(x, y);
		ctx.lineTo(x+this.height, y+this.width);
		ctx.lineTo(x, y+(this.width*2));
		ctx.lineTo(x, y);
		y += 75;
	};
	x = 50;
	y = 0;
	for (var i = 0; i <= 6; i++) {
		ctx.moveTo(x, y);
		ctx.lineTo(x+this.width, y+this.height);
		ctx.lineTo(x+(this.width*2), y);
		ctx.lineTo(x, y);
		x += 75;
	};
	x = 600;
	y = 50;
	for (var i = 0; i <= 32; i++) {
		ctx.moveTo(x, y);
		ctx.lineTo(x-this.height, y+this.width);
		ctx.lineTo(x, y+(this.width*2));
		ctx.lineTo(x, y);
		y += 75;
	};
	x = 50;
	y = 800;
	for (var i = 0; i <= 6; i++) {
		ctx.moveTo(x, y);
		ctx.lineTo(x+this.width, y-this.height);
		ctx.lineTo(x+(this.width*2), y);
		ctx.lineTo(x, y);
		x += 75;
	};
	ctx.closePath();
	ctx.fill();
};

Spikes.prototype.run = function() {
	this.update();
	this.draw();
}