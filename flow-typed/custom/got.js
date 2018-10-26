// @flow

import type { ObjectLiteral } from '@contentacms/contenta-graphql/types/common';

declare module '@contentacms/contenta-graphql/types/got' {
  declare type GotResponse = {
    body: ObjectLiteral,
    url: string,
    requestUrl: string,
  };
}
