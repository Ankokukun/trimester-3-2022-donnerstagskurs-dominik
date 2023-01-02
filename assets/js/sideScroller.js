var config = {
    width: 1024,
    height: 768,
    backgroundColor: 0x000000,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: {x:-10},
            debug: true
        }
    }
}

var game = new Phaser.Game(config);

var player;
var platforms = [];

const minPlatformSize = 150;
const maxPlatformSize = 250;

const minXDifference = 100;
const maxXDifference = 200;
const maxYDifference = 100;



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
function preload()
{
    //load sprites for player, and platforms
}

function create()
{
    player = this.add.rectangle(50, 150, 25, 50, 0xff0000);
    this.physics.add.existing(player,false);

    player.body.setGravityY(500);
    player.body.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;

    let platform1 = this.add.rectangle(10,250, 300, 30, 0x999999);
    platformSetup(platform1, this.physics);
    for (let i = 0; i<10; i++)
    {
        let platform = this.add.rectangle(0,0,0,50,0x999999);
        platformSetup(platform, this.physics);
    }

    this.physics.world.on('worldbounds', function(body, up, down, left, right)
    {
      if(down)
      {
        reset();
        //console.log('hit the ground!')
      }
      if(body, up, left, right)
      {
        
      }
    });

    reset();
}

function update()
{
    let wasd = this.input.keyboard.addKeys('W,A,S,D');
    let escape = this.input.keyboard.addKey(27);

    if (wasd.W.isDown && player.body.touching.down)
    {
        player.body.setVelocityY(-350);
    }

    if(wasd.A.isDown)
    {
        player.body.setVelocityX(-300);
    }
    else if(wasd.D.isDown)
    {
        player.body.setVelocityX(300);
    }
    else player.body.setVelocityX(0);

    if (escape.isDown)
    {
        if(this.scene.isPaused())
        {
            game.scene.resume("default")
            console.log("game resumed")
        }
        else {console.log("game is paused")
        //game.scene.pause("default");
        this.scene.pause();};
        
    }

    let platform1 = platforms.at(0);
    if((platform1.x + platform1.width < 0))
    {
        platforms.shift();
        setPlatformToValidPosition(platform1, platforms.at(-1));
        platforms.push(platform1);
    }

}


// random platforms......................................

function platformSetup(pPlatform, physics)
{
    physics.add.existing(pPlatform,false);
    physics.add.collider(player, pPlatform);
    pPlatform.body.setImmovable(true);
    platforms.push(pPlatform);
    //pPlatform.body.setGravityX(-10);
}

function setPlatformToValidPosition(currentPlatform, prevPlatform)
{
    let width = getRandomInt(minPlatformSize,maxPlatformSize);
    let posX = prevPlatform.x + prevPlatform.width + getRandomInt(minXDifference,maxXDifference);
    let posY = prevPlatform.y + getRandomInt(-maxYDifference, maxYDifference);
    if (posY<120) posY = 120;
    else if (posY > 718) posY = 718;

    currentPlatform.setPosition(posX, posY);
    currentPlatform.width = width;
    currentPlatform.body.setSize(width, currentPlatform.height);
}

function reset()
{
    player.setPosition(50, 150);
    let platform;
    let platform1 = platforms.at(0);
    platform1.setPosition(10,250);
    platform1.width =512 + 150;
    platform1.body.setSize(platform1.width, platform1.height);
    let prevPlatform = platform1;
    for(let i = 1; i<11;i++)
    {
        platform = platforms.at(i);
        setPlatformToValidPosition(platform,prevPlatform);
        prevPlatform = platform;
    }
}