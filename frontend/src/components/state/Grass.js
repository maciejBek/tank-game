import Block from './Block';
import { GRASS_REF } from './ImagesCache';
import {
    BLOCK_TYPE
} from '../utils/Constants';
class Grass extends Block {
    constructor({ position }) {
        super({ position });

        this.breakable = false;
        this.type = BLOCK_TYPE.GRASS;
        this.ref = GRASS_REF.current;
    }
}

export default Grass;