import { BaseModel } from '@logossim/core';

export default class InputModel extends BaseModel {
  initialize(configurations) {
    const DATA_BITS = Number(configurations.DATA_BITS);

    this.addOutputPort('out', DATA_BITS);
  }

  onSimulationStart() {
    this.emit({ out: 0 });
  }

  onClick(index) {
    const mask = 0b1 << index;

    this.emit({ out: this.getOutput() ^ mask });
  }

  getOutput() {
    return this.getPort('out').getValue() || 0;
  }

  getBitAt(index) {
    const mask = 0b1 << index;
    const result = this.getOutput() & mask;

    return result > 0 ? 1 : 0;
  }
}
