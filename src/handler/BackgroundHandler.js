class BackgroundHandler {

    constructor() {
        this.moon = new PIXI.Sprite(PIXI.loader.resources[MOON].texture);
        this.moon.position.set(renderer.width * 0.8, renderer.height * 0.01);
        stage.addChildAt(this.moon, 0);

        this.stars = [];

        window.setInterval(function () {
            for (let i = 0; i < 5; i++) {
                this.star = (Math.random() > 0.5 ? new PIXI.Sprite(PIXI.loader.resources[STARS_1_SPRITE].texture) : new PIXI.Sprite(PIXI.loader.resources[STARS_2_SPRITE].texture));
                this.star.position.set(renderer.width, renderer.height * Math.random());

                let minScale = 0.2;
                let maxScale = 1.2;
                let scale = Math.random() * (maxScale - minScale) + minScale;
                this.star.scale.set(scale, scale);

                stage.addChildAt(this.star, 0);
                this.stars.push(this.star);
            }
        }.bind(this), 1000);
    }

    updateBackground() {
        this.stars.forEach(function (star, index, stars) {
            star.position.x -= 4;

            if (star.position.x < -renderer.width * 0.3) {
                star.destroy();
                stars.splice(index, 1);
            }
        });
    }
}
