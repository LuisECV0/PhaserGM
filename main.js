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
var platforms;

function preload() {
    // Cargar las imágenes desde URLs en línea
    this.load.image('sky', './assets/BG.png'); // Fondo
    this.load.image('ground', './assets/Skeleton.png'); // Plataforma
    this.load.image('star', './assets/Tree.png'); // Estrella
    this.load.image('bomb', 'https://examples.phaser.io/assets/sprites/bomb.png'); // Bomba
    this.load.spritesheet('dude', 
        'https://examples.phaser.io/assets/sprites/phaser-dude.png', 
        { frameWidth: 32, frameHeight: 48 } // Hoja de sprites
    );
}


function create() {
    this.add.image(400, 300, 'sky'); 
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    this.add.image(400, 300, 'star');
}

function update() {

}
