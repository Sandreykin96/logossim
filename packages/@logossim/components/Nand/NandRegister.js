import { Component } from '@logossim/core';

import icon from './NandIcon';
import model from './NandModel';
import widget from './NandWidget';

export default new Component({
  type: 'Nand',
  name: 'Nand',
  description: 'Logic "not and" gate',
  group: 'Logic gates',
  configurations: [
    {
      name: 'INPUT_PORTS_NUMBER',
      type: 'number',
      default: 2,
      label: 'Number of input ports',
      min: 2,
      max: 32,
      validate(value) {
        if (value < this.min)
          return `Minimum input ports is ${this.min}`;
        if (value > this.max)
          return `Maximum input ports is ${this.max}`;
        return null;
      },
    },
  ],
  model,
  widget,
  icon,
});
