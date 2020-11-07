import { GraphQLObjectType, GraphQLInputObjectType } from "graphql";
import { JsonObj } from "./interfaces";
export declare class TypeMapper {
    pKey: string;
    subtypes: Record<string, TypeMapper>;
    private _entities;
    private _typeName;
    private _pKeys;
    private _values;
    private _output;
    private _input;
    constructor(name: string, entities: JsonObj[], pKeys?: Record<string, string>);
    private _getValuesFromEntities;
    private _getTypes;
    private _getType;
    private _getRangeFilters;
    get Output(): GraphQLObjectType;
    get Input(): GraphQLInputObjectType;
}
