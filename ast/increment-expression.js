module.exports = class IncrementExpression {
  constructor(increment, op) {
    this.op = op;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    // Do something
  }

  optimize() {
    return this;
  }
};
