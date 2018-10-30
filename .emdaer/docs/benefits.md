## Benefits of GraphQL in node.js
The most obvious benefit of having GraphQL in node.js is that you can aggregate different APIs under a single GraphQL
back-end in a non-blocking I/O runtime. This will **improve performance dramatically**.

Another obvious benefit is that by using the [Apollo Server](https://www.apollographql.com/) you get **many** [features
for free](https://www.apollographql.com/docs/apollo-server/v2/) (like mocking, persited queries, cache hint directives,
and many [additional packages](https://github.com/apollographql/apollo-server/tree/master/packages)). And even more if
your consumers use the [Apollo Client](https://www.apollographql.com/docs/react/).

Another outstanding benefit is that by using [GraphQL.js](https://github.com/graphql/graphql-js) you are depending on
the reference implementation of GraphQL. That means that it is supported by the official GraphQL team. It also means
that it has extensive support and a wide [community](https://graphql.org/community/).
