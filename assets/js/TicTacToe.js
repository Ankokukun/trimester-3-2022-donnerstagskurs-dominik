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

function create()
{
    var field1, field2, field3, field4, field5, field6, field7, field8, field9;

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
//.....................................................................................

    var fSprite = this.add.sprite(config.width/2, config.height/2, 'field');

    fSprite.displayWidth = 800;
    fSprite.displayHeight = 800;

    
}

//.....................................................................................

var active = 'kreis';

function createGame(pField, x, y, add)
{
    pField = add.sprite(x, y, 'black');
    pField.displayWidth = 100;
    pField.displayHeight = 100;

    pField.setInteractive();

    pField.on('pointerdown', function (pointer){

        if(pField.texture.key == 'black')
        {
            if(active == 'x')
            {
                pField.setTexture('kreis');
                pField.displayWidth = 100;
                pField.displayHeight = 100;
                active = 'kreis';
            }
            else if(active == 'kreis')
            {
                pField.setTexture('x');
                pField.displayWidth = 100;
                pField.displayHeight = 100;
                active = 'x';
            }
        }
        else if(pField.texture.key !== 'black')
        {
            pField.texture.key == 'kreis' ? active = 'x' : active = 'kreis';
            pField.setTexture('black');

        }
        /*
        if (checkWinner(field1, field2, field3))
        {
            console.log("Gewonnen!");
        }
        */
    });
}

/*
function checkWinner()
{
    return checkWinner(field1, field2, field3) ||
           checkWinner(field4, field5, field6) ||
           checkWinner(field7, field8, field9);
}
*/

function checkWinner(pField1, pField2, pField3)
{
    return pField1.texture.key === pField2.texture.key && pField2.texture.key === pField3.texture.key;
}

function update()
{

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
