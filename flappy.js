// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = -4;
var score_label;


var player;

var pipes;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.image("playerImg2", "assets/flappy_superman.png");
    game.load.audio("Bling", "assets/point.ogg");
    game.load.audio("bullet", "assets/Bullet.wav");
    game.load.image("pipe", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 *
 */
function create() {
    game.stage.setBackgroundColor("#ffffff");
    //game.add.text(260, 190, "Welcome to my game", {font: "30px Arial", fill: "#cccccc"});
    player = game.add.sprite(20, 10, "playerImg");
    score_label = game.add.text(20, 20, "");
    pipes = game.add.group();

    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.gravity.y = 500;

    game.input.onDown.add(clickhandler);

    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    //    .onDown.add(updateScore);

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(moveUp);



    game.input
        .keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);

    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);

    pipes = game.add.group();


    var pipe_interval =1.05;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(game_over);

}



function add_pipe_block(x, y)
{

    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x=-180;


}

function generate_pipe(){
    var gapStart = game.rnd.integerInRange(1, 3);
    var gapEnd = game.rnd.integerInRange(4, 7);

        for (var count = 0; count <=8; count++) {

            if (count != gapStart && count != gapStart + 1) {
                add_pipe_block(750, count * 50);
            }


        }

    updateScore();
    //{
    //
    //}
    //}

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);
}

function game_over() {
    //alert("game over");
    //game.add.sprite(500, 300, "playerImg");
    game.add.text(260, 190, "game over", {font: "30px Arial", fill: "#cccccc"});
    pipes.destroy();

}

function clickhandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");

}

function updateScore() {
    //game.sound.play("Bling");
    score = score + 1;
    score_label.setText(score.toString());

}

function moveUp()
{
   player.body.velocity.y= - 200;
    game.sound.play("bullet");


}

function moveDown()
{
    player.y = player.y + 20;
    game.sound.play("bullet");

}



function moveRight()
{
    player.x = player.x + 20;
    game.sound.play("bullet");

}


function moveLeft()
{
    player.x = player.x - 20;
    game.sound.play("bullet");
}