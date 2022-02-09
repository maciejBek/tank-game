import { EAGLE_POSITION } from '../utils/Constants';
import { EAGLE_REF } from './ImagesCache';

class Eagle {
  
  constructor({onDie}) {
    this.onDie = onDie;
    this.position = {x: EAGLE_POSITION.x, y: EAGLE_POSITION.y};
  }

  die() {
    this.onDie();
  }

  render(state) {
    const context = state.context;
    context.drawImage(EAGLE_REF.current, this.position.x, this.position.y);
  }
}

export default Eagle;