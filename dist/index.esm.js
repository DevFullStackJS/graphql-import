import { loadSchemaSync, loadTypedefsSync, OPERATION_KINDS } from '@graphql-toolkit/core';
import { UrlLoader } from '@graphql-toolkit/url-loader';
import { JsonFileLoader } from '@graphql-toolkit/json-file-loader';
import { GraphQLFileLoader } from '@graphql-toolkit/graphql-file-loader';
import { CodeFileLoader } from '@graphql-toolkit/code-file-loader';
import { parse, print } from 'graphql';
import { mergeTypeDefs } from '@graphql-toolkit/schema-merging';

const DEFAULT_SCHEMA_LOADERS = [
    new UrlLoader(),
    new JsonFileLoader(),
    new GraphQLFileLoader(),
    new CodeFileLoader(),
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
        filterKinds: OPERATION_KINDS,
        sort: false,
        forceGraphQLImport: true,
        useSchemaDefinition: false,
        ...options,
    };
    const out = options.out;
    if (out === 'GraphQLSchema') {
        return loadSchemaSync(pointerOrPointers, allOptions);
    }
    else {
        const results = loadTypedefsSync(pointerOrPointers, allOptions);
        const mergedDocuments = mergeTypeDefs(results.map(r => r.document), allOptions);
        if (out === 'DocumentNode') {
            if (typeof mergedDocuments === 'string') {
                return parse(mergedDocuments);
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
                return print(mergedDocuments);
            }
            return '';
        }
    }
}

export { importSchema };
