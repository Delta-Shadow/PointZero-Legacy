// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var div = document.getElementById('div');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Game = new GameManager();
var Menu = new MenuManager();
var gameOverScreen = new GameOverScreen();
var ball = new Ball();
var spikes = new Spikes();
var candySystem = new CandySystem();
var particleSystem = new ParticleSystem();
var explosionSystem = new ExplosionSystem();

window.addEventListener("resize", OnResizeCalled, false);
window.addEventListener("orientationchange", OnResizeCalled, false);
document.addEventListener("mousedown", clickStart, false); 
document.addEventListener("mouseup", clickEnd, false); 
document.addEventListener("touchstart", touchBegin, false); 
document.addEventListener("touchend", touchStop, false);

function OnResizeCalled() { 
    div.style.width = window.innerWidth + 'px'; 
    div.style.height = window.innerHeight + 'px'
    
    var gameWidth = window.innerWidth; 
	var gameHeight = window.innerHeight; 
	var scaleToFitX = gameWidth / Game.width; 
	var scaleToFitY = gameHeight / Game.height; 
	 
	var currentScreenRatio = gameWidth / gameHeight; 
	var optimalRatio = Math.min(scaleToFitX, scaleToFitY); 
	 
	if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) { 
	    div.style.width = gameWidth + "px"; 
	    div.style.height = gameHeight + "px"; 
	} 
	else { 
	    div.style.width = Game.width * optimalRatio + "px"; 
	    div.style.height = Game.height * optimalRatio + "px"; 
	} 
}

function clickStart(e) {
	e.preventDefault();
	if (Game.mode == 0 && Menu.allReady == true) {
		Game.mode = 1;
	} else if (Game.mode == 1) {
		Game.startClick.x = e.clientX;
		Game.startClick.y = e.clientY;
	} else if (Game.mode == 2 && gameOverScreen.allReady == true) {
		Game.restart();
	}
};
	
function clickEnd(e) {
	e.preventDefault();
	if (Game.mode == 1) {
		Game.endClick.x = e.clientX;
		Game.endClick.y = e.clientY;
		Game.dragDistance.x = Math.abs(Game.startClick.x - Game.endClick.x);
		Game.dragDistance.y = Math.abs(Game.startClick.y - Game.endClick.y);
		Game.evaluateDrag();
	};
};

function touchBegin(e) {
	e.preventDefault();
	if (Game.mode == 0 && Menu.allReady == true) {
		Game.mode = 1;
	} else if (Game.mode == 1) {
		Game.startClick.x = e.changedTouches[0].clientX;
		Game.startClick.y = e.changedTouches[0].clientY;
	} else if (Game.mode == 2 && gameOverScreen.allReady == true) {
		Game.restart();
	}
};
	
function touchStop(e) {
	e.preventDefault();
	if (Game.mode == 1) {
		Game.endClick.x = e.changedTouches[0].clientX;
		Game.endClick.y = e.changedTouches[0].clientY;
		Game.dragDistance.x = Math.abs(Game.startClick.x - Game.endClick.x);
		Game.dragDistance.y = Math.abs(Game.startClick.y - Game.endClick.y);
		Game.evaluateDrag();
	};
};

OnResizeCalled();

function menu() {
	Game.roller = requestAnimFrame(menu);
	ctx.clearRect(0, 0, Game.width, Game.height);

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);
	Game.drawScore();

	spikes.run();
	Menu.run();
};

function main() {
	Game.roller = requestAnimFrame(main);
	ctx.clearRect(0, 0, Game.width, Game.height);
	Game.ticker++;

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);

	if (Game.ticker < 500) {
		if (Game.ticker > 150) {Menu.swipe.y -= 10};
		Menu.swipe.draw();
	};
	Game.drawScore();

	spikes.run();
	candySystem.run();
	particleSystem.run();
	explosionSystem.run();
	ball.run();

	if (Game.mode == 2) {
		gameOverScreen.run();
	}
};

candySystem.spawn();
menu();