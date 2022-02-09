import { EAGLE_POSITION2 } from '../utils/Constants';
import { EAGLE2_REF } from './ImagesCache';

class Eagle2 {
  
  constructor({onDie}) {
    this.onDie = onDie;
    this.position = {x: EAGLE_POSITION2.x, y: EAGLE_POSITION2.y};
  }

  die() {
    this.onDie();
  }

  render(state) {
    const context = state.context;
    context.drawImage(EAGLE2_REF.current, this.position.x, this.position.y);
  }
}

export default Eagle2;