import { GraphQLSchema } from "graphql";
import { JsonData } from "./interfaces";
export declare class SchemaBuilder {
    private _jsonData;
    private _types;
    private _primaryKeys;
    private _extensions;
    private _schema;
    constructor(data: JsonData, pKeys?: string);
    private _buildPrimaryKeyObj;
    private _parseTypes;
    private _buildQuery;
    private _buildMutation;
    private _isRelationshipField;
    private _getRelatedType;
    private _buildExtensions;
    get schema(): GraphQLSchema;
}
