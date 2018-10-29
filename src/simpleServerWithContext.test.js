const ase = require('apollo-server-express');

jest.spyOn(ase, 'ApolloServer').mockImplementation(() => 0);

const simpleServerWithContext = require('./simpleServerWithContext');

describe('simpleServerWithContext', () => {
  afterEach(() => {
    ase.ApolloServer.mockReset();
  });
  it('can instantiate the ApolloServer', async () => {
    expect.assertions(5);
    const apolloServer = await simpleServerWithContext(
      { foo: 'bar' },
      [Promise.resolve('{}'), Promise.resolve('Pi')],
      { the: () => 'resolver' }
    );
    const apolloArgs = ase.ApolloServer.mock.calls[0][0];
    expect(apolloServer).toBeInstanceOf(ase.ApolloServer);
    expect(apolloArgs.context).toEqual({ foo: 'bar' });
    expect(Object.keys(apolloArgs.resolvers)).toEqual(['Query', 'the']);
    expect(Object.keys(apolloArgs.schemaDirectives)).toHaveLength(1);
    expect(Object.keys(apolloArgs.typeDefs)).toHaveLength(3);
  });
  it('can instantiate the ApolloServer with defaults', async () => {
    expect.assertions(5);
    const apolloServer = await simpleServerWithContext({ foo: 'bar' });
    const apolloArgs = ase.ApolloServer.mock.calls[0][0];
    expect(apolloServer).toBeInstanceOf(ase.ApolloServer);
    expect(apolloArgs.context).toEqual({ foo: 'bar' });
    expect(Object.keys(apolloArgs.resolvers)).toEqual(['Query']);
    expect(Object.keys(apolloArgs.schemaDirectives)).toHaveLength(1);
    expect(Object.keys(apolloArgs.typeDefs)).toHaveLength(1);
  });
});
