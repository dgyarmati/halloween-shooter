/*****************************************************

 Main.js

 *****************************************************/

const stage = new PIXI.Container();
let cloudManager;
let player;
let enemyManager;

PIXI.loader.add([
    "assets/cloud_1.png",
    "assets/cloud_2.png",
    "assets/spaceship.png",
    "assets/rocket.png",
    "assets/enemy.png",
    "assets/enemyShoot.png"
]).load(init);


function init() {
    renderer.backgroundColor = 0x22A7F0;

    cloudManager = new CloudManager();
    player = new Player();
    enemyManager = new EnemyManager();

    renderer.render(stage);

    loop();
}

function loop() {
    cloudManager.update();
    player.update();
    enemyManager.update();

    Rocket.list.map((element) => {
        element.update();
    });

    EnemyProjectile.list.map((element) => {
        element.update();
    });

    requestAnimationFrame(loop);
    renderer.render(stage);
}
