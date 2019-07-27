// @flow

import type {
  ResolverMap,
  TypeDefinitions,
  SchemaDirectives,
} from '@contentacms/contenta-graphql/types/graphql';

const { ApolloServer } = require('apollo-server-express');

const directives = require('./directives');
const resolvers = require('./resolvers');
const schemaDirectives = require('./schemaDirectives');

module.exports = async (
  context: {
    cmsHost: string,
    jsonApiPrefix: string,
    access_token: string,
  },
  // TODO: merge these into an options object so that there is no need to
  // pass null arguments
  additionalTypeDefs: Array<Promise<TypeDefinitions>> = [],
  additionalResolvers: ResolverMap = {},
  additionalSchemaDirectives: SchemaDirectives = {},
  additionalDataSources: any = {}
) =>
  new ApolloServer({
    typeDefs: await Promise.all(directives.concat(additionalTypeDefs)),
    resolvers: Object.assign({}, resolvers, additionalResolvers),
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    schemaDirectives: Object.assign(
      {},
      schemaDirectives,
      additionalSchemaDirectives
    ),
    dataSources: () => {
      return additionalDataSources;
    },
    context,
    // This is the same check made by the Apollo Server to enable/disable
    // introspection in production.
    tracing: process.env.NODE_ENV !== 'production',
  });
