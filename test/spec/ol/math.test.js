

import _ol_math_ from '../../../src/ol/math';


describe('ol.math.clamp', function() {

  it('returns the correct value at -Infinity', function() {
    expect(_ol_math_.clamp(-Infinity, 10, 20)).to.eql(10);
  });

  it('returns the correct value at min', function() {
    expect(_ol_math_.clamp(10, 10, 20)).to.eql(10);
  });

  it('returns the correct value at mid point', function() {
    expect(_ol_math_.clamp(15, 10, 20)).to.eql(15);
  });

  it('returns the correct value at max', function() {
    expect(_ol_math_.clamp(20, 10, 20)).to.eql(20);
  });

  it('returns the correct value at Infinity', function() {
    expect(_ol_math_.clamp(Infinity, 10, 20)).to.eql(20);
  });

});

describe('ol.math.cosh', function() {

  it('returns the correct value at -Infinity', function() {
    expect(_ol_math_.cosh(-Infinity)).to.eql(Infinity);
  });

  it('returns the correct value at -1', function() {
    expect(_ol_math_.cosh(-1)).to.roughlyEqual(1.5430806348152437, 1e-9);
  });

  it('returns the correct value at 0', function() {
    expect(_ol_math_.cosh(0)).to.eql(1);
  });

  it('returns the correct value at 1', function() {
    expect(_ol_math_.cosh(1)).to.roughlyEqual(1.5430806348152437, 1e-9);
  });

  it('returns the correct value at Infinity', function() {
    expect(_ol_math_.cosh(Infinity)).to.eql(Infinity);
  });

});

describe('ol.math.roundUpToPowerOfTwo', function() {

  it('raises an exception when x is negative', function() {
    expect(function() {
      _ol_math_.roundUpToPowerOfTwo(-1);
    }).to.throwException();
  });

  it('raises an exception when x is zero', function() {
    expect(function() {
      _ol_math_.roundUpToPowerOfTwo(0);
    }).to.throwException();
  });

  it('returns the expected value for simple powers of two', function() {
    expect(_ol_math_.roundUpToPowerOfTwo(1)).to.be(1);
    expect(_ol_math_.roundUpToPowerOfTwo(2)).to.be(2);
    expect(_ol_math_.roundUpToPowerOfTwo(4)).to.be(4);
    expect(_ol_math_.roundUpToPowerOfTwo(8)).to.be(8);
    expect(_ol_math_.roundUpToPowerOfTwo(16)).to.be(16);
    expect(_ol_math_.roundUpToPowerOfTwo(32)).to.be(32);
    expect(_ol_math_.roundUpToPowerOfTwo(64)).to.be(64);
    expect(_ol_math_.roundUpToPowerOfTwo(128)).to.be(128);
    expect(_ol_math_.roundUpToPowerOfTwo(256)).to.be(256);
  });

  it('returns the expected value for simple powers of ten', function() {
    expect(_ol_math_.roundUpToPowerOfTwo(1)).to.be(1);
    expect(_ol_math_.roundUpToPowerOfTwo(10)).to.be(16);
    expect(_ol_math_.roundUpToPowerOfTwo(100)).to.be(128);
    expect(_ol_math_.roundUpToPowerOfTwo(1000)).to.be(1024);
    expect(_ol_math_.roundUpToPowerOfTwo(10000)).to.be(16384);
    expect(_ol_math_.roundUpToPowerOfTwo(100000)).to.be(131072);
    expect(_ol_math_.roundUpToPowerOfTwo(1000000)).to.be(1048576);
    expect(_ol_math_.roundUpToPowerOfTwo(10000000)).to.be(16777216);
  });

});

describe('ol.math.solveLinearSystem', function() {

  it('calculates correctly', function() {
    var result = _ol_math_.solveLinearSystem([
      [2, 1, 3, 1],
      [2, 6, 8, 3],
      [6, 8, 18, 5]
    ]);
    expect(result[0]).to.roughlyEqual(0.3, 1e-9);
    expect(result[1]).to.roughlyEqual(0.4, 1e-9);
    expect(result[2]).to.roughlyEqual(0, 1e-9);
  });

  it('can handle singular matrix', function() {
    var result = _ol_math_.solveLinearSystem([
      [2, 1, 3, 1],
      [2, 6, 8, 3],
      [2, 1, 3, 1]
    ]);
    expect(result).to.be(null);
  });

});

describe('ol.math.toDegrees', function() {
  it('returns the correct value at -π', function() {
    expect(_ol_math_.toDegrees(-Math.PI)).to.be(-180);
  });
  it('returns the correct value at 0', function() {
    expect(_ol_math_.toDegrees(0)).to.be(0);
  });
  it('returns the correct value at π', function() {
    expect(_ol_math_.toDegrees(Math.PI)).to.be(180);
  });
});

describe('ol.math.toRadians', function() {
  it('returns the correct value at -180', function() {
    expect(_ol_math_.toRadians(-180)).to.be(-Math.PI);
  });
  it('returns the correct value at 0', function() {
    expect(_ol_math_.toRadians(0)).to.be(0);
  });
  it('returns the correct value at 180', function() {
    expect(_ol_math_.toRadians(180)).to.be(Math.PI);
  });
});

describe('ol.math.modulo', function() {
  it('256 / 8 returns 0', function() {
    expect(_ol_math_.modulo(256, 8)).to.be(0);
  });
  it('positive and positive returns a positive ', function() {
    expect(_ol_math_.modulo(7, 8)).to.be(7);
  });
  it('same Dividend and Divisor returns 0', function() {
    expect(_ol_math_.modulo(4, 4)).to.be(0);
  });
  it('negative and positive returns positive', function() {
    expect(_ol_math_.modulo(-3, 4)).to.be(1);
  });
  it('negative and negative returns negative', function() {
    expect(_ol_math_.modulo(-4, -5)).to.be(-4);
    expect(_ol_math_.modulo(-3, -4)).to.be(-3);
  });
  it('positive and negative returns negative', function() {
    expect(_ol_math_.modulo(3, -4)).to.be(-1);
    expect(_ol_math_.modulo(1, -5)).to.be(-4);
    expect(_ol_math_.modulo(6, -5)).to.be(-4);
  });
});

describe('ol.math.lerp', function() {
  it('correctly interpolated numbers', function() {
    expect(_ol_math_.lerp(0, 0, 0)).to.be(0);
    expect(_ol_math_.lerp(0, 1, 0)).to.be(0);
    expect(_ol_math_.lerp(1, 11, 5)).to.be(51);
  });
  it('correctly interpolates floats', function() {
    expect(_ol_math_.lerp(0, 1, 0.5)).to.be(0.5);
    expect(_ol_math_.lerp(0.25, 0.75, 0.5)).to.be(0.5);
  });
});
