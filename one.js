console.log("hello");
var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');
var width = 800;
var height =600;
canvas.width = width;
canvas.height = height;

var mouseDown = false;

var  move = false;
var circle = false;
var rectangle = true;
var star = false;

var objectSet = [];
var toolSet = [];
var colors = [ 	["rgb(255,90,90)", "rgb(5,0,90)", "rgb(255,0,90)" ],
				["rgb(200,190,190)", "rgb(75,0,90)", "rgb(255,0,90)" ],
			  	["rgb(155,90,90)", "rgb(50,200,180)", "rgb(25,200,90)" ]	]


var xMouseStart = 0;
var yMouseStart = 0;
var xMouseEnd = 0;
var yMouseEnd = 0;

canvas.addEventListener("mousedown", function(e){

	var xMouse= e.offsetX;
	var yMouse=e.offsetY;
	xMouseStart = xMouse;
	yMouseStart = yMouse;
	
	mouseDown = true;
	if(mouseDown){
			
		if(circle){
				objectSet.push(new Circle(xMouse,yMouse, 60, "rgba(255,0,255,0.6)"));
				}
	
	}	
	
});

canvas.addEventListener("mouseup", function(e){
	
	if(rectangle){
		r_width = xMouseEnd - xMouseStart;
		r_height = yMouseEnd - yMouseStart;
		objectSet.push(new Rectangle(xMouseStart, yMouseStart, r_width, r_height));
		
	}

	mouseDown = false;	
	
});


canvas.addEventListener("mousemove", function(e){
	
	var xMouse= e.offsetX;
	var yMouse=e.offsetY;
	xMouseEnd = xMouse;
	yMouseEnd = yMouse;
	//var my_string = "Mouse position is: x="+xMouse+" y="+yMouse;
	//console.log(my_string);


	
});

function colorBox(){
	
	
}

class Circle{
	constructor(x,y,r, col){
		this.x = x;
		this.y = y;
		this.r = r;
		this.R = r
		this.col = col;
		this.count=0;
	}
	
	update(){
		this.count+=1;
		this.draw();
		this.r = this.R*Math.abs(Math.cos(0.01*this.count));
	}
	
	draw(){
		c.fillStyle = this.col;
		c.beginPath()
		c.arc(this.x,this.y, this.r,0,2*Math.PI);
		c.fill();
	}
	
}

class Rectangle{
	constructor(x,y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	update(){
		this.draw();
		
	}
	
	draw(){
		c.fillStyle="rgba(0,0,255,0.6)";
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fill();
	}
	
	
}

class Tool{
	constructor(x,y,width,height, name){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.name = name;
		this.colOver = "rgba(0,255,255,0.6)";
		this.colOut = "rgba(0,0,255,0.6)";
		this.colSelected = "rgba(255,0,0,0.8)";
		this.col = this.colOut;
		this.toolmouseOver = false;
		this.selected = false;
		this.tools = [];
		
	}
	
	update(xMouse,yMouse, mouseDown){
		
		if( xMouse > this.x &&  
		  	xMouse < this.x+this.width &&
		  	yMouse > this.y &&
		  	yMouse< this.y+this.height){
			
			if(this.selected == false){	
				this.col = this.colOver;
				this.toolmouseOver = true;
			}
			

			if(mouseDown){
				this.selected = true;
				this.col = this.colSelected;
				rectangle = false;
				for(i = 0; i<this.tools.length ; i++){
					if(this.tools[i] != this){
						this.tools[i].setSelected();
					}
					
					
				}

			}
			
		}
		else{
			
			if(this.selected == false){
			
			this.col = this.colOut;
			this.toolmouseOver = false;
				
			}
		}
		
		this.draw();
		this.text();
		
	}
	
	draw(){
		c.fillStyle = this.col;
		c.strokeStyle = "rgba(0,0,0,1)";
		c.lineWidth = "3px";
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fill();
		c.stroke();
	}
	
	text(){
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.fillStyle = "#ffffff";
		c.font = "28px Arial";
		c.fillText(this.name,this.x +this.width/2,this.y+this.height/2); 
	}
	
	setArray(A){
		this.tools = A;
		
	}
	
	setSelected(){
		this.selected = false; 
		
	}
	
	getSelected(){
		return this.selected ;
	}
	
}

toolSet.push(new Tool(width - 153,3,150,50, "move"));
toolSet.push(new Tool(width - 153,59,150,50, "circle"));
toolSet.push(new Tool(width - 153,115,150,50, "rectangle"));
toolSet.push(new Tool(width - 153,171,150,50, "star"));

for(i = 0 ; i< toolSet.length ; i++){
	toolSet[i].setArray(toolSet);
	
}





function animate(){
	c.clearRect(0,0, width, height);
	
	for(i = 0 ; i<colors.length ; i++){
	for(k = 0; k<colors[i].length; k++){
		c.fillStyle= colors[i][k];
		c.beginPath();
		c.rect(680 + k*40, 400+i*40, 40,40);
		c.fill();	
	}
}
	
	
	if(mouseDown && rectangle){
		c.strokeStyle= "rgba(0,0,255,0.6)";
		c.beginPath();
		c.moveTo(xMouseStart,yMouseStart);
		c.lineTo(xMouseEnd, yMouseStart);
		c.lineTo(xMouseEnd, yMouseEnd);
		c.lineTo(xMouseStart, yMouseEnd);
		c.closePath();
		c.stroke();	
	}
	
	for(i = 0 ; i<objectSet.length ; i++){
		objectSet[i].update();
	}
	for(k = 0 ; k<toolSet.length ; k++ ){
		toolSet[k].update(xMouseEnd, yMouseEnd, mouseDown);
		
	}
	requestAnimationFrame(animate);
	
}
animate();