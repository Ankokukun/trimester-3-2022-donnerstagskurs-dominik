var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var WINDOW_WIDTH = canvas.width;
var WINDOW_HEIGHT = canvas.height;

const gravity = 1;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }





//  Drawable  -------------------------------------------------------------------

class Drawable
{
    constructor(dX, dY, dW, dH, dC) {
        this.dX = dX;
        this.dY = dY;
        this.dW = dW;
        this.dH = dH;
        this.dC = dC;
        this.dV = {
            x:0,
            y:0
        }
        
    }
  
    draw() 
    {
        ctx.beginPath();
        ctx.rect(this.dX, this.dY, this.dW, this.dH);
        ctx.fillStyle = this.dC;
        ctx.fill();
        ctx.closePath();
    }

    delete()
    {
        ctx.clearRect(0,0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }
  }

//  Player  -------------------------------------------------------------------
class Player extends Drawable
{   
    
    update()
    {
        this.delete();
        this.dX += this.dV.x;
        this.dY += this.dV.y;
        this.dV.y += gravity;
        this.draw();

        if(keys.right.pressed)
        {
            this.dV.x = 3;
        }
        else if(keys.left.pressed)
        {
            this.dV.x = -3;
        } 
        else if(keys.up.pressed)
        {
            
        }else this.dV.x = 0;

        //Kollision mit block, auf y-Achse
        collisionY(block);
        collisionY(block2);
        collisionY(block3)

    }
}

const player = new Player(50, 150, 25, 50, "#FF0000");

//  Gegner  -------------------------------------------------------------------

class Gegner extends Drawable
{

}

//  Block  -------------------------------------------------------------------

class Block extends Drawable
{
    update()
    {
        this.delete();
        this.dX += -0.001;
        this.dY += this.dV.y;
        this.draw();
    }
}
const block = new Block(10, 250, 300, 50, "#999999");

//Random werte müssen bei jeder Iteration der blockList neu gesetzt werden (abhängig von der X und Y position des vorherigen blocks)
function randomBlock() 
{

    rX = this.getRandomInt(350, 420);
    rY = this.getRandomInt(130, 400);
    rW = this.getRandomInt(70, 300);
    rH = this.getRandomInt(10, 50);

    new Block(rX, rY, rW, rH, "#999999");

}
        


const block2 = randomBlock();
const block3 = new Block(rX+block2.dX/2, rY+block2.dY/2, rW, rH, "#999999");
//const block2 = new Block(230, 200, 300, 50, "#999999");
  
/*
const blockList = [4];

for (let i = 0; i < blockList.length; i++) {
    if(i=0)
    {    
        rX = this.getRandomInt(350, 420);
        rY = this.getRandomInt(130, 400);
        rW = this.getRandomInt(70, 300);
        rH = this.getRandomInt(10, 50);
    }
    else
    {
        rX = this.getRandomInt(350 + blockList[i-1].dX, 420 + blockList[i-1].dX);
        rY = this.getRandomInt(130 + blockList[i-1].dY, 400 + blockList[i-1].dY);
        rW = this.getRandomInt(70, 300);
        rH = this.getRandomInt(10, 50);
    }
    blockList[i] = new Block(rX,rY,rW,rH,'#999999')
}
*/

// new Block(rX,rY,rW,rH,'#999999'), new Block(rX,rY,rW,rH,'#999999'), new Block(rX,rY,rW,rH,'#999999'), new Block(rX,rY,rW,rH,'#999999'), new Block(rX,rY,rW,rH,'#999999'), new Block(rX,rY,rW,rH,'#999999')



// EventHandler  -------------------------------------------------------------------

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}

window.addEventListener('keydown', (event) =>
        {
            if (event.key === 'd')
            {
                keys.right.pressed = true;
            }
            if(event.key === 'a')
            {
                keys.left.pressed = true;
            }
            if(event.code === 'Space' || event.key === 'w')
            {
                if(player.dV.y == 0) 
                {
                    player.dV.y = -20;
                }
            }
        });

window.addEventListener('keyup', (event) =>
        {
            if (event.key === 'd')
            {
                keys.right.pressed = false;
            }
            if(event.key === 'a')
            {
                keys.left.pressed = false;
            }
            if(event.code === 'Space')
            {
                keys.up.pressed = false;
                player.dV.y = 0;
            }
        });

//  Kollision  -------------------------------------------------------------------




function collision(Block)
{
    if
    (
        player.dX + player.dW >= Block.dX &&
        player.dX <= Block.dX + Block.dW &&
        player.dY + player.dH >= Block.dY &&
        player.dY <= Block.dY + Block.dH
    )
    return true;
}

function collisionY(Block)
{
    if(player.dY + player.dH <= Block.dY && player.dY + player.dH + player.dV.y >= Block.dY && player.dX + player.dW >= Block.dX && player.dX <= Block.dX + Block.dW)
    {
        player.dV.y = 0;
    }
}
//  WallCheck ----------------------------------------------

