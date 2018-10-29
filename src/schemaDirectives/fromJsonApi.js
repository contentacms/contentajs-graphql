// @flow

import type { Resolver } from '@contentacms/contenta-graphql/types/graphql';
import type {
  JsonApiRelatonship,
  JsonApiResource,
} from '@contentacms/contenta-graphql/types/jsonapi';
import type { GotResponse } from '@contentacms/contenta-graphql/types/got';

type FieldDefinition = { resolve: Resolver };

const _ = require('lodash');
const { defaultFieldResolver, GraphQLList } = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');

const got = require('got');

class FromJsonApi extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: FieldDefinition) {
    return this.visitInputFieldDefinition(field);
  }
  visitInputFieldDefinition(field: FieldDefinition) {
    // We must mutate the passed field definition because, otherwise, directives
    // override each other, allowing only one directive at a time.
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (src, args, context) => {
      // First try to resolve with explicit resolvers.
      try {
        const defaultRes = await resolve.apply(this, src, args, context);
        if (!_.isUndefined(defaultRes)) {
          return defaultRes;
        }
      } catch (e) {}
      // Then fallback to object mapping.
      const { query } = this.args;
      const { cmsHost, jsonApiPrefix } = context;
      const jsonApiQuery = `${cmsHost}${jsonApiPrefix}${query}`;
      // Replace variable placeholders.
      const res = await got(this._applyTemplateVariables(jsonApiQuery, args), {
        json: true,
      });
      const resolved = this._processApiResponse(
        res,
        this.visitedType.type instanceof GraphQLList
      );
      // TODO: For any explicitly resolved fields, execute the resolvers manually.
      return resolved;
    };
  }

  /**
   * Takes a templated URL and replaces the variables from the vars.
   *
   * @param {string} templatedUrl
   *   The templated URL.
   * @param {ObjectLiteral} vars
   *   The variable values to replace keyed by name.
   *
   * @return {string}
   *   The resolved URL.
   *
   * @protected
   */
  _applyTemplateVariables(
    templatedUrl: string,
    vars: { [string]: any }
  ): string {
    return Object.keys(vars).reduce(
      (carry, varName) =>
        carry.replace(
          new RegExp(`{${varName}}`),
          encodeURIComponent(vars[varName])
        ),
      templatedUrl
    );
  }

  /**
   * Finds relationships in the includes section.
   *
   * @param {{ [string]: JsonApiRelatonship }} rels
   *   The relationships.
   * @param {JsonApiResource[]} includes
   *   The includes in the response.
   * @param {Map<string, ?JsonApiResource>} relMap
   *   A mapping of relationships for improved performance.
   *
   * @return {[string]: ?JsonApiResource}
   *   The related resources.
   *
   * @protected
   */
  _findRelsInIncludes(
    rels: { [string]: JsonApiRelatonship },
    includes: JsonApiResource[],
    relMap: Map<string, ?JsonApiResource>
  ) {
    const relNames = Object.keys(rels);
    const relVals = relNames.map(relName => {
      const type = _.get(rels, [relName, 'data', 'type']);
      const id = _.get(rels, [relName, 'data', 'id']);
      const cacheKey = `${type}:${id}`;
      let included;
      if (relMap.has(cacheKey)) {
        included = relMap.get(cacheKey);
      } else {
        included = includes.find(
          include => include.type === type && include.id === id
        );
        relMap.set(cacheKey, included);
      }
      return included ? this._mapJsonApiObjects(included, includes) : null;
    });
    return _.zipObject(relNames, relVals);
  }

  /**
   * Maps a JSON API object into the GraphQL schema.
   *
   * @param {JsonApiResource[] | JsonApiResource} input
   *   The 'data' contents of a JSON API document.
   * @param {JsonApiResource[]} includes
   *   The 'included' property of a JSON API document.
   *
   * @return {any}
   *   The resolved shape according to the GraphQL schema.
   *
   * @protected
   */
  _mapJsonApiObjects(
    input: JsonApiResource[] | JsonApiResource,
    includes: JsonApiResource[]
  ) {
    const relMap = new Map();
    const mapped = []
      .concat(input)
      .map<JsonApiResource>((item: JsonApiResource) => ({
        id: _.get(item, 'id'),
        type: _.get(item, 'type'),
        ..._.get(item, 'attributes'),
        ...this._findRelsInIncludes(
          _.get(item, 'relationships', {}),
          includes,
          relMap
        ),
      }));
    return Array.isArray(input) ? mapped : mapped.pop();
  }

  /**
   * Takes the JSON API response and produces the hierarchical GraphQL struct.
   *
   * @param {GotResponse} res
   *   The response object from the got library.
   * @param {boolean} isList
   *   Indicates if the GraphQL type we are mapping to is a list or not.
   *
   * @return {any}
   *   The mapped object ready to deliver to the GraphQL resolver.
   *
   * @protected
   */
  _processApiResponse(res: GotResponse, isList: boolean): any {
    let data = _.get(res, 'body.data');
    if (isList) {
      data = Array.isArray(data) ? data : [data];
    } else {
      data = Array.isArray(data) ? data[0] : data;
    }
    return this._mapJsonApiObjects(data, _.get(res, 'body.included'));
  }
}

module.exports = FromJsonApi;
