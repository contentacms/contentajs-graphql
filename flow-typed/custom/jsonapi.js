// @flow

import type { ObjectLiteral } from '@contentacms/contenta-graphql/types/common';

declare module '@contentacms/contenta-graphql/types/jsonapi' {
  declare type JsonApiBase = {
    meta: ObjectLiteral,
    links: { [string]: string },
  };
  declare type JsonApiResourceIdentifier = {
    type: string,
    id: string,
  };
  declare type JsonApiRelatonship = ?JsonApiBase & {
    data: JsonApiResourceIdentifier | JsonApiResourceIdentifier[],
  };
  declare type JsonApiResource = JsonApiResourceIdentifier &
    ?JsonApiBase & {
      attributes?: ObjectLiteral,
      relationships?: { [string]: JsonApiRelatonship },
    };
  declare type JsonApiDocument = ?JsonApiBase & {
    data: JsonApiResource | JsonApiResource[],
  };
}
