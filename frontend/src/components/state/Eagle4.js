import { EAGLE_POSITION4 } from '../utils/Constants';
import { EAGLE4_REF } from './ImagesCache';

class Eagle4 {
  
  constructor({onDie}) {
    this.onDie = onDie;
    this.position = {x: EAGLE_POSITION4.x, y: EAGLE_POSITION4.y};
  }

  die() {
    this.onDie();
  }

  render(state) {
    const context = state.context;
    context.drawImage(EAGLE4_REF.current, this.position.x, this.position.y);
  }
}

export default Eagle4;