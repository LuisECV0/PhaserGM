var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

var game = new Phaser.Game(config);
var player;
var platforms;
var cursors;
var stars;

function preload() {
    this.load.image('sky', './assets/BG.png'); 
    this.load.image('ground', './assets/platform.png'); 
    this.load.image('star', 'https://labs.phaser.io/view.html?src=src\components\data\query%20data.js'); 
    this.load.image('bomb', './assets/Skeleton.png'); 
    this.load.spritesheet('dude', 
        './assets/dude.png', 
        { frameWidth: 32, frameHeight: 48 } 
    );
}

function create() {
    // Añadir el fondo
    this.add.image(400, 300, 'sky'); 

    // Crear plataformas
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Añadir el jugador
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Animaciones del jugador
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Colisiones entre jugador y plataformas
    this.physics.add.collider(player, platforms);

    // Inicializar los controles
    cursors = this.input.keyboard.createCursorKeys();

    // Crear las estrellas
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Asignar rebote aleatorio a las estrellas
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Colisiones entre estrellas y plataformas
    this.physics.add.collider(stars, platforms);

    // Superposición para recoger las estrellas
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

// Función para recoger estrellas
function collectStar (player, star) {
    star.disableBody(true, true);
}

function update() {
    // Movimiento del jugador
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    // Salto del jugador
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
