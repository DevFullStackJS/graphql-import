'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@graphql-toolkit/core');
const urlLoader = require('@graphql-toolkit/url-loader');
const jsonFileLoader = require('@graphql-toolkit/json-file-loader');
const graphqlFileLoader = require('@graphql-toolkit/graphql-file-loader');
const codeFileLoader = require('@graphql-toolkit/code-file-loader');
const graphql = require('graphql');
const schemaMerging = require('@graphql-toolkit/schema-merging');

const DEFAULT_SCHEMA_LOADERS = [
    new urlLoader.UrlLoader(),
    new jsonFileLoader.JsonFileLoader(),
    new graphqlFileLoader.GraphQLFileLoader(),
    new codeFileLoader.CodeFileLoader(),
];
function importSchema(pointerOrPointers, schemas, options = {}) {
    for (const key in schemas) {
        options.cache = options.cache || {};
        options.cache[key] = {
            rawSDL: schemas[key],
        };
    }
    const allOptions = {
        loaders: DEFAULT_SCHEMA_LOADERS,
        filterKinds: core.OPERATION_KINDS,
        sort: false,
        forceGraphQLImport: true,
        useSchemaDefinition: false,
        ...options,
    };
    const out = options.out;
    if (out === 'GraphQLSchema') {
        return core.loadSchemaSync(pointerOrPointers, allOptions);
    }
    else {
        const results = core.loadTypedefsSync(pointerOrPointers, allOptions);
        const mergedDocuments = schemaMerging.mergeTypeDefs(results.map(r => r.document), allOptions);
        if (out === 'DocumentNode') {
            if (typeof mergedDocuments === 'string') {
                return graphql.parse(mergedDocuments);
            }
            else {
                return mergedDocuments;
            }
        }
        else {
            if (typeof mergedDocuments === 'string') {
                return mergedDocuments;
            }
            else if (mergedDocuments) {
                return graphql.print(mergedDocuments);
            }
            return '';
        }
    }
}

exports.importSchema = importSchema;
