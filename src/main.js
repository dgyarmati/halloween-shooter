const MOON = "assets/moon_crescent.png";
const STARS_1_SPRITE = "assets/stars.png";
const STARS_2_SPRITE = "assets/stars_2.png";
const PLAYER_SPRITE = "assets/player.png";
const ENEMY_SPRITE = "assets/enemy_1.png";
const PLAYER_PROJECTILE_SPRITE = "assets/player_projectile.png";
const ENEMY_PROJECTILE_SPRITE = "assets/enemy_projectile.png";

const stage = new PIXI.Container();
let backgroundHandler;
let player;
let projectileHandler;
let enemyHandler;
let collisionHandler;
let gameCleanupInterval;

PIXI.loader.add([
    MOON,
    STARS_1_SPRITE,
    STARS_2_SPRITE,
    PLAYER_SPRITE,
    PLAYER_PROJECTILE_SPRITE,
    ENEMY_SPRITE,
    ENEMY_PROJECTILE_SPRITE
]).load(initGame);

let firstStartOrRestart = true;

function initGame() {
    renderer.backgroundColor = 0x050E1D;
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
