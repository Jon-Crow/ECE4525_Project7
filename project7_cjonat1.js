var sketchProc = function(processingInstance) 
{
 with (processingInstance) 
 {
	/*
	*/
	//Author:          Jonathan Crow
	//PID:             cjonat1
	//Completion Date: 09/27/2019
	//Assignment:      Project 4
	frameRate(60);
	size(400,400);
	
	/*-------------------------
	Degree to radian conversion
	constants
	-------------------------*/
	var deg0     = 0;
	var deg90    = Math.PI/2;
	var deg180   = Math.PI;
	var deg270   = 3*Math.PI/2;
	var deg360   = 2*Math.PI;
	var degToRad = Math.PI/180;
	
	var keyArray = [];
	
	var keyPressed = function() 
	{
		keyArray[keyCode] = 1;
	};
	var keyReleased = function() 
	{
		keyArray[keyCode] = 0;
	};
	var mouseReleased = function()
	{
		gameState.clickEvent(mouseX, mouseY);
	};
	
	var imgs      = [];
	var imgWall   = 0;
	var imgGround = 1;
	var imgPlayer = 2;
	
	var initImages = function()
	{
		imgs[imgWall]   = loadImage("img/wall.png");
		imgs[imgGround] = loadImage("img/ground.png");
		imgs[imgPlayer] = loadImage("img/player.png");
	};
	
	initImages();
	
	var tileMap = [
	"wwwwwwwwwwwwwwwwwwww",
	"w                  w",
	"wwwwwwww     wwwwwww",
	"w                  w",
	"w  wwwwwwwwwwwwww  w",
	"w                  w",
	"w wwwww wwwww wwww w",
	"w w              w w",
	"w w              w w",
	"w w   wwwwwwww   w w",
	"w w   wwwwwwww   w w",
	"w w              w w",
	"w w              w w",
	"w wwwwww     wwwww w",
	"w                  w",
	"w  wwwwwwwwwwwwww  w",
	"w                  w",
	"wwwwwww wwwww wwwwww",
	"w                  w",
	"wwwwwwwwwwwwwwwwwwww"
	];
	
	//HALF PAGE RESPONSE ON OPHELIAS DEATH!
	
	var TileMap = function(tileMap)
	{
		this.imgs = [];
		this.vecs = [];
		for(var y = 0; y < tileMap.length; y++)
		{
			var row = [];
			for(var x = 0; x < tileMap[y].length; x++)
			{
				if(tileMap[y][x] == "w")
					row.push(imgWall);
				else if(tileMap[y][x] == " ")
					row.push(imgGround);
				else
					console.log("ERROR LOADING TILEMAP: Unknown tile: " + tileMap[y][x]);
			}
			this.imgs.push(row);
		}
		for(var y = 0; y < this.imgs.length; y++)
		{
			var vecRow = [];
			for(var x = 0; x < this.imgs[y].length; x++)
			{
				var vecCon = [];
				if(this.imgs[y][x] === imgGround)
				{
					if(y > 0 && this.imgs[y-1][x] === imgGround)
						vecCon.push(new PVector(x*20+10,(y-1)*20+10));
					if(y < this.imgs.length-1 && this.imgs[y+1][x] === imgGround)
						vecCon.push(new PVector(x*20+10,(y+1)*20+10));
					if(x > 0 && this.imgs[y][x-1] === imgGround)
						vecCon.push(new PVector((x-1)*20+10,y*20+10));
					if(x < this.imgs[y].length-1 && this.imgs[y][x+1] === imgGround)
						vecCon.push(new PVector((x+1)*20+10,y*20+10));
				}
				vecRow.push(vecCon);
			}
			this.vecs.push(vecRow);
		}
	};
	TileMap.prototype.display = function()
	{
		for(var y = 0; y < this.imgs.length; y++)
			for(var x = 0; x < this.imgs[y].length; x++)
				image(imgs[this.imgs[y][x]],x*20,y*20);
		
		stroke(0,0,0);
		for(var y = 0; y < this.vecs.length; y++)
			for(var x = 0; x < this.vecs[y].length; x++)
				for(var z = 0; z < this.vecs[y][x].length; z++)
					line(x*20+10,y*20+10,this.vecs[y][x][z].x,this.vecs[y][x][z].y);
		noStroke();
		
	};
	
	var PathNode = function()
	{
		
	};
	
	var Player = function(x, y)
	{
		this.pos = new PVector(x, y);
	};
	Player.prototype.display = function()
	{
		image(imgs[imgPlayer],this.pos.x-10,this.pos.y-10,20,20);
	};
	Player.prototype.update = function()
	{};
	
	var MenuGameState = function()
	{
		this.tileMap = new TileMap(tileMap);
		this.plyr    = new Player(30,30);
	};
	MenuGameState.prototype.display = function()
	{
		background(255,0,0);
		this.tileMap.display();
		this.plyr.display();
	};
	MenuGameState.prototype.update = function()
	{
		this.plyr.update();
	};
	MenuGameState.prototype.getNextState = function()
	{
		return this;
	};
	MenuGameState.prototype.clickEvent = function(x, y)
	{};
	
	var gameState = new MenuGameState();
	
	var showFPS  = 1;
	var lastTime = 0;
	
	draw = function() 
	{
		gameState.update();
		gameState.display();
		gameState = gameState.getNextState();
		
		//calculates fps
		var time = millis();
		var fps = 1000/(time-lastTime);
		lastTime = time;
		
		fill(0,0,0);
		if(showFPS)
		{
			textSize(10);
			text("FPS: " + fps.toFixed(2), width-50, height-10);
			if(fps < 50)
				console.log("fps dropped to: " + fps);
		}
	};
}};