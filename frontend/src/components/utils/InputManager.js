const KEY = {
  LEFT: 37,
  RIGHT: 39,
  A: 65,
  D: 68,
  UP: 38,
  DOWN: 40,
  W: 87,
  S:83,
  SPACE: 32,
  ENTER: 13,
  ESC: 27
};

class InputManager {
  constructor() {
    this.pressedKeys = { left: 0, right: 0, up: 0, down: 0, space: 0, enter: 0, esc: 0};
  }

  bindKeys() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
  }

  unbindKeys() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  handleKeys(value, e) {
    let keys = this.pressedKeys;

    switch(e.keyCode) {
      case KEY.LEFT:
      case KEY.A:
        keys.left = value;
        break;
      case KEY.RIGHT:
      case KEY.D:
        keys.right = value;
        break;
      case KEY.UP:
      case KEY.W:
        keys.up = value;
        break;  
      case KEY.DOWN:
      case KEY.S:
        keys.down = value;
        break;      
      case KEY.SPACE:
        keys.space = value;
        break;
      case KEY.ENTER:
        keys.enter = value;
            break; 
        case KEY.ESC:
            keys.esc = value;
            break; 
      default:
        // do nothing         
    }

    this.pressedKeys = keys;
  }
}

export default InputManager;