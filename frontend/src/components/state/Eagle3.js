import { EAGLE_POSITION3 } from '../utils/Constants';
import { EAGLE3_REF } from './ImagesCache';

class Eagle3 {
  
  constructor({onDie}) {
    this.onDie = onDie;
    this.position = {x: EAGLE_POSITION3.x, y: EAGLE_POSITION3.y};
  }

  die() {
    this.onDie();
  }

  render(state) {
    const context = state.context;
    context.drawImage(EAGLE3_REF.current, this.position.x, this.position.y);
  }
}

export default Eagle3;