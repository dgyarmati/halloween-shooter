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

    backgroundManager = new BackgroundManager();
    player = new Player();
    enemyManager = new EnemyManager();
    collisionHandler = new CollisionHandler();

    renderer.render(stage);

    loop();
}

function loop() {
    if (player.isAlive) {
        backgroundManager.updateBackground();

        PlayerProjectile.list.forEach((playerProjectile) => {
            playerProjectile.update();
            EnemyManager.list.forEach((enemy) => {
                collisionHandler.destroyEnemyIfHit(enemy, playerProjectile);
            })
        });

        EnemyProjectile.list.forEach((enemyProjectile) => {
            enemyProjectile.update();
            collisionHandler.destroyPlayerIfHit(player, enemyProjectile);
        });

        // EnemyManager.list.forEach((enemy) => {
        //     collisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        // });

        player.update();
        enemyManager.updateEnemies();

        requestAnimationFrame(loop);
        renderer.render(stage);
    }
}
