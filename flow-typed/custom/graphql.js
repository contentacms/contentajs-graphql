/* @flow */

import type {
  DocumentNode,
  GraphQLResolveInfo,
  GraphQLFieldResolver,
} from 'graphql';

import type { ObjectLiteral } from './common';

export type TypeDef = (() => TypeDef) | string | DocumentNode;
export type TypeDefinitions = TypeDef | TypeDef[];

export type ResolverObj = ObjectLiteral;
export type ResolverArgs = ObjectLiteral;
export type ResolverContext = ObjectLiteral;

export type Resolver = GraphQLFieldResolver<
  ResolverObj,
  ResolverContext,
  ResolverArgs
>;

export type TypeResolvers = {
  [string]: Resolver,
};

export type ResolverMap = {
  [string]: TypeResolvers,
};
