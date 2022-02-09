import { 
  DIRECTION, 
  BULLET_SIZE,
  BULLET_POINTER_FIX 
} from '../utils/Constants';

class Bullet {
  constructor({speed, position, direction, color}) {
    this.position = position;
    this.speed = speed;
    this.delete = false;
    this.direction = direction;
    this.color = color;
    this.arcCenter = {x: this.position.x, y: this.position.y};
  }

  die() {
    this.delete = true;
  }

  update() {
    switch(this.direction) {
      case DIRECTION.UP:
        this.position.y -= this.speed;
        this.arcCenter.x = this.position.x + BULLET_SIZE/2;
        this.arcCenter.y = this.position.y + BULLET_POINTER_FIX;
        break;
      case DIRECTION.DOWN:
        this.position.y += this.speed;
        this.arcCenter.x = this.position.x + BULLET_SIZE/2;
        this.arcCenter.y = this.position.y + BULLET_SIZE - BULLET_POINTER_FIX;
        break;
      case DIRECTION.LEFT:
        this.position.x -= this.speed;
        this.arcCenter.x = this.position.x + BULLET_POINTER_FIX;
        this.arcCenter.y = this.position.y + BULLET_SIZE/2;
        break;
      case DIRECTION.RIGHT:
        this.position.x += this.speed;
        this.arcCenter.x = this.position.x + BULLET_SIZE - BULLET_POINTER_FIX;
        this.arcCenter.y = this.position.y + BULLET_SIZE/2;
        break;
      default:

    }
  }

  render(state) {
    if (this.position.x > state.screen.width || this.position.x < 0
      || this.position.y > state.screen.height || this.position.y < 0 ) {
      this.die();
    }

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(0, 0, BULLET_SIZE, BULLET_SIZE);
    context.fill();
    context.restore();

    context.save();
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.arcCenter.x, this.arcCenter.y, BULLET_SIZE/2, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }
}

export default Bullet;