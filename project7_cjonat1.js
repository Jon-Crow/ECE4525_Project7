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
	
	var splitPoints = function(points) 
	{
		split = [];
		for(var i = 0; i < points.length - 1; i++) 
		{
			split.push(new PVector(points[i].x, points[i].y));
			split.push(new PVector((points[i].x + points[i+1].x)/2, (points[i].y + points[i+1].y)/2));
		}  
		split.push(new PVector(points[i].x, points[i].y));
		split.push(new PVector((points[0].x + points[i].x)/2, (points[0].y + points[i].y)/2));
		return split;
	};
	var average = function(split) 
	{
		for (var i = 0; i < split.length - 1; i++) 
		{
			var x = (split[i].x + split[i+1].x)/2;
			var y = (split[i].y + split[i+1].y)/2;
			split[i].set(x, y);
		} 
		var x = (split[i].x + split[0].x)/2;
		var y = (split[i].y + split[0].y)/2;
		points = [];
		for (i = 0; i < split.length; i++)
			points.push(new PVector(split[i].x, split[i].y)); 
		return points;
	};
	var subdivide = function(points)
	{
		split = splitPoints(points);
		return average(split);
	};
	
	var imgs     = [];
	var imgBG    = 0;
	var imgFG    = 1;
	var imgBush1 = 2;
	var imgBush2 = 3;
	
	var initBody1 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 20; i++)
			points.push(new PVector(10+20*i, 100+30*random()));
		for(var i = 0; i < 20; i++)
			points.push(new PVector(390-20*i, 300-30*random()));
		for(var i = 0; i < 5; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(r+20,g+20,b+20);
		for(var i = 0; i < 5; i++)
			ellipse(40+75*i, 180+40*random(), 20+20*random(), 20+20*random());
		return get(0,0,width,height);
	};
	var initBody2 = function(r, g, b)
	{
		background(0,0,0,0);
		points = [new PVector(0,200)];
		for(var i = 0; i < 10; i++)
			points.push(new PVector(50+30*i, 100*random()));
		points.push(new PVector(width, 200));
		for(var i = 9; i >= 0; i--)
			points.push(new PVector(50+30*i, 300+50*random()));
		for(var i = 0; i < 10; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initLeg1 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [new PVector(150,0)];
		for(var i = 0; i < 8; i++)
		{
			points.push(new PVector(100,40+50*i));
			points.push(new PVector(150,20+50*i));
		}
		points.push(new PVector(150,400));
		points.push(new PVector(250,400));
		for(var i = 0; i < 8; i++)
		{
			points.push(new PVector(250,370-50*i));
			points.push(new PVector(300,390-50*i));
		}
		points.push(new PVector(250,0));
		for(var i = 0; i < 3; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initLeg2 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [];
		for(var i = 0; i < 11; i++)
			points.push(new PVector(100+50*random(),i*40));
		for(var i = 10; i >= 0; i--)
			points.push(new PVector(250+50*random(),i*40));
		for(var i = 0; i < 3; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		return get(0,0,width,height);
	};
	var initHead1 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [new PVector(10,  50 ),
		          new PVector(200, 50 ),
				  new PVector(200, 200),
				  new PVector(390, 200),
				  new PVector(390, 350),
				  new PVector(10,  350),];
		for(var i = 0; i < 8; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(220,220,220);
		ellipse(150,150,48,48);
		fill(50,50,255);
		ellipse(158,150,32,32);
		return get(0,0,width,height);
	};
	var initHead2 = function(r,g,b)
	{
		background(0,0,0,0);
		points = [new PVector(10 ,10),
		          new PVector(390,10),
				  new PVector(390,150),
				  new PVector(200,200),
				  new PVector(390,250),
				  new PVector(390,390),
				  new PVector(10 ,390)];
		for(var i = 0; i < 8; i++)
			points = subdivide(points);
		stroke(0,0,0);
		strokeWeight(2);
		fill(r,g,b);
        beginShape();
        for (var i = 0; i < points.length; i++) 
		{
            vertex(points[i].x, points[i].y);   
        }    
        vertex(points[0].x, points[0].y);
        endShape();
		fill(220,220,220);
		ellipse(200,100,48,48);
		fill(50,50,255);
		ellipse(208,100,32,32);
		return get(0,0,width,height);
	};
	var initImages = function()
	{
		imgs[imgBG]    = loadImage("background.png");
		imgs[imgFG]    = loadImage("foreground.png");
		imgs[imgBush1] = loadImage("bush1.png");
		imgs[imgBush2] = loadImage("bush2.png");
	};
	
	initImages();
	
	var Animal = function(x, y, size)
	{
		this.x        = x;
		this.y        = y;
		this.size     = size;
		this.walk     = 0;
		this.change   = 0;
		this.legAngle = 0;
		this.legMove  = 0.25*degToRad;
		this.r        = 200*random();
		this.g        = 200*random();
		this.b        = 200*random();
		if(random() < 0.5)
			this.body = initBody1(this.r,this.g,this.b);
		else
			this.body = initBody2(this.r,this.g,this.b);
		if(random() < 0.5)
			this.head = initHead1(this.r,this.g,this.b);
		else
			this.head = initHead2(this.r,this.g,this.b);
		if(random() < 0.5)
			this.leg  = initLeg1(this.r,this.g,this.b);
		else
			this.leg  = initLeg2(this.r,this.g,this.b);
	};
	Animal.prototype.display = function()
	{
		pushMatrix();
		translate(this.x, this.y);
		if(this.walk < 0)
			scale(-1, 1);
		var left = -this.size/2;
		image(this.body, left, left, this.size, this.size);
		image(this.head, 25, left, -left, -left);
		
		stroke(this.r,this.g,this.b);
		strokeWeight(10);
		noFill();
		bezier(left, 0, left-20, 0, left-20, 20, left-40, 40);
		
		rotate(this.legAngle);
		image(this.leg, left, 10, -left, -left);
		rotate(-this.legAngle*2);
		image(this.leg, 0, 10, -left, -left);
		popMatrix();
	};
	Animal.prototype.update = function()
	{
		if(this.x > 300)
			this.walk = -1;
		else if(this.x < 100)
			this.walk = 1;
		else if(this.change <= 0)
		{
			var r = random();
			if(r < 0.33)
				this.walk = -1;
			else if(r < 0.67)
				this.walk = 0;
			else
				this.walk = 1;
			this.change = 180;
		}
		if(this.walk)
		{
			this.x += this.walk*0.2;
			this.legAngle += this.legMove;
			if(this.legAngle > 10*degToRad)
				this.legMove = -0.25*degToRad;
			else if(this.legAngle < degToRad)
				this.legMove = 0.25*degToRad;
		}
		this.change--;
	};
	
	var Particle = function(x, y, size, life, clr)
	{
		this.size = size;
		this.life = life;
		this.clr  = clr;
		this.pos  = new PVector(x,y);
		this.vel  = new PVector(0,0);
	}
	Particle.prototype.getPos = function() { return this.pos; };
	Particle.prototype.getVel = function() { return this.vel; };
	Particle.prototype.display = function()
	{
		fill(this.clr);
		ellipse(this.pos.x,this.pos.y,this.size,this.size);
	};
	Particle.prototype.update = function()
	{
		this.vel.add(0,0.05);
		this.pos.add(this.vel);
		this.life--;
	};
	Particle.prototype.isDead = function()
	{
		return this.life <= 0;
	};
	
	var ParticleSystem = function()
	{
		this.parts = [];
	};
	ParticleSystem.prototype.display = function()
	{
		for(var i = 0; i < this.parts.length; i++)
			this.parts[i].display();
	};
	ParticleSystem.prototype.update = function()
	{
		for(var i = this.parts.length-1; i >= 0; i--)
		{
			this.parts[i].update();
			if(this.parts[i].isDead())
				this.parts.splice(i,1);
		}
	};
	ParticleSystem.prototype.addParticle = function(part)
	{
		this.parts.push(part);
	};
	
	var MenuGameState = function()
	{
		this.animals = [new Animal(250, 200, 92),
		                new Animal(200, 250, 110),
		                new Animal(150, 300, 128)];
		this.wfEdgeW     = 12;
		this.wfEdgeWMove = -0.5;
		this.wfLine      = [0,0,0];
		this.wfLineMove  = [0.25,0.5,0.75];
		this.parts       = new ParticleSystem();
		this.nextPart    = 0;
	};
	MenuGameState.prototype.display = function()
	{
		image(imgs[imgBG],0,0,400,200);	
		noStroke();
		
		fill(75,75,255);
		rect(162,15,75,200);
		
		fill(200,200,255);
		ellipse(162,208,this.wfEdgeW,385);
		ellipse(237,208,this.wfEdgeW,385);
		
		noFill();
		stroke(200,200,255);
		strokeWeight(2);
		bezier(200,15,
		       200+this.wfLine[2],75,
			   200-this.wfLine[2],150,
			   200,200);
		bezier(180,15,
		       180-this.wfLine[1],50,
			   180+this.wfLine[1],175,
			   180,200);
		bezier(220,15,
		       220-this.wfLine[0],75,
			   220+this.wfLine[0],150,
			   220,200);
		
		noStroke();
		fill(200,200,255,175);
		ellipse(200,200,125,75-this.wfEdgeW*3);
		
		this.parts.display();
		
		image(imgs[imgFG],0,200,400,200);
		image(imgs[imgBush1],0,100);
		image(imgs[imgBush2],272,100);
		
		for(var i = 0; i < this.animals.length; i++)
			this.animals[i].display();
	};
	MenuGameState.prototype.update = function()
	{
		this.wfEdgeW += this.wfEdgeWMove;
		if(this.wfEdgeW > 15)
			this.wfEdgeWMove = -0.5;
		else if(this.wfEdgeW < 10)
			this.wfEdgeWMove = 0.5;
		
		for(var i = 0; i < this.wfLine.length; i++)
		{
			this.wfLine[i] += this.wfLineMove[i];
			if(this.wfLine[i] > 10)
				this.wfLineMove[i] = -0.5*(i+1);
			else if(this.wfLine[i] < -10)
				this.wfLineMove[i] = 0.5*(i+1);
		}
		
		for(var i = 0; i < this.animals.length; i++)
			this.animals[i].update();
		
		this.parts.update();
		if(this.nextPart <= 0)
		{
			for(var i = 0; i < 3; i++)
			{
				var part = new Particle(162+75*random(),200,6,60,color(200,200,255,100));
				part.getVel().set(-1+2*random(),-2);
				part.getVel().normalize();
				part.getVel().mult(0.75);
				this.parts.addParticle(part);
			}
			this.nextPart = 3;
		}
		this.nextPart--;
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