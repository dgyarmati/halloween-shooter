const stage = new PIXI.Container();
let backgroundManager;
let player;
let enemyManager;
let collisionHandler;

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

    backgroundManager = new CloudManager();
    player = new Player();
    enemyManager = new EnemyManager();
    collisionHandler = new CollisionHandler();

    renderer.render(stage);

    loop();
}

function loop() {
    backgroundManager.update();
    player.update();
    enemyManager.update();

    Rocket.list.forEach((rocket) => {
        rocket.update();
        EnemyManager.list.forEach((enemy) => {
            collisionHandler.destroyEnemyIfHit(enemy, rocket);
        })
    });

    EnemyProjectile.list.forEach((projectile) => {
        projectile.update();
        collisionHandler.destroyPlayerIfHit(player, projectile);
    });

    requestAnimationFrame(loop);
    renderer.render(stage);
}
