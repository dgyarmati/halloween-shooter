let gameStarted = false;
let renderer;
let mainTheme;
let mainThemeInterval;

function startMainTheme() {
    mainTheme = new Audio("assets/audio/main_theme.mp3");
    mainThemeInterval = setInterval(() => {
        mainTheme.play();
    }, 0)
}

function hideMainScreen() {
    let mainScreen = document.getElementById("main-screen");
    mainScreen.style.display = "none";
    return mainScreen;
}

function hideGoodbyeScreen() {
    let goodbyeScreen = document.getElementById("goodbye-screen");
    goodbyeScreen.style.display = "none";
    return goodbyeScreen;
}

function hideVictoryScreen() {
    let victoryScreen = document.getElementById("victory-screen");
    victoryScreen.style.display = "none";
    return victoryScreen;
}

function fadeSplashScreenToMainMenu() {
    setTimeout(() => {
        let splashScreen = document.getElementById("splash-screen");
        mainScreen.style.display = "block";
        splashScreen.style.display = "none";
    }, 2000);
}

function addClickHandlersToMenu() {
    let menuOptions = document.getElementsByClassName("menu-option");
    for (let i = 0; i < menuOptions.length; i++) {
        menuOptions[i].addEventListener("click", () => {
            gameStarted = true;
        });
    }
}

function displayGoodbyScreenOnClick() {
    document.getElementById("exit").addEventListener("click", () => {
        goodbyeScreen.style.display = "block";
        mainScreen.style.display = "none";
        mainTheme.pause();
        mainTheme.currentTime = 0;
        window.clearInterval(mainThemeInterval);
    });
}

function setupPixiJS() {
    let type = "WebGL";

    if (!PIXI.utils.isWebGLSupported()) {
        type = "canvas";
    }

    PIXI.utils.sayHello(type);

    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.view);
}

startMainTheme();
let mainScreen = hideMainScreen();
let goodbyeScreen = hideGoodbyeScreen();
let victoryScreen = hideVictoryScreen();
fadeSplashScreenToMainMenu();
addClickHandlersToMenu();
displayGoodbyScreenOnClick();

setupPixiJS();
