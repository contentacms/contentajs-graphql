/* @flow */

import type {
  DocumentNode,
  GraphQLResolveInfo,
  GraphQLFieldResolver,
} from 'graphql';

import type { SchemaDirectiveVisitor } from 'graphql-tools';

declare module '@contentacms/contenta-graphql/types/graphql' {
  import type { ObjectLiteral } from '@contentacms/contenta-graphql/types/common';

  declare type TypeDef = (() => TypeDef) | string | DocumentNode;
  declare type TypeDefinitions = TypeDef | TypeDef[];

  declare type ResolverObj = ObjectLiteral;
  declare type ResolverArgs = ObjectLiteral;
  declare type ResolverContext = ObjectLiteral;

  declare type Resolver = GraphQLFieldResolver<
    ResolverObj,
    ResolverContext,
    ResolverArgs
  >;

  declare type TypeResolvers = {
    [string]: Resolver,
  };

  declare type ResolverMap = {
    [string]: TypeResolvers,
  };

  declare type SchemaDirectives = {
    [string]: SchemaDirectiveVisitor
  }
}