function wallCheck()
{
    
    if(player.dX + player.dW>= WINDOW_WIDTH)    //Rechts
    {
       player.dX = WINDOW_WIDTH - player.dW;
    }
    if(player.dX <= 0) //kann später durch -30 oder ähnliches ersetzt werden und bounce kann auch auf -2 oder so gesetzt werden.
    {
        player.dX = 0;
    }
    if(player.dY + player.dH>= WINDOW_HEIGHT)   //Unten
    {
        //Sterben / Respawnen
        player.dX = 0;
        player.dY = 0;

        //player.life -=;
    }
    if(player.dY <= 0)                        //Oben
    {
        
    }
    //  BlockCheck ----------------------------------------------

    
    
}

//update function: -------------------------------------------------------------------

var stop = false;
var frameCount = 0;
var $results = ("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

// initialize the timer variables and start the animation

function startAnimating(fps) 
{
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    this.animate();
}


function animate()
{
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval)
    {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        block.update();
        block2.update();
        block3.update();

        player.update();
        block.draw();
        block2.draw();
        block3.draw();
        this.collision(block);
        this.collision(block2);
        this.collision(block3);
        this.wallCheck();
    }
}









//Platz für TKR Lösungen: -------------------------------------------------------------------







//Intervale etc. --------------------------------------------------------------------

this.startAnimating(244);

//TO DO und Notizen:   -------------------------------------------------------------------

/* TODO

Most important:

    randomBlock class extends Block

    Kollision mit allen Elementen der blockList nacheinander(iterativ) überprüfen

    10. Block/Player Collision überarbeiten.     in animation bei bewegungsabfrage bedingugen hinzufügen.

    Blöcke in Liste speichern, später noch verschiedene Typen von Blöcken hinzufügen. Liste mit List.js????     --> mt Array ist einfacher in js


    Sidescroll beginns when Player collides with second block



implement doublejumps 








x. Soweit kommen, dass ihr mit dem Canvas zufrieden seid.
x. Was drauf malen Rechteck
x. Das Rechteck bewegen 
x. Kollision entdecken um z.B. nicht aus dem Rand zu fliegen.
x. Kollision mit Boden  und eventuellen Hindernissen.
x. Kollision mit Boden  und eventuellen Hindernissen verbessern.
x. Klasse "drawable" vererbt die Klassen "Player","Block" und "Gegener".
x. Jedes setInterval zu einem einzigen kombinieren: Function "Update" mit allen draw-, kollision-, und bewegungsfunktionen drin.
x. Beim Player mit Gravity bzw. Velocity arbeiten
x. Beim Input auch mit keyUp arbeiten
x. Random Position und größe bei Blöcken mit Math.random() in bestimmten Intervalen einstellen   Bei Position auf Höhe achten.
x. Get in FPS --> bind FPS to Time


*/






//Graveyard -------------------------------------------------------------------



/*
var abstand;
var xAbstand;
var yAbstand;

function KollisionsberechnungSchlecht()
{
    //console.log(Math.sqrt(((((playerX)-(blockX))*((playerX)-(blockX)))+(((playerY)-(blockY))*((playerY)-(blockY))))));
    abstand = Math.sqrt(((((playerX)-(blockX))*((playerX)-(blockX)))+(((playerY)-(blockY))*((playerY)-(blockY)))));
}

function KollisionsberechnungGetrennt()
{
    yAbstand = Math.sqrt((player.drawableY-block.drawableY)*(player.drawableY-block.drawableY))
    xAbstand = Math.sqrt((player.drawableX-block.drawableX)*(player.drawableX-block.drawableX))
}


    /*
    if(player.drawableX > block.drawableX && player.drawableX + player.drawableW < block.drawableX + block.drawableW)
    {
        if(player.drawableY + player.drawableH > block.drawableY && player.drawableY + player.drawableH < )
        {

        }
    }
    */
    /*  Fehler Haft, wegen PlayerX <= BlockX


    if((playerY + playerH) > blockY && (playerY + playerH) < (blockY + blockH) && (playerX + playerW) <= blockX || playerY > blockY && playerY < (blockY + blockH) && (playerX + playerW) <= blockX)
    {
        bewegeNachLinks();
    }

    */
   /*
    if((player.drawableY + player.drawableH) > block.drawableY && (player.drawableY + player.drawableH) < (block.drawableY + block.drawableH) && player.drawableX <= (block.drawableX + block.drawableW) || player.drawableY > block.drawableY && player.drawableY < (block.drawableY + block.drawableH) && player.drawableX <= (blockX + block.drawableW))
    {
        if(!((player.drawableX + player.drawableW) < block.drawableX))
        {
            player.bewegeNachRechts();
        }
        
    }
    */

        /*

    springen()
    {
        if (yAbstand <= 2500 && xAbstand<= 22500) 
        {
            this.delete();
            this.drawableY -= 100;
            this.draw();
        }
        
    }

    fallen()
    {
        if(yAbstand > player.drawableH || xAbstand >= block.drawableX || player.drawableX + player.drawableW < block.drawableX)  //hinterer Teil ergibt wenig Sinn.
        {
            this.delete();
            this.drawableY += 5;
            this.draw();
        }
    }



    function collision()
    {
        if
        (
            player.dX + player.dW >= block.dX &&
            player.dX <= block.dX + block.dW &&
            player.dY + player.dH >= block.dY &&
            player.dY <= block.dY + block.dH
        )
        return true;
    }





    */




