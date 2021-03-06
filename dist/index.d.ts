import { LoadTypedefsOptions, LoadSchemaOptions, UnnormalizedTypeDefPointer } from '@graphql-toolkit/core';
import { CodeFileLoaderOptions } from '@graphql-toolkit/code-file-loader';
import { DocumentNode, GraphQLSchema } from 'graphql';
export declare type ImportSchemaOptions<T = {}> = Partial<LoadSchemaOptions & LoadTypedefsOptions<CodeFileLoaderOptions>> & T;
declare type PointerOrPointers = UnnormalizedTypeDefPointer | UnnormalizedTypeDefPointer[];
export declare function importSchema(pointerOrPointers: PointerOrPointers, schemas?: {
    [key: string]: string;
}): string;
export declare function importSchema(pointerOrPointers: PointerOrPointers, schemas?: {
    [key: string]: string;
}, options?: ImportSchemaOptions<{
    out?: 'string';
}>): string;
export declare function importSchema(pointerOrPointers: PointerOrPointers, schemas?: {
    [key: string]: string;
}, options?: ImportSchemaOptions<{
    out: 'DocumentNode';
}>): DocumentNode;
export declare function importSchema(pointerOrPointers: PointerOrPointers, schemas?: {
    [key: string]: string;
}, options?: ImportSchemaOptions<{
    out: 'GraphQLSchema';
}>): GraphQLSchema;
export {};
