const { simpleServerWithContext, readRelativeFile } = require('./');

describe('the entry point', () => {
  it('cat get all the props', () => {
    expect.assertions(2);
    expect(simpleServerWithContext).toEqual(expect.any(Function));
    expect(readRelativeFile).toEqual(expect.any(Function));
  });
});
