const MOON = "assets/moon_crescent.png";
const STARS_1_SPRITE = "assets/stars.png";
const STARS_2_SPRITE = "assets/stars_2.png";
const PLAYER_SPRITE = "assets/player.png";
const PUMPKIN_SPRITE = "assets/enemy_1.png";
const PUMPKIN_2_SPRITE = "assets/enemy_2.png";
const GHOST_SPRITE = "assets/ghost_1.png";
const GHOST_2_SPRITE = "assets/ghost_2.png";
const GHOST_EXPLOSION = "assets/ghost_explosion.png";
const PUMPKIN_EXPLOSION = "assets/pumpkin_explosion.png";
const PLAYER_PROJECTILE_SPRITE = "assets/player_projectile.png";
const ENEMY_PROJECTILE_SPRITE = "assets/enemy_projectile.png";

const GHOST_KILL_THRESHOLD = 15;
const PUMPKIN_KILL_THRESHOLD = 10;
let GHOSTS_KILLED = 0;
let PUMPKINS_KILLED = 0;

let FIRST_WAVE = true;
let SECOND_WAVE = false;
let BOSS = false;

let stage = new PIXI.Container();
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
    PUMPKIN_SPRITE,
    PUMPKIN_2_SPRITE,
    GHOST_SPRITE,
    GHOST_2_SPRITE,
    GHOST_EXPLOSION,
    PUMPKIN_EXPLOSION,
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
    player = new Witch();
}

function gameLoop() {
    redrawScreen();
    if (gameStarted && player.isAlive) {
        if (firstStartOrRestart) {
            mainScreen.style.display = "none";
            player.makeVisible();
            firstStartOrRestart = false;
        }

        enemyHandler.spawnEnemies();

        projectileHandler.handleProjectiles();
        enemyHandler.handleCollisionsWithPlayer();

        player.update();
        enemyHandler.updateEnemies();

        if (!player.isAlive) {
            let scream = new Audio("assets/audio/scream.wav");
            scream.play();
            const x = player.sprite.position.x;
            const y = player.sprite.position.y;
            player.destroy();
            EnemyHandler.deathAnimation(x, y, GHOST_EXPLOSION);
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
    player = new Witch(projectileHandler);
    firstStartOrRestart = true;
    GHOSTS_KILLED = 0;
    PUMPKINS_KILLED = 0;
    gameStarted = false;
    FIRST_WAVE = true;
    SECOND_WAVE = false;
    BOSS = false;
    stage = new PIXI.Container();
}

function displayGameMenu() {
    mainScreen.style.display = "block";
}
