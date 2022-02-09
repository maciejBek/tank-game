class Block {
  constructor({position}) {
    this.position = position;
    this.delete = false;
      this.breakable = true;
      this.type = null;
  }

  die() {
    this.delete = this.breakable ? true : false;
  }

  render(state) {
      const context = state.context;
      //console.log(typeof this.ref);
      //if (typeof this.ref !== 'undefined')
      context.drawImage(this.ref, this.position.x, this.position.y);

  }
}

export default Block;