// @flow

import type {
  ResolverMap,
  TypeDefinitions,
} from '@contentacms/contenta-graphql/types/graphql';

const { ApolloServer } = require('apollo-server-express');

const directives = require('./directives');
const resolvers = require('./resolvers');
const schemaDirectives = require('./schemaDirectives');

module.exports = async (
  context: {
    cmsHost: string,
    jsonApiPrefix: string,
  },
  additionalTypeDefs: Array<Promise<TypeDefinitions>> = [],
  additionalResolvers: ResolverMap = {}
) =>
  new ApolloServer({
    typeDefs: await Promise.all(directives.concat(additionalTypeDefs)),
    resolvers: Object.assign({}, resolvers, additionalResolvers),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    schemaDirectives,
    context,
  });
