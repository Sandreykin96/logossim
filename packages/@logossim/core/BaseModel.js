import { NodeModel } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';

import PortModel from './Port/PortModel';

export default class BaseModel extends NodeModel {
  constructor(type, configurations) {
    super({ type });

    this.initialize(configurations);

    this.configurations = configurations;

    this.functions = {
      onSimulationStart: this.onSimulationStart,
      onSimulationEnd: this.onSimulationEnd,
      step: this.step,
    };
  }

  serialize() {
    return {
      ...super.serialize(),
      functions: this.functions,
      configurations: this.configurations,
    };
  }

  addPort(port) {
    if (port instanceof PortModel) {
      super.addPort(port);
    } else {
      super.addPort(new PortModel({ name: port }));
    }
  }

  initialize() {}

  onSimulationStart() {}

  onSimulationEnd() {}

  step() {}
}
