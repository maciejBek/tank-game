import Block from './Block';
import { WATER_REF } from './ImagesCache';

class Water extends Block {
  constructor({position}) {
    super({position});

    this.breakable = false;
    this.ref = WATER_REF.current;
  }
}

export default Water;