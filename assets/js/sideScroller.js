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
        /*
        arcade: {
            gravity: {x:-10},
            debug: false      
        }
        */
    }
}

var game = new Phaser.Game(config);

var player;

var platform1, platform2, platform3, platform4, platform5;
var platforms = [{platform1},{platform2},{platform3},{platform4},{platform5}];

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
    platform1 = this.add.rectangle(10,250, 300, 30, 0x999999);
    this.physics.add.existing(player,false);
    this.physics.add.existing(platform1,false);

    player.body.setGravityY(500);
    player.body.setCollideWorldBounds(true);

    platform1.body.setImmovable(true);
    //platform1.body.setGravityX(-10);

    this.physics.add.collider(player, platform1);

    platformSetup(platform2, this.physics, this.add);
    platformSetup(platform3, this.physics, this.add);
    //platformSetup(platform4, this.physics, this.add);
    //platformSetup(platform5, this.physics, this.add);
    

    this.physics.world.on('worldbounds', function(down)
    {
      if(down)
      {
        player.setPosition(50 ,150);
      }
    });
}

function collisionHandler()
{

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

}


// random platforms......................................

function platformSetup(pPlatform, physics, add)
{

    var rX = getRandomInt(350, 420);
    var rY = getRandomInt(130, 400);
    var rW = getRandomInt(70, 300);
    var rH = getRandomInt(10, 50);

    pPlatform = add.rectangle(rX, rY, rW, rH, 0x999999);
    physics.add.existing(pPlatform,false);
    pPlatform.body.setImmovable(true);
    physics.add.collider(player, pPlatform);
    //pPlatform.body.setGravityX(-10);
}


/*
for (let index = 0; index <= platforms.length; index++) 
{
    let platform = platforms.at(index)
    platformSetup(platform, this.physics, this.add);
    console.log(platform);
}
*/
