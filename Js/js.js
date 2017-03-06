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
var ball = new Ball();
var spikes = new Spikes();

window.addEventListener("resize", OnResizeCalled, false);
window.addEventListener("orientationchange", OnResizeCalled, false);
document.addEventListener("mousedown", clickStart, false); 
document.addEventListener("mouseup", clickEnd, false); 
document.addEventListener("touchstart", clickStart, false); 
document.addEventListener("touchend", clickEnd, false); 

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
	Game.startClick.x = e.clientX;
	Game.startClick.y = e.clientY;
};
	
function clickEnd(e) {
	e.preventDefault();
	Game.endClick.x = e.clientX;
	Game.endClick.y = e.clientY;
	Game.dragDistance.x = Math.abs(Game.startClick.x - Game.endClick.x);
	Game.dragDistance.y = Math.abs(Game.startClick.y - Game.endClick.y);
	Game.evaluateDrag();
};

OnResizeCalled();

function menu() {
	Game.roller = requestAnimFrame(menu);
	ctx.clearRect(0, 0, Game.width, Game.height);

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);
};

function main() {
	Game.roller = requestAnimFrame(main);
	ctx.clearRect(0, 0, Game.width, Game.height);

	ctx.fillStyle = Game.bg;
	ctx.fillRect(0, 0, Game.width, Game.height);

	spikes.run();
	ball.run();
};

main();