import { GraphQLSchema } from 'graphql';

declare function getRelationshipFromKey(key: string): string;
declare function getTypeFromKey(key: string): string;
declare function getRelatedKey(fieldName: string): string;
declare function getReverseRelatedField(key: string): string;
declare function getRelatedType(fieldName: string): string;

declare function _default(data: Record<string, Record<string, uknown>[]>, idArray?: string | string[]): GraphQLSchema;

declare const isRelationshipField: (fieldName: any) => any;

export default _default;
export { getRelatedKey, getRelatedType, getRelationshipFromKey, getReverseRelatedField, getTypeFromKey, isRelationshipField };
