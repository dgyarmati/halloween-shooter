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
    loop();

    if (gameStarted) {
        player = new Player();
        enemyManager = new EnemyManager();
        collisionHandler = new CollisionHandler();
    }
}

function loop() {
    backgroundManager.updateBackground();
    requestAnimationFrame(loop);
    renderer.render(stage);
    if (gameStarted && player.isAlive) {

        PlayerProjectile.list.forEach((playerProjectile, idx) => {
            playerProjectile.update(idx);
            EnemyManager.list.forEach((enemy) => {
                collisionHandler.destroyEnemyIfHit(enemy, playerProjectile);
            })
        });

        EnemyProjectile.list.forEach((enemyProjectile, idx) => {
            enemyProjectile.update(idx);
            collisionHandler.destroyPlayerIfHit(player, enemyProjectile);
        });

        Particle.list.forEach((particleFromExplosion, idx) => {
            particleFromExplosion.update(idx);
            collisionHandler.destroyPlayerIfHit(player, particleFromExplosion);
        });

        EnemyManager.list.forEach((enemy) => {
            collisionHandler.destroyPlayerAndEnemyOnCollision(player, enemy);
        });

        player.update();
        enemyManager.updateEnemies();
    }
}
