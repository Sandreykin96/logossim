/* eslint-disable no-new */
import XorModel from '../XorModel';

const { addPort } = global;

it('should add ports on initialization', () => {
  const addInputSpy = jest.spyOn(XorModel.prototype, 'addInputPort');
  addInputSpy.mockImplementation(addPort);

  const addOutputSpy = jest.spyOn(
    XorModel.prototype,
    'addOutputPort',
  );
  addOutputSpy.mockImplementation(addPort);

  new XorModel({
    INPUT_PORTS_NUMBER: 16,
    DATA_BITS: 1,
  });

  expect(addOutputSpy).toHaveBeenCalledWith('out', 1);
  [...Array(16).keys()].forEach(i => {
    expect(addInputSpy).toHaveBeenNthCalledWith(i + 1, `in${i}`, 1);
  });
});

describe('Configured with MULTIPLE_INPUT_BEHAVIOR=ONE', () => {
  it("should return 1 when there's only 1 high input", () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ONE',
      INPUT_PORTS_NUMBER: 4,
      DATA_BITS: 1,
    });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 0,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 1 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 1,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 1 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 1,
        in3: 0,
      }),
    ).toEqual({ out: 1 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 0,
        in3: 1,
      }),
    ).toEqual({ out: 1 });
  });

  it("should return 0 when there's more than 1 high input", () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ONE',
      INPUT_PORTS_NUMBER: 4,
      DATA_BITS: 1,
    });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 1,
        in2: 1,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 1,
        in3: 1,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 0,
        in2: 0,
        in3: 1,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 1,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 1,
        in3: 1,
      }),
    ).toEqual({ out: 0 });
  });

  it('should return 0 when all inputs are 0', () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ONE',
      INPUT_PORTS_NUMBER: 4,
      DATA_BITS: 1,
    });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 0 });
  });

  it('should return bitwise XOR for multiple data bits', () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ONE',
      INPUT_PORTS_NUMBER: 5,
      DATA_BITS: 8,
    });

    expect(
      model.stepAndMask({
        in0: 0b0110_1000,
        in1: 0b0100_0100,
        in2: 0b0111_0010,
        in3: 0b0101_0001,
      }),
    ).toEqual({ out: 0b0000_1111 });
  });
});

describe('Configured with MULTIPLE_INPUT_BEHAVIOR=ODD', () => {
  it("should return 1 when there's an odd number of high inputs", () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ODD',
      INPUT_PORTS_NUMBER: 5,
      DATA_BITS: 1,
    });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 0,
        in2: 0,
        in3: 0,
        in4: 0,
      }),
    ).toEqual({ out: 1 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 1,
        in3: 0,
        in4: 0,
      }),
    ).toEqual({ out: 1 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 1,
        in3: 1,
        in4: 1,
      }),
    ).toEqual({ out: 1 });
  });

  it("should return 0 when there's an odd number of high inputs", () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ODD',
      INPUT_PORTS_NUMBER: 4,
      DATA_BITS: 1,
    });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 0,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 1,
        in2: 1,
        in3: 0,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 0,
        in1: 0,
        in2: 1,
        in3: 1,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 0,
        in2: 0,
        in3: 1,
      }),
    ).toEqual({ out: 0 });

    expect(
      model.stepAndMask({
        in0: 1,
        in1: 1,
        in2: 1,
        in3: 1,
      }),
    ).toEqual({ out: 0 });
  });

  it('should return bitwise XOR for multiple data bits', () => {
    const model = new XorModel({
      MULTIPLE_INPUT_BEHAVIOR: 'ODD',
      INPUT_PORTS_NUMBER: 5,
      DATA_BITS: 8,
    });

    expect(
      model.stepAndMask({
        in0: 0b0000_0000,
        in1: 0b0111_1000,
        in2: 0b0110_0110,
        in3: 0b0101_0101,
      }),
    ).toEqual({ out: 0b0100_1011 });
  });
});
