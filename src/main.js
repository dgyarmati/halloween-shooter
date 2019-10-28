const stage = new PIXI.Container();
let backgroundHandler;
let player;
let projectileHandler;
let enemyHandler;
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

function setupGameObjects() {
    backgroundHandler = new BackgroundHandler();
    collisionHandler = new CollisionHandler(null);
    enemyHandler = new EnemyHandler(collisionHandler, null);
    projectileHandler = new ProjectileHandler(collisionHandler, enemyHandler);
    collisionHandler.projectileHandler = projectileHandler;
    enemyHandler.projectileHandler = projectileHandler;
    player = new Player1(projectileHandler);
}

function init() {
    renderer.backgroundColor = 0x22A7F0;

    setupGameObjects();

    loop();
}

function redrawScreen() {
    backgroundHandler.updateBackground();
    requestAnimationFrame(loop);
    renderer.render(stage);
}

function loop() {
    redrawScreen();
    if (gameStarted && player.isAlive) {
        if (firstStart) {
            mainScreen.style.display = "none";
            player.makeVisible();
            enemyHandler.spawnEnemies();
            firstStart = false;
        }

        projectileHandler.handleProjectiles();
        enemyHandler.handleCollisionsWithPlayer();

        player.update();
        enemyHandler.updateEnemies();

        if (!player.isAlive) {
            gameCleanupInterval = setInterval(() => {
                player.destroy();
                enemyHandler.clearAll();
                projectileHandler.clearAll();
            }, 10);
            setTimeout(() => {
                window.clearInterval(gameCleanupInterval);
                mainScreen.style.display = "block";
                player = new Player1(projectileHandler);
                firstStart = true;
                gameStarted = false;
            }, 1000);
            while (!gameStarted) {
                redrawScreen();
            }
        }
    }
}
