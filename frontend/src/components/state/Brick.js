import Block from './Block';
import { BRICK_REF } from './ImagesCache';

class Brick extends Block {
  constructor({position}) {
    super({position});
    
    this.ref = BRICK_REF.current;
  }
}

export default Brick;