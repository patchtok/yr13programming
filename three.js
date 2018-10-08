console.log("hello");
var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');
var width = 800;
var height =600;
canvas.width = width;
canvas.height = height;
var drawX = 20;
var drawY = 20;
var drawWidth = 600;
var drawHeight = 500;






var  move = false;
var circle = false;
var rectangle = true;
var star = false;
// an array only stores the value of a variable
var booleanSet = [move, circle, rectangle, star];


var my_color = "rgb(0,0,0)"



var objectSet = [];
var toolSet = [];
var swatchSet = [];



var xMouseStart = 0;
var yMouseStart = 0;
var xMouseNow = 0;
var yMouseNow = 0;

var mouseDown = false;
var draw = false;

canvas.addEventListener("mousedown", function(e){

	var xMouse= e.offsetX;
	var yMouse=e.offsetY;
	xMouseStart = xMouse;
	yMouseStart = yMouse;
	
	mouseDown = true;
	if(mouseDown){
			
		if(circle && draw){
				objectSet.push(new Circle(xMouse,yMouse, 60, "rgba(255,0,255,0.6)"));
				}
	
	}	
	
});

canvas.addEventListener("mouseup", function(e){
	
	if(rectangle && draw){
		r_width = xMouseNow - xMouseStart;
		r_height = yMouseNow - yMouseStart;
		objectSet.push(new Rectangle(xMouseStart, yMouseStart, r_width, r_height, my_color));
		
	}

	mouseDown = false;	
	
});


canvas.addEventListener("mousemove", function(e){
	
	var xMouse = e.offsetX;
	var yMouse = e.offsetY;
	xMouseNow = xMouse;
	yMouseNow = yMouse;
	if(xMouse > drawX &&
	  xMouse < drawX + drawWidth &&
	  yMouse > drawY &&
	  yMouse < drawY + drawHeight){
		draw = true;
	}else{
		draw = false;}
	//console.log(draw);
	
	//var my_string = "Mouse position is: x="+xMouse+" y="+yMouse;
	//console.log(my_string);


	
});


// swatch object
class Swatch{
	constructor(x,y, col){
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.col = col;
	}
	
	update(){
		this.draw();
		
	}
	
	draw(){
		c.fillStyle = this.col;
		c.strokeStyle = "rgb(255,0,255)";
		c.lineWidth = 5;
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fill();
		if(xMouseNow > this.x &&
		  xMouseNow < this.x+this.width &&
		  yMouseNow > this.y &&
		  yMouseNow <this.y+ this.height){
			c.stroke();
			if(mouseDown){
				my_color = this.col;
				
			}
		}
		
	}
	
}
// initialise swatches
swatchSet.push(new Swatch(650, 400,"rgb(255,0,90)"));
swatchSet.push(new Swatch(650, 450,"rgb(25,200,90)"));
swatchSet.push(new Swatch(650, 500,"rgb(75,0,90)"));
// -----------------------------

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
	constructor(x,y, width, height, col){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.col = col
	}
	
	update(){
		this.draw();
		
	}
	
	draw(){
		c.fillStyle=this.col;
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fill();
	}
	
	
}
// start tools object --------------------------------------
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
	
	update(){
		
		if( xMouseNow > this.x &&  
		  	xMouseNow < this.x+this.width &&
		  	yMouseNow > this.y &&
		  	yMouseNow< this.y+this.height){
			
					if(this.selected == false){	
						this.col = this.colOver;
						this.toolmouseOver = true;
					}
			

					if(mouseDown){
						this.selected = true;
						this.col = this.colSelected;
						move = false;
						circle = false;
						rectangle = false;
						star = false;
						console.log(booleanSet);
						// switch
						if(this.name == "move"){
							move = true;
						}
						else if(this.name == "circle"){
							circle = true;
						}
						else if(this.name == "rectangle"){
							rectangle = true;
						}
						else if(this.name == "star"){
							star = true;
						}
						else{
							console.log("error in tool assignment");
						}
				

						for(i = 0; i<this.tools.length ; i++){
							if(this.tools[i] != this){
								this.tools[i].setUnSelected();
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
		c.lineWidth = 5;
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
	
	setUnSelected(){
		this.selected = false; 
		
	}
	
	getSelected(){
		return this.selected ;
	}
	
}
// - end tools object --------------------------------------------------------

toolSet.push(new Tool(width - 153,3,150,50, "move"));
toolSet.push(new Tool(width - 153,59,150,50, "circle"));
toolSet.push(new Tool(width - 153,115,150,50, "rectangle"));
toolSet.push(new Tool(width - 153,171,150,50, "star"));
toolSet.push(new Tool(width - 153,227,150,50, "delete"));

for(i = 0 ; i< toolSet.length ; i++){
	toolSet[i].setArray(toolSet);
	
}





function animate(){
	c.clearRect(0,0, width, height);
	c.fillStyle = "rgba(230,230,230,1)";
	c.beginPath();
	c.rect(drawX,drawY, drawWidth, drawHeight);
	c.fill();
	
	

	
	
	// object updates
	for(j = 0 ; j<swatchSet.length; j++){
		swatchSet[j].update();	
	}
	for(i = 0 ; i<objectSet.length ; i++){
		objectSet[i].update();
	}
	for(k = 0 ; k<toolSet.length ; k++ ){
		toolSet[k].update();	
	}
	//-------------- temporaries
		if(mouseDown && rectangle && draw){
		c.strokeStyle= "rgba(0,0,255,0.6)";
		c.lineWidth = 1;
		c.beginPath();
		c.moveTo(xMouseStart,yMouseStart);
		c.lineTo(xMouseNow, yMouseStart);
		c.lineTo(xMouseNow, yMouseNow);
		c.lineTo(xMouseStart, yMouseNow);
		c.closePath();
		c.stroke();	
	}
	//----------------------------
	
	
	requestAnimationFrame(animate);
	
}
animate();