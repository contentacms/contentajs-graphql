## Installation
You can see an example of this in this [demo code](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1).
1. Inside of your Contenta JS project add the necessary dependencies
```
npm install --save @contentacms/contentajs-graphql graphql graphql-tools
```
2. [Create a server instance with the Contena CMS URL and add it to express](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1#diff-f4fed62a72fc59b66a2183017cc4b9cb).
3. Write your GraphQL types.
  - If they follow the structure of your JSON API resources they'll get automatically resolved. See [this example of an Article type](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1#diff-da57a422b90e697b0a5bbe0a11699b7a).
  - If there are any additional fields, you can resolve them _the GraphQL way_. This example [creates an extra field called random](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1#diff-2be3149c012f9a61fb6bbd290edde707R9).
    In order to resolve the value of `random` you will need a resolver like [this one](https://github.com/contentacms/contentajs/compare/9b95bba53e47220129fcf2e84eed9ceedff119d9...graphql-example-code?expand=1#diff-895614263fb87c38476aeb8dad289b12).
4. THAT'S IT.
