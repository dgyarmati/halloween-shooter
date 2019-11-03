class PlayerProjectile extends Projectile {

    constructor(x, y) {
        super(x, y, PLAYER_PROJECTILE_SPRITE, 20, 50, 20, 20, "assets/audio/bat.wav");
    }
}
