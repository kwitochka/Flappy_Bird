const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

//sat main variables
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

const bX = 20;
let bY = 150;
const gravity = 1;

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

 let score = 0;

 //Add audio

 const fly = new Audio();
 const scor = new Audio();

 fly.src = "sounds/fly.mp3";//Bg music
 scor.src = "sounds/score.mp3";//When score++


function draw (){


    //Если определено вне функции, просчитуется только gap
    const gap = 85;
    let constant = pipeNorth.height + gap;
    //draw images

    ctx.drawImage(bg,0,0);


    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        // console.log(pipeNorth.x + pipeNorth.y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 130){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height)-pipeNorth.height
            });
        }

        //detect collision
        if(bX+bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <=pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height-fg.height){
            location.reload(); //reloads the page
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
    }

     ctx.drawImage(fg, 0, cvs.height - fg.height);
     ctx.drawImage(bird, bX, bY);
     bY += gravity;
    

     ctx.fillStyle = "#000";
     ctx.font = "20px Verdana";
     ctx.fillText("Score: " + score, 10, cvs.height-20);

    requestAnimationFrame(draw);
}
const moveUp = () => {
    bY -= 25;
    fly.play();
}
cvs.addEventListener('click', moveUp);



draw();