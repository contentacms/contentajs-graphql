const { apolloServerWithContext, readRelativeFile } = require('./');

describe('the entry point', () => {
  it('cat get all the props', () => {
    expect.assertions(2);
    expect(apolloServerWithContext).toEqual(expect.any(Function));
    expect(readRelativeFile).toEqual(expect.any(Function));
  });
});
