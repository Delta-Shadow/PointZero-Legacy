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

	this.shaker = new Shaker();
};

function Shaker() {
	this.x = Math.floor(Math.random() * 50) + 1;
	this.y = Math.floor(Math.random() * 50) + 1;
	this.timesRan = 100;
};

Shaker.prototype.run = function() {
	if (this.timesRan == 0) {
		this.preShake();
		this.timesRan++;
	} else if (this.timesRan == 1) {
		this.postShake();
		this.timesRan++;
	} else {
		this.timesRan = 100;
	}
};

Shaker.prototype.preShake = function() {
	ctx.save();
	var x = Math.floor(Math.random() * 10) + 1;
	var y = Math.floor(Math.random() * 10) + 1;
	ctx.translate(x, y);
};

Shaker.prototype.postShake = function() {
	ctx.restore();
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
	main();
};

GameManager.prototype.restart = function() {
	window.location.reload(false);
};

function Music() {
	this.isReady = false;
	this.bg = new Audio("Data/Freddy_s_Menagerie.mp3");
	this.bg.oncanplaythrough = function() {
		document.getElementById("LoadingText").style.display = "None"
		this.play();
		this.isReady = true;
		candySystem.spawn();
		menu();
	};
	this.drop = new Audio("Data/Select.wav");
	/*this.bg1 = new Howl({
		urls: ["Data/Freddy_s_Menagerie.mp3"],
		autoplay: true,
		loop: true
	});
	this.drop = new Howl({
		urls: ["Data/Select.wav"],
	});*/
};