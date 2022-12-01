var config = {
    width: 1024,
    height: 768,
    backgroundColor: 0x000000,
    type:Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
    }
}

var game = new Phaser.Game(config);

var field1 = {};
var field2 = {};
var field3 = {};
var field4 = {}; 
var field5 = {}; 
var field6 = {}; 
var field7 = {}; 
var field8 = {}; 
var field9 = {};

// TODO: ...................................................................................
// add win detection
// add score

function preload()
{
    this.load.image('kreis', "assets/tictactoe/kreis.png");
    this.load.image('x', "assets/tictactoe/x.png");
    this.load.image('field', "assets/tictactoe/field.png");
    this.load.image('black', "assets/tictactoe/black.png")
}

 var leftScore = 0;
 var rightScore = 0;

function create()
{
    var unten = config.height-100;
    var mitteX = config.width/2;
    var mitteY = config.height/2;
    var rechts = config.width-250;

    createGame(field1, 250, 100, this.add);
    createGame(field2, mitteX, 100, this.add);
    createGame(field3, rechts, 100, this.add);
    createGame(field4, 250, mitteY, this.add);
    createGame(field5, mitteX, mitteY, this.add);
    createGame(field6, rechts, mitteY, this.add);
    createGame(field7, 250, unten, this.add);
    createGame(field8, mitteX, unten, this.add);
    createGame(field9, rechts, unten, this.add);

    var fSprite = this.add.sprite(config.width/2, config.height/2, 'field');

    fSprite.displayWidth = 800;
    fSprite.displayHeight = 800;



    leftScoreText = this.add.text(100, 10, 'Score: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  	rightScoreText = this.add.text(config.width - 150, 10, 'Score: ', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
}

//.....................................................................................

var active = 'kreis';

function createGame(pField, x, y, add)
{
    pField.sprite = add.sprite(x, y, 'black');
    pField.sprite.displayWidth = 100;
    pField.sprite.displayHeight = 100;

    pField.sprite.setInteractive();

    pField.sprite.on('pointerdown', function (pointer){

        if(pField.sprite.texture.key == 'black')
        {
            if(active == 'x')
            {
                pField.sprite.setTexture('kreis');
                pField.sprite.displayWidth = 100;
                pField.sprite.displayHeight = 100;
                active = 'kreis';
            }
            else if(active == 'kreis')
            {
                pField.sprite.setTexture('x');
                pField.sprite.displayWidth = 100;
                pField.sprite.displayHeight = 100;
                active = 'x';
            }
        }
        else if(pField.sprite.texture.key !== 'black')
        {
            pField.sprite.texture.key == 'kreis' ? active = 'x' : active = 'kreis';
            pField.sprite.setTexture('black');

        }

        checkWinner();
    });
}

function checkWinner()
{
        if(checkWinTexture() === 'x') {
            console.log('X hat gewonnen!!!');
            leftScore++;
            resetFields();
        } else if (checkWinTexture() === "kreis") {
            console.log('O hat gewonnen!!!');
            rightScore++;
            resetFields();
        }
}

function checkWinTexture() {
    if (field1.sprite.texture.key === field2.sprite.texture.key && field2.sprite.texture.key === field3.sprite.texture.key && field3.sprite.texture.key !== "black")
    {
        return field3.sprite.texture.key;
    }
    else if (field4.sprite.texture.key === field5.sprite.texture.key && field5.sprite.texture.key === field6.sprite.texture.key && field6.sprite.texture.key !== "black")
    {
        return field6.sprite.texture.key;
    }
    else if (field7.sprite.texture.key === field8.sprite.texture.key && field8.sprite.texture.key === field9.sprite.texture.key && field9.sprite.texture.key !== "black")
    {
        return field9.sprite.texture.key;
    }
    else if (field1.sprite.texture.key === field5.sprite.texture.key && field5.sprite.texture.key === field9.sprite.texture.key && field9.sprite.texture.key !== "black")
    {
        return field9.sprite.texture.key;
    }
    else if (field3.sprite.texture.key === field5.sprite.texture.key && field5.sprite.texture.key === field7.sprite.texture.key && field7.sprite.texture.key !== "black")
    {
        return field7.sprite.texture.key;
    } 
    else if (field1.sprite.texture.key === field4.sprite.texture.key && field4.sprite.texture.key === field7.sprite.texture.key && field7.sprite.texture.key !== "black")
    {
        return field7.sprite.texture.key;
    }
    else if  (field2.sprite.texture.key === field5.sprite.texture.key && field5.sprite.texture.key === field8.sprite.texture.key && field8.sprite.texture.key !== "black")
    {
        return field8.sprite.texture.key;
    }
    else if (field3.sprite.texture.key === field6.sprite.texture.key && field6.sprite.texture.key === field9.sprite.texture.key && field9.sprite.texture.key !== "black")
    {
        return field9.sprite.texture.key;
    }
    else
    {
        return "";
    }
}

function resetFields()
{
    field1.sprite.setTexture('black');
    field2.sprite.setTexture('black');
    field3.sprite.setTexture('black');
    field4.sprite.setTexture('black');
    field5.sprite.setTexture('black');
    field6.sprite.setTexture('black');
    field7.sprite.setTexture('black');
    field8.sprite.setTexture('black');
    field9.sprite.setTexture('black');
}


//.....................................................................................

var leftScore = 0;
var leftScoreText;

var rightScore = 0;
var rightScoreText

//.....................................................................................

function update()
{
    leftScoreText.setText('Score: '+leftScore);
    rightScoreText.setText('Score: '+rightScore);
}


















// nützliches:
//
//  quard clauses aneignen(häufiger benutzen) (https://learningactors.com/javascript-guard-clauses-how-you-can-refactor-conditional-logic/)
// 
// 
//
// let test = 10 > 5 ? true : false;
//
//  ======= 
//
// if (10>5)
// { 
//      test = true;
// }
// else{
//      test = false;
// }
