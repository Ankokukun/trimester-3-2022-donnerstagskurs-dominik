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
    createGame(field1, 250, 100, this.add);
    createGame(field2, config.width/2, 100, this.add);
    createGame(field3, config.width-250, 100, this.add);
    createGame(field4, 250, config.height/2, this.add);
    createGame(field5, config.width/2, config.height/2, this.add);
    createGame(field6, config.width-250, config.height/2, this.add);
    createGame(field7, 250, config.height-100, this.add);
    createGame(field8, config.width/2, config.height-100, this.add);
    createGame(field9, config.width-250, config.height-100, this.add);
//.....................................................................................

    var fSprite = this.add.sprite(config.width/2, config.height/2, 'field');

    fSprite.displayWidth = 800;
    fSprite.displayHeight = 800;
}

//.....................................................................................

function createGame(pField, x, y, add)
{
    pField = add.sprite(x, y, 'black');

    pField.displayWidth = 100;
    pField.displayHeight = 100;

    pField.setInteractive();

    pField.on('pointerdown', function (pointer){

        if(pField.texture.key == 'black')
        {
            pField.setTexture('kreis');
            pField.displayWidth = 100;
            pField.displayHeight = 100;
        }
        else if(pField.texture.key == 'kreis')
        {
            pField.setTexture('x');
            pField.displayWidth = 100;
            pField.displayHeight = 100;
        }   
        else if(pField.texture.key == 'x')
        {
            pField.setTexture('black');
        }
    });
}

function update()
{
    
}