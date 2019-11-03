class BackgroundHandler {

    constructor() {
        this.backgroundElements = [];

        window.setInterval(function () {
            for (let i = 0; i < 10; i++) {
                this.backgroundElement = (Math.random() > 0.5 ? new PIXI.Sprite(PIXI.loader.resources[STARS_1_SPRITE].texture) : new PIXI.Sprite(PIXI.loader.resources[STARS_2_SPRITE].texture));
                this.backgroundElement.anchor.set(0.5, 0.5);
                this.backgroundElement.position.set(renderer.width * 1.3, renderer.height * Math.random());

                let minScale = 0.2;
                let maxScale = 1.2;
                let scale = Math.random() * (maxScale - minScale) + minScale;
                this.backgroundElement.scale.set(scale, scale);

                stage.addChildAt(this.backgroundElement, 0);
                this.backgroundElements.push(this.backgroundElement);
            }
        }.bind(this), 50);
    }

    updateBackground() {
        this.backgroundElements.forEach(function (backgroundElement, index, array) {
            backgroundElement.position.x -= 4;

            if (backgroundElement.position.x < -renderer.width * 0.3) {
                backgroundElement.destroy();
                array.splice(index, 1);
            }
        });
    }
}
