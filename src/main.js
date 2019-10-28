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
    "assets/enemy_projectile.png"
]).load(initGame);

let firstStartOrRestart = true;

function initGame() {
    renderer.backgroundColor = 0x22A7F0;
    setupGameObjects();
    gameLoop();
}

function setupGameObjects() {
    backgroundHandler = new BackgroundHandler();
    collisionHandler = new CollisionHandler();
    enemyHandler = new EnemyHandler();
    projectileHandler = new ProjectileHandler();
    player = new Player();
}

function gameLoop() {
    redrawScreen();
    if (gameStarted && player.isAlive) {
        if (firstStartOrRestart) {
            mainScreen.style.display = "none";
            player.makeVisible();
            enemyHandler.spawnEnemies();
            firstStartOrRestart = false;
        }

        projectileHandler.handleProjectiles();
        enemyHandler.handleCollisionsWithPlayer();

        player.update();
        enemyHandler.updateEnemies();

        if (!player.isAlive) {
            gameCleanupInterval = setInterval(() => {
                removeGameObjects();
            }, 10);
            setTimeout(() => {
                endGame();
            }, 1000);
            while (!gameStarted) {
                redrawScreen();
            }
        }
    }
}

function redrawScreen() {
    backgroundHandler.updateBackground();
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
}

function removeGameObjects() {
    player.destroy();
    enemyHandler.clearAll();
    projectileHandler.clearAll();
}

function endGame() {
    window.clearInterval(gameCleanupInterval);
    displayGameMenu();
    player = new Player(projectileHandler);
    firstStartOrRestart = true;
    gameStarted = false;
}

function displayGameMenu() {
    mainScreen.style.display = "block";
}
