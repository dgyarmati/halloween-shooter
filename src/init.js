let gameStarted = false;
let renderer;

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

let mainScreen = hideMainScreen();
let goodbyeScreen = hideGoodbyeScreen();
fadeSplashScreenToMainMenu();
addClickHandlersToMenu();
displayGoodbyScreenOnClick();

setupPixiJS();
