jest.mock('fs-extra', () => ({
  readFile: jest.fn(),
}));
const fs = require('fs-extra');
const readFile = require('./readFileUtf8')('/foo');

describe('readFileUtf8', () => {
  it('reads a file at the given path with UTF-8 encoding', async () => {
    expect.assertions(2);
    const path = 'some/file.graphql';
    const contents = `
    type AThing {
      aProperty: boolean
    }
    `;
    fs.readFile.mockResolvedValue(contents);
    expect(await readFile(path)).toBe(contents);
    expect(fs.readFile).toHaveBeenCalledWith('/foo/some/file.graphql', 'utf8');
  });
});
