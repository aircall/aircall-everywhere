/* tests index */
import AircallPhone from '../../src/javascripts/aircallPhone.js';

describe('index file', () => {
  it('should exists', () => {
    const a = new AircallPhone();
    expect(a).toBeDefined();
  });

  it('should fail', () => {
    const x = 4;
    expect(x).toEqual(4);
  });
});
