const stage = new PIXI.Container();
let backgroundManager;
let player;
let enemyManager;
let collisionHandler;
let gameCleanupInterval;

PIXI.loader.add([
    "assets/cloud_1.png",
    "assets/cloud_2.png",
    "assets/spaceship.png",
    "assets/rocket.png",
    "assets/enemy.png",
    "assets/enemyShoot.png"
]).load(init);

let firstStart = true;
function init() {
    renderer.backgroundColor = 0x22A7F0;

    backgroundManager = new BackgroundManager();
    player = new Player();

    loop();
}

function loop() {
    backgroundManager.updateBackground();
    requestAnimationFrame(loop);
    renderer.render(stage);
    if (gameStarted && player.isAlive) {
        if (firstStart) {
            mainScreen.style.display = "none";
            player.makeVisible();
            enemyManager = new EnemyManager();
            collisionHandler = new CollisionHandler();
            firstStart = false;
        }

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

        if (!player.isAlive) {
            gameCleanupInterval = setInterval(() => {
                player.destroy();
                EnemyManager.destroyAll();
                Particle.destroyAll();
                PlayerProjectile.destroyAll();
                EnemyProjectile.destroyAll();
            }, 10);
            setTimeout(() => {
                window.clearInterval(gameCleanupInterval);
                mainScreen.style.display = "block";
                player = new Player();
                firstStart = true;
                gameStarted = false;
            }, 1000);
            while (!gameStarted) {
                backgroundManager.updateBackground();
                requestAnimationFrame(loop);
                renderer.render(stage);
            }
        }
    }
}
