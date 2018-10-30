ContentaJS GraphQL is a repository that contains a set of helpers to build your GraphQL project on top of Contenta JS.

<!--emdaer-p
  - '@emdaer/plugin-image'
  - src: ./.emdaer/docs/assets/graphql.png
    alt: GraphQL
    align: center
    width: 60%
-->

This project provides a simple Apollo server instance that you can use in your Contenta JS application. It ships wit a
very convenient [GraphQL directive](https://www.apollographql.com/docs/graphql-tools/schema-directives.html) that will
fetch data from your Contenta CMS back-end using JSON API. The result of that data fetch will be parsed and prepared so
it can be resolved by GraphQL without additional work.

You can see this is action in the [`graphql-example-code`](https://github.com/contentacms/contentajs/tree/graphql-example-code)
branch. If you prefer, you can see [the diff](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1).
That will show the necessary code to add GraphQL to your Contenta project.
