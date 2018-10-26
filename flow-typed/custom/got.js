// @flow

declare module '@contentacms/contenta-graphql/types/got' {
  import type { ObjectLiteral } from '@contentacms/contenta-graphql/types/common';

  declare type GotResponse = {
    body: ObjectLiteral,
    url: string,
    requestUrl: string,
  };
}
