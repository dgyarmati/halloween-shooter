class BackgroundHandler {

    constructor() {
        this.stars = [];

        window.setInterval(function () {
            for (let i = 0; i < 10; i++) {
                this.star = (Math.random() > 0.5 ? new PIXI.Sprite(PIXI.loader.resources[STARS_1_SPRITE].texture) : new PIXI.Sprite(PIXI.loader.resources[STARS_2_SPRITE].texture));
                this.star.anchor.set(0.5, 0.5);
                this.star.position.set(renderer.width * 1.3, renderer.height * Math.random());

                let minScale = 0.2;
                let maxScale = 1.2;
                let scale = Math.random() * (maxScale - minScale) + minScale;
                this.star.scale.set(scale, scale);

                stage.addChildAt(this.star, 0);
                this.stars.push(this.star);
            }
        }.bind(this), 50);
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
