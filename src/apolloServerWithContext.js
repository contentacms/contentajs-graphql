// @flow

import type {
  ResolverMap,
  TypeDefinitions,
} from '../flow-typed/custom/graphql';

const { ApolloServer } = require('apollo-server-express');

const directives = require('./directives');
const resolvers = require('./resolvers');
const schemaDirectives = require('./schemaDirectives');

module.exports = async (
  context: {
    cmsHost: string,
    jsonApiPrefix: string,
  },
  additionalTypeDefs: TypeDefinitions = [],
  additionalResolvers: ResolverMap = {}
) => {
  return new ApolloServer({
    typeDefs: await Promise.all(directives.concat(additionalTypeDefs)),
    resolvers: Object.assign({}, resolvers, additionalResolvers),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    schemaDirectives,
    context,
  });
};
