jest.mock('got');

const got = require('got');
const { GraphQLList, GraphQLBoolean } = require('graphql');

const FromJsonApi = require('./fromJsonApi');

describe('FromJsonApi', () => {
  let sut;

  beforeEach(() => {
    sut = new FromJsonApi({
      name: 'the-name',
      visitedType: { type: new GraphQLList(GraphQLBoolean) },
      args: { query: '/resource?with=some&filters&include=that' },
      schema: {},
      context: {},
    });
    jest.resetAllMocks();
  });

  test('visitFieldDefinition', () => {
    expect.assertions(1);
    jest.spyOn(sut, 'visitInputFieldDefinition').mockImplementation();
    sut.visitFieldDefinition('fake-input');
    expect(sut.visitInputFieldDefinition).toHaveBeenCalledWith('fake-input');
  });

  describe('visitInputFieldDefinition', () => {
    it('can add the resolver to the field', () => {
      expect.assertions(1);
      const field = {};
      sut.visitInputFieldDefinition(field);
      expect(field.resolve).toEqual(expect.any(Function));
    });
    it('can get the data from the JSON API and process multiple cardinality', async () => {
      expect.assertions(1);
      const field = {};
      got.mockReturnValue(
        Promise.resolve({
          body: {
            data: {
              type: 'foo',
              id: 'bar',
            },
          },
        })
      );
      sut.visitInputFieldDefinition(field);
      jest.spyOn(sut, '_findRelsInIncludes').mockReturnValue({});
      const resolved = await field.resolve(
        ['fake-src'],
        { an: 'argument' },
        { cmsHost: 'the://cms.host/name', jsonApiPrefix: '/prefix' }
      );
      expect(resolved).toEqual([{ id: 'bar', type: 'foo' }]);
    });
    it('can get the data from the JSON API and process single cardinality', async () => {
      expect.assertions(1);
      const sut2 = new FromJsonApi({
        name: 'the-name',
        visitedType: { type: GraphQLBoolean },
        args: { query: '/resource?with=some&filters&include=that' },
        schema: {},
        context: {},
      });
      const field = {};
      got.mockReturnValue(
        Promise.resolve({
          body: {
            data: [
              {
                type: 'foo',
                id: '1',
                attributes: { one: 'uno', three: 'dos' },
                relationships: { rel1: { data: { type: 'lorem', id: '2' } } },
              },
            ],
            included: [
              {
                type: 'lorem',
                id: '1',
                attributes: { one: 'two', three: 'four' },
              },
              {
                type: 'lorem',
                id: '2',
                relationships: {
                  rel7: { data: { type: 'undefined', id: 'fake' } },
                  rel8: { data: { type: 'lorem', id: '1' } },
                  rel9: { data: { type: 'lorem', id: '1' } },
                },
              },
            ],
          },
        })
      );
      sut2.visitInputFieldDefinition(field);
      const resolved = await field.resolve(
        ['fake-src'],
        { an: 'argument' },
        { cmsHost: 'the://cms.host/name', jsonApiPrefix: '/prefix' }
      );
      expect(resolved).toMatchSnapshot();
    });
    it('can resolve using the default resolver', async () => {
      expect.assertions(1);
      const field = { resolve: () => Promise.resolve('shortcut') };
      sut.visitInputFieldDefinition(field);
      const resolved = await field.resolve(
        ['fake-src'],
        { an: 'argument' },
        { cmsHost: 'the://cms.host/name', jsonApiPrefix: '/prefix' }
      );
      expect(resolved).toBe('shortcut');
    });
  });
  it('can process the cardinality combinations correctly', () => {
    expect.assertions(4);
    jest.spyOn(sut, '_mapJsonApiObjects').mockReturnValue();
    sut._processApiResponse({ body: { data: ['el'] } }, true);
    expect(sut._mapJsonApiObjects).toHaveBeenLastCalledWith(['el'], undefined);
    sut._processApiResponse({ body: { data: ['el'] } }, false);
    expect(sut._mapJsonApiObjects).toHaveBeenLastCalledWith('el', undefined);
    sut._processApiResponse({ body: { data: 'el' } }, true);
    expect(sut._mapJsonApiObjects).toHaveBeenLastCalledWith(['el'], undefined);
    sut._processApiResponse({ body: { data: 'el' } }, false);
    expect(sut._mapJsonApiObjects).toHaveBeenLastCalledWith('el', undefined);
  });
});
