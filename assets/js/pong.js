var config = {
    width: 1024,
    height: 768,
    backgroundColor: 0x000000,
    scene: {
        create: create,
        update: update
    },
    physics: {
        default: 'arcade'
    }
}

//  TO DO
//  center canvas
//  get sidebar working

var game = new Phaser.Game(config);


var ball;
var ballV = {
    x:0,
    y:0
};

var paddleLeft;
var paddleRight;

function create()
{
    paddleLeft = this.add.rectangle(50,config.height/2-75/2,15,75,0xffffff);
    paddleLeft = this.add.rectangle(config.width-50,config.height/2-75/2,15,75,0xffffff);
    ball = this.add.circle(512,334,12,0xffffff);

    this.physics.add.existing(paddleLeft, false);
    this.physics.add.existing(paddleRight, false);
    this.physics.add.existing(ball,false);
    this.physics.add.collider(paddleLeft,ball,collisionHandler);
    this.physics.add.collider(paddleRight,ball,collisionHandler);
}

//collision

function collisionHandler(_pPaddel)
{
  if(_pPaddel = paddleLeft)
  {
    ball.x = paddleLeft.x + paddleLeft.width + ball.radius
    ballV.x = - ballV.x
    ballV.y = - ballV.y
    //this.randomV();
  }
  else
  {
    ball.x = paddleRight.x - paddleRight.width - ball.radius
    ballV.x = - ballV.x
    ballV.y = - ballV.y
    //this.randomV();
  }
}


//wallCollision:
/*
    in create() -->   Velocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true)
    or:
    var group = this.physics.add.group({
        key: 'ball',
        frameQuantity: 48,
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: true,
        velocityX: 180,
        velocityY: 120,
    });
*/
/*
    my approach:

    create function for each side

    function leftSideCheck()
    {
      return ball.x =< 0
    }

    function rightSideCheck()
    {
      return ball.x => config.width
    }

    function that checks whether one is true, and updates scorecount and resets scene
    
    function wallCheck()
    {
      if(leftSideCheck())
      {
        this.leftScore += 1;
        this.resetBall();
        this.scene.pause();
      }
      else if(leftSideCheck())
      {
        this.rightScore += 1;
        this.resetBall();
        this.scene.pause();
      }
    }

*/

//reset ball (and paddles as well)
/*
  function resetBall()
  {
    ball.x= 512
    ball.y= 334
    ballV.x= this.randomV()
    ballV.y= this.randomV()
  }

*/

//random Velocity:
/*
    function randomV()
    {
      return Math.floor(Math.random() * (4 - -3) ) + -3;
    }
*/

//Score:
/*
    var leftScore;
    var leftScoreText = this.add.text(50, 10, 'Score:'+ leftScore, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    var rightScore;
    var rightScoreText = this.add.text(config.width - 50, 10, 'Score:'+ rightScore, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

*/

function update() 
{
  
  let wasd = this.input.keyboard.addKeys('W,S');
  let cursors = this.input.keyboard.createCursorKeys();
  let enter = this.input.keyboard.addKeys(13);
  let escape = this. input.keyboard.addKeys(27);

  if (wasd.S.isDown)
  {
      paddleLeft.y += 5;
  }
  else if (wasd.W.isDown)
  {
      paddleLeft.y -= 5;
  }

  if (cursors.down.isDown)
  {
      paddleRight.y += 5;
  }
  else if (cursors.up.isDown)
  {
      paddleRight.y -= 5;
  }
  
  if (enter.isDown)
  {
    if(game.scene.isPaused)
    {
      this.scene.resume();
    }
  }

  if (escape.isDown)
  {
    this.scene.pause();
  }

  ball.x += ballV.x;
  ball.y += ballV.y;

}

/*

 onload= "init()"

<div class="container">
    <div class="titel"><h1>Spiele</h1></div>
    <div class="dropdown"><label class="switch">
      <input type="checkbox" id ="colorMode">
      <span class="slider round"></span>
    </label></div>
    <div class="gamelist">
      <ul>
        <li>Pong</li>
        <li><a href="SideScroller.html">SideScroller</a></li>
        <li>Settings</li>
      </ul>
    </div>
    <div class="content">
      <canvas id="canvas"></canvas>
    </div>
    <div class="menue"></div>
  </div>
<script src="assets/js/darkMode.js"></script>

*/