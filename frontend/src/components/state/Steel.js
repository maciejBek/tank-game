import Block from './Block';
import { STEEL_REF } from './ImagesCache';

class Steel extends Block {
  constructor({position}) {
    super({position});

    this.breakable = false;
    this.ref = STEEL_REF.current;
  }
}

export default Steel;