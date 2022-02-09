import AutoTank from './AutoTank';
import { 
  SCREEN_WIDTH, 
  TANK_SIZE,
  AUTO_TANK_SPEED
} from '../utils/Constants';
import { isTankBlocked } from '../utils/Helper';

const PRODUCING_FREQUENCY = 10000; // The ms between each tank appears
const STARTING_POSITION = [
  { x: 0, y: 0 }, // left
  { x: SCREEN_WIDTH - TANK_SIZE, y: 0 }, // right
  { x: SCREEN_WIDTH / 2 - TANK_SIZE / 2, y: 0 } // center
];

class AutoTankController {
  constructor({ count, onAllDie, map, tank, eagle }) {
    this.autoTanks = [];
    this.count = count;
    this.lastProduction = 0;
    this.allDie = onAllDie;
    this.map = map;
    this.tank = tank;
    this.eagle = eagle;
  }

  checkAllDie() {
    if (this.count === 0 && this.autoTanks.length === 0) {
      this.allDie();
    }
  }

  canProduce() {
    return this.count > 0
           && Date.now() - this.lastProduction > PRODUCING_FREQUENCY
  }

  produce() {
    if (!this.canProduce()) {
      return;
    }

    const nextPosition = STARTING_POSITION[this.count % 3];

    const newTank = new AutoTank({
      speed: AUTO_TANK_SPEED, 
      position: { x: nextPosition.x, y: nextPosition.y }
    });

    if (!isTankBlocked(newTank, null, this.autoTanks)) {
      // Only produce when there is no other auto tank on the spot.
      this.autoTanks.push(newTank);

      this.count--;
      this.lastProduction = Date.now();
    }
  }

  update() {
    this.checkAllDie();
    this.produce();
    let newTanks = [];
    for(let i=0;i<this.autoTanks.length;i++) {
      let currentTank = this.autoTanks[i];
      if (!currentTank.delete) {
        newTanks.push(currentTank);
        
        currentTank.update(this.map, this.tank, this.eagle, this.autoTanks);
      }
    }

    this.autoTanks = newTanks;
  }

  render(state) {
    this.autoTanks.forEach(t => t.render(state));
  }
}

export default AutoTankController;