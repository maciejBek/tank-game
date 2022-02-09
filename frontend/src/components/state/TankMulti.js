import {
    DIRECTION,
    LOWEST_POSITION,
    LONGEST_POSITION,
    COLOR,
    BULLET_SPEED,
    TANK_SHOOT_FREQUENCY
} from '../utils/Constants';
import {
    TANK_UP_REF,
    TANK_DOWN_REF,
    TANK_LEFT_REF,
    TANK_RIGHT_REF
} from './ImagesCache';
import Bullet from './Bullet';
import {
    getTankGunPosition,
    isTankBlocked,
    isBulletTankCrashed,
    isBulletBlockCrashed,
    isTankUnderBush
} from '../utils/Helper';

class TankMulti {
    constructor({speed, position, onDie}) {
        this.position = position;
        this.speed = speed;
        this.direction = DIRECTION.UP;
        this.ref = TANK_UP_REF.current;
        this.delete = false;
        this.lastShot = 0;
        this.bullets = [];
        this.onDie = onDie;
        this.hiden = false;
    }

    die() {
        this.onDie();
    }

    update(keys, map, autoTanks, tank1, tank2, tank3, eagle1, eagle2, eagle3, eagle4, score) {
        this.hiden = isTankUnderBush(this, map);
        score = 0;
        if (keys.up) {
            this.direction = DIRECTION.UP;
            this.ref = TANK_UP_REF.current;
            this.position.y -= this.speed;
            if (isTankBlocked(this, map, null)) {
                this.position.y += this.speed;
            }
            if (this.position.y < 0) {
                this.position.y = 0;
            }
        } else if (keys.down) {
            this.direction = DIRECTION.DOWN;
            this.ref = TANK_DOWN_REF.current;
            this.position.y += this.speed;
            if (isTankBlocked(this, map, null)) {
                this.position.y -= this.speed;
            }
            if (this.position.y > LOWEST_POSITION) {
                this.position.y = LOWEST_POSITION;
            }
        } else if (keys.left) {
            this.direction = DIRECTION.LEFT;
            this.ref = TANK_LEFT_REF.current;
            this.position.x -= this.speed;
            if (isTankBlocked(this, map, null)) {
                this.position.x += this.speed;
            }
            if (this.position.x < 0) {
                this.position.x = 0;
            }
        } else if (keys.right) {
            this.direction = DIRECTION.RIGHT;
            this.ref = TANK_RIGHT_REF.current;
            this.position.x += this.speed;
            if (isTankBlocked(this, map, null)) {
                this.position.x -= this.speed;
            }
            if (this.position.x > LONGEST_POSITION) {
                this.position.x = LONGEST_POSITION;
            }
        }

        if (keys.space && Date.now() - this.lastShot > TANK_SHOOT_FREQUENCY) {
            const bullet = new Bullet({
                speed: BULLET_SPEED,
                position: getTankGunPosition(this),
                direction: this.direction,
                color: COLOR.YELLOW
            });

            this.bullets.push(bullet);
            this.lastShot = Date.now();
        }

        this.bullets.forEach(b => {
            if (!b.delete) {
                autoTanks.forEach(a => {
                    if (isBulletTankCrashed(b, a)) {
                        b.die();
                        a.die();
                    }
                })
            }

            if (!b.delete) {
                map.items.forEach(i => {
                    if (isBulletBlockCrashed(b, i)) {
                        b.die();
                        i.die();
                    }
                })
            }

            if (!b.delete && isBulletTankCrashed(b, tank1)) {
                score +=1;
                b.die();
                tank1.die();
            }
            if (!b.delete && isBulletTankCrashed(b, tank2)) {
                score +=1;
                b.die();
                tank2.die();
            }
            if (!b.delete && isBulletTankCrashed(b, tank3)) {
                score +=1;
                b.die();
                tank3.die();
            }

            if (!b.delete && isBulletTankCrashed(b, eagle1)) {
                score +=1;
                b.die();
                eagle1.die();
            }
            if (!b.delete && isBulletTankCrashed(b, eagle2)) {
                score +=1;
                b.die();
                eagle2.die();
            }
            if (!b.delete && isBulletTankCrashed(b, eagle3)) {
                score +=1;
                b.die();
                eagle3.die();
            }
            if (!b.delete && isBulletTankCrashed(b, eagle4)) {
                score +=1;
                b.die();
                eagle4.die();
            }

        });
    }

    renderBullets(state) {
        let newBullets = [];
        for (let b of this.bullets) {
            if (!b.delete) {
                b.update();
                b.render(state);
                newBullets.push(b);
            }
        }
        this.bullets = newBullets;
    }

    render(state) {
        const context = state.context;
        if (this.hiden) context.globalAlpha = 0.5;

        context.drawImage(this.ref, this.position.x, this.position.y);

        this.renderBullets(state);
    }
}

export default TankMulti;