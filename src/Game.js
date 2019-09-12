import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

import Sky from "./assets/sky.png"
import Dude from "./assets/dude.png"
import Ground from "./assets/platform.png"
import Star from "./assets/star.png"
import Bomb from "./assets/bomb.png"




export default class Game extends React.Component{
  


    
    
    
 
    
    render (){
        var backgroundImg = this.props.url
        console.log(backgroundImg)
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaserContainer',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
        var game = new Phaser.Game(config);
        
            function preload () {
            this.load.audio('cry', "src/assets/peterCry.wav")   
            this.load.audio('collect', "src/assets/collect.wav")                  
            this.load.image('sky', "src/assets/skycopy.png");
            this.load.image('ground', 'src/assets/rainbowplatform.png');
            this.load.image('star', 'src/assets/gif.png');
            this.load.image('bomb', 'src/assets/peter.png');
            this.load.spritesheet('dude', 
                'src/assets/theboys.png',
                { frameWidth: 32, frameHeight: 48 }
            );
            }   

            function create () {
    
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.sound.add('cry');
    this.sound.add('collect');
}

function update ()
{
    if (gameOver)
    {
        setTimeout(this.sys.game.destroy(true), 3000)
        // this.sys.game.destroy(true);
        // return;
    }

    if (cursors.left.isDown)
    {
        
        player.setVelocityX(-160);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

    }
    else if (cursors.down.isDown) {
        this.sys.game.destroy(true);
    }
    else
    {
        player.setVelocityX(0);

    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    this.sound.play('collect');
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
        this.sound.play('cry');
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);


    gameOver = true;
}
        return (
            <div id="phaserContainer">
           <h1> Use the arrow keys to move, down to quit, and watch out for peter! </h1>
            {/* <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
        <script type="text/javascript"> */}
        {/* </script> */}
        </div>
        );
    }
}




