var config = {
    width: 1024,
    height: 768,
    backgroundColor: 0x000000,
    type: Phaser.AUTO,
    scene: {
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
    }
}

//  TO DO GENEREL
////center canvas
////get sidebar working
////Tic Tac Toe


// TO DO PONG
//// get random direction of ball fixed --> additional randomizer, that changes - to +
//   pause screen --> have to add multiple scenes and switch back and forth
//// fix collision of paddle and ball --> add timer for repelling the ball
//// fix collision of paddle with worldbounds
//// put both randomV functions into one
//   add soundeffects
////fix ScoreCounter

var game = new Phaser.Game(config);


var ball;
var ballV = {
    x:0,
    y:0
};

var paddleLeft;
var paddleRight;

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

function randomV()
{
  let randomFloat;
  let worked = false;
  while (!worked) {
    randomFloat = getRandomFloat(-2,2,2);
    if(randomFloat <= -0.75)
    {
      if(randomFloat >= 0.75)
      {
        worked = true;
      }
      break;
    }
  }
  if(getRandomFloat(0,1,0) == 0)
  {
    return randomFloat;
  }
  else return -randomFloat; 
}


function resetBall()
  {
    ball.x= 512;
    ball.y= 334;
    ballV.x= randomV();
    //console.log("BallV.x: "+ballV.x);
    ballV.y= randomV();
    //console.log("BallV.y: "+ballV.y);x
  }

var leftScore = 0;
var leftScoreText;

var rightScore = 0;
var rightScoreText;

var startTime, endTime;

function startTimer() {
  startTime = new Date();
};

function endTimer() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  //console.log(seconds + " seconds");xxxx
  return seconds;
}


function create()
{
    paddleLeft = this.add.rectangle(50,config.height/2-75/2,15,75,0xffffff);
    paddleRight = this.add.rectangle(config.width-50,config.height/2-75/2,15,75,0xffffff);
    ball = this.add.circle(512,334,12,0xffffff);

    leftScoreText = this.add.text(100, 10, 'Score: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  	rightScoreText = this.add.text(config.width - 150, 10, 'Score: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.physics.add.existing(paddleLeft, false);
    this.physics.add.existing(paddleRight, false);
    this.physics.add.existing(ball,false);
    this.physics.add.collider(paddleLeft,ball,collisionHandler);
    this.physics.add.collider(paddleRight,ball,collisionHandler);

    paddleLeft.body.setCollideWorldBounds(true);
    paddleRight.body.setCollideWorldBounds(true);

    ball.body.setCollideWorldBounds(true);
    ball.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', function(body, up, down, left, right)
    {
      if(up||down)
      {
        ballV.y = -ballV.y;
      }
      if(left)
      {xx
        rightScore ++; //score doesn't update
        resetBall();
      }
      if(right)
      {
        leftScore ++;
        resetBall();
      }
    });
    resetBall();
    startTimer();
}

//collision

function collisionHandler(_pPaddel)
{
  if (endTimer() >=1) 
  {
    if(_pPaddel == paddleLeft)
    {
      ball.x = paddleLeft.x + paddleLeft.width + ball.radius
      ballV.x = - ballV.x
    }
    else
    {
      ball.x = paddleRight.x - paddleRight.width - ball.radius
      ballV.x = - ballV.x
    }
  }
  startTimer();
}


function update() 
{
  
  let wasd = this.input.keyboard.addKeys('W,S');
  let cursors = this.input.keyboard.createCursorKeys();
  //let escape = this.input.keyboard.addKey(27);

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

/*  
    can't resume a scene if it's paused, and doesn't react to keypresses
    if(escape.isDown)
    {
      console.log(this.scene.isPaused("default"));
      if(this.scene.isPaused("default")) {
        console.log("game resumed"); 
        this.scene.resume();
      } else console.log("game paused"); this.scene.pause();
    }
*/

  ball.x += ballV.x;
  ball.y += ballV.y;
  
  leftScoreText.setText('Score: '+leftScore);
  rightScoreText.setText('Score: '+rightScore);
}
