

function init(){
    canvas = document.getElementById("mycanvas");
    canvas.height = 730;
    canvas.width = 942;
    pen = canvas.getContext('2d');
    W = 942;
    H = 730; 
    cs = 66;
    Food = getfood();
    Food.color = "blue";
    gameover = false;
    food_img = new Image();
    food_img.src = "apple.png";
    score =0;
    score_img = new Image();
    score_img.src= "trophy.png";

    snake = {
       init_len : 5,
       color : "#6f0000",
       cells : [],
       direction : "Right",

       CreateSnake:function(){
           for(let i=this.init_len;i>0;i--){
              this.cells.push({x:i,y:0});
           }
       },

       drawsnake:function(){
          for(let i=0;i<this.cells.length;i++){
              pen.fillStyle = this.color,
              pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
          }
       },

       updatesnake:function(){
        
        
            
            var newheadx = this.cells[0].x;
            var newheady = this.cells[0].y;
            if(newheadx==Food.x && newheady==Food.y){
                Food = getfood();
                score++;
            }
            else{
                this.cells.pop();
            }
            if(this.direction=="up"){
                this.cells.unshift({x:newheadx,y:newheady-1});
            }
            else if(this.direction=="left"){
                this.cells.unshift({x:newheadx-1,y:newheady});
            }
            else if(this.direction=="down"){
                this.cells.unshift({x:newheadx,y:newheady+1});
            }else{
                this.cells.unshift({x:newheadx+1,y:newheady});
            }

            const lastx = Math.round(W/cs);
            const lasty = Math.round(H/cs);
            const temp = this.cells[0];
            if(temp.x<0 || temp.y<0 ||temp.x>lastx||temp.y>lasty){
                gameover = true;
            }
       },
    };
    snake.CreateSnake();
     
    function key_press(e){
        if(e.key=="ArrowRight"){
            snake.direction = "right";
        }else if(e.key=="ArrowLeft"){
            snake.direction = "left";
        }else if(e.key=="ArrowDown"){
            snake.direction = "down";
        }else{
            snake.direction = "up";
        }
    }

    document.addEventListener('keydown',key_press);
}

function draw(){
   pen.clearRect(0,0,W,H);  
   snake.drawsnake();
   //pen.fillStyle = "blue";
   pen.drawImage(food_img,Food.x*cs,Food.y*cs,cs,cs);

   pen.drawImage(score_img,18,20,cs,cs);
   pen.fillStyle = "black";
   pen.font = "20px Roboto";
   pen.fillText(score,45,45);
}

function update(){ 
   snake.updatesnake();
}

function getfood(){
    var foodx = Math.round(Math.random()*(W-cs)/cs);
    var foody = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:foodx,
        y:foody,
        color:"red",
    };
    return food;
}

function gameloop(){
    if(gameover==true){
        clearInterval(f);
        alert("The game is over");
        return;
    }
    draw();
    update();
}

const f = setInterval(gameloop,100);

init();