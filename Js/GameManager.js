function GameManager() {	
	this.width = 600;
	this.height = 800;
	this.roller;
	this.ticker = 0;
	this.bg = "White";
	this.mode = 0;

	this.startClick = {};
	this.endClick = {};
	this.dragDistance = {};

	this.score = 0;

	this.swipe = new Swipe();

	this.music = new Music();
};

GameManager.prototype.evaluateDrag = function() {
	if (this.dragDistance.x > this.dragDistance.y) {
		// Drag is in X Plane
		ball.g.y = 0;
		ball.v.x *= 0.3;
		if (this.endClick.x > this.startClick.x) { // Dragged Right
			ball.g.x = 0.1;
		} else if (this.endClick.x < this.startClick.x) { // Dragged Left
			ball.g.x = -0.1;
		}
	} else if (this.dragDistance.y > this.dragDistance.x) {
		// Drag is in Y Plane
		ball.g.x = 0;
		ball.v.y *= 0.3;
		if (this.endClick.y > this.startClick.y) { // Dragged Down
			ball.g.y = 0.1;
		} else if (this.endClick.y < this.startClick.y) { // Dragged Up
			ball.g.y = -0.1;
		}
	}
};

GameManager.prototype.drawScore = function() {
	ctx.fillStyle = "#81f495";
	ctx.fillRect(220, 320, 160, 160);
	ctx.font = "100px Arial";
	ctx.fillStyle = "White";
	if (this.score < 10) {
		ctx.fillText("0" + this.score, 245, 440);	
	} else {
		ctx.fillText("" + this.score, 245, 440);
	}
};

GameManager.prototype.switchToGame = function() {
	window.cancelAnimationFrame(this.roller);
	this.ticker = 0;
	this.music.select.play();
	main();
};

GameManager.prototype.restart = function() {
	window.location.reload(false);
};

function Music() {
	this.bg = new Howl({
		urls: ["Data/Freddy_s_Menagerie.mp3"],
		autoplay: true,
		loop: true
	});
	this.select = new Howl({
		urls: ["Data/Select.wav"],
	})
};