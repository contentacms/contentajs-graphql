# JSON API Drupal and GraphQL Drupal <img align="right" src="../logo.svg" alt="Contenta logo" title="Contenta logo" width="100">

**Disclaimer:** I'm the original author of the JSON API module in Drupal, so my vision is clearly skewed. Nevertheless
these are the reasons to have GraphQL.js talk to Drupal using the JSON API Drupal module as opposed to the GraphQL
Drupal module.

I think that the JSON API approach inside of Drupal is better for the following reasons:

  - It does not suffer from the traditional REST problems (often mentioned in the GraphQL pitches). You can get all the
  information you need, and only the information you need in a single request.
  - Cacheability of responses in the CDN. The verbose query language in GraphQL makes it hard to rely on GET requests
  against Drupal, hence you'd get poor edge cache support.
  - Full queriability. Out of the box, the JSON API module allows you to filter on any available field at any depth.
  Without the need to create custom top level fields with their resolvers.
  - Reliability of the Drupal implementation. The JSON API module in Drupal has been stable for years now. In fact is
  about to become part of the Drupal core and be shipped on every Drupal install. The GraphQL module just became RC.
  - Test coverage. The JSON API implementation in Drupal follows a testing framework/pattern that ensures correctness
  on all entity types.
  - Complete mutations by default. You don't need extra server-side work to insert, update or delete entities.
  - API customizations. You can customize your API using a graphic interface to disable resources, fields, create field
  aliases, apply common field transformations (timestamp to ISO date), …
  - Funding. Part of the JSON API team if funded to work on it full time to ensure quality.
  - Compatible ecosystem. There are many modules that you'd also need for GraphQL that are compatible with JSON API
  nowadays (Consumer Image Styles, JSON API Extras, Decoupled Router, …).

I'm sure this is not a comprehensive list. And I'm sure I miss-represented the state of the GraphQL Drupal module, I
apologize for that. And don't mistake my words, the GraphQL module for Drupal is a piece of art. I think that many of
the points above stem from the fact that the JSON API module started the implementation earlier and the fact that it got
funding. It is clearly superior in the schema generation part, which is a bit buggy for JSON API (working on it).
