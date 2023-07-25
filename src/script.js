
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y : 300},
            debug: false
        }
    },
    scene: {

        preload: preload,
        create: create,
        update: update

    }
};

const game = new Phaser.Game(config);

function preload(){

    this.load.image('sky',"./assets/sky.png");
    this.load.image('ground',"./assets/platform.png");
    this.load.spritesheet("dude", "./assets/dude3.png", {
        
        frameWidth: 109,
        frameHeight: 66
    });

}

function create(){

    // escenario

    this.add.image(400, 300, 'sky');
    
    platform = this.physics.add.staticGroup();

    platform.create(400, 568, "ground").setScale(2).refreshBody();

    // jugador

    player = this.physics.add.sprite(100, 400, "dude");
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1 // -1 para que se repita infinitamente, puedes ajustar este valor según tus necesidades
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: "dude", frame: 143}],
        frameRate: 20,
        
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 135, end: 143 }),
        frameRate: 10,
        repeat: -1 // -1 para que se repita infinitamente, puedes ajustar este valor según tus necesidades
    });

    // seteo de la gravedad

    player.body.setGravityY(500);

    // seteo del collider

    this.physics.add.collider(player, platform);

    // Objeto que contiene la tecla pulsada

    cursors = this.input.keyboard.createCursorKeys();
   
}

function update(){

    // Condicionales de movimientos

    if(cursors.left.isDown){
        
        player.setVelocityX(-250);
        
        player.anims.play("left", true);
    
    }else if(cursors.right.isDown){

        player.setVelocityX(250);
        
        player.anims.play("right", true);

    }else{

        player.setVelocityX(0);
        
        player.anims.play("turn", true);

    }

    if(cursors.up.isDown && player.body.touching.down){

        player.setVelocityY(-430);
    }
    
}