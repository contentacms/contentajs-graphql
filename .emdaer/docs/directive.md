## The `@fromJsonApi(…)` directive
The `@fromJsonApi(…)` is the biggest motivator of this repository. Since JSON API allows you to get _the information you
need and only the information you need, in a single request_, it is the perfect data fetcher for your GraphQL.js
project.

This directive will intelligently turn the response from JSON API into the hierarchical format that GraphQL expects.
This includes all the nested relationships at all levels. This leaves everything ready for the user to start selecting
fields for the response.

### Examples
Imagine you have these top level fields in your GraphQL query.

```graphql
 type Query {
  lastRecipe: Recipe
    @fromJsonApi(
      query: "/recipes?page[limit]=1&sort=createdAt&include=author"
    )
  recipesByAuthor(authorName: String!): [Recipe]
    @fromJsonApi(
      query: "/recipes?filter[author.name]={authorName}&include=author"
    )
  articlesByAuthor(authorName: String!): [Article]
    @fromJsonApi(
      query: "/articles?filter[owner.name]={authorName}&include=owner"
    )
}
```

Note how you can specify a templated URL with variables. The replacement value for these variables will be specified in
the query. For instance see how the `{authorName}` value is provided when the front-end is querying the GraphQL server
like:

```
curl -X GET \
  'http://localhost:3000/graphql?query={recipesByAuthor(authorName:"Umami"){title,id,random,author{name}}}'
```
