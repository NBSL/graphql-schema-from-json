import { extendSchema, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, parse } from "graphql";
import { _GraphQLNonNull } from "graphql/type/definition";
import { camelize, pluralize } from "inflection";
import { JsonData } from "./interfaces";
import { getRelatedType, getTypeFromKey } from "./nameConverter";
import { TypeMapper } from './TypeMapper'

const listMetadataType: GraphQLObjectType = new GraphQLObjectType({
    name: 'ListMetadata',
    fields: {
        count: { type: GraphQLInt },
    },
});

export class SchemaBuilder {
    private _jsonData: JsonData;
    private _types: Record<string, TypeMapper> = {}
    private _primaryKeys: Record<string, string>;
    private _extensions: string
    private _schema: GraphQLSchema
    constructor(data: JsonData, pKeys: string = "") {
        this._jsonData = data
        this._buildPrimaryKeyObj(pKeys)
        this._parseTypes()
    }
    private _buildPrimaryKeyObj(pKeys: string) {
        if (pKeys) {
            const keysArr = pKeys.split(',')
            if (keysArr.length > 0) {
                this._primaryKeys = this._primaryKeys || {}
                for (const pKey of keysArr) {
                    const [key, value] = pKey.split(':')
                    this._primaryKeys[getTypeFromKey(key)] = value
                }
            }
        }

    }
    private _parseTypes() {
        for (const key of Object.keys(this._jsonData)) {
            this._types[key] = new TypeMapper(key, this._jsonData[key], this._primaryKeys)
            if (this._types[key].subtypes) {
                for (const subKey of Object.keys(this._types[key].subtypes)) {
                    this._types[subKey] = this._types[key].subtypes[subKey]
                }
            }
        }
    }
    private _buildQuery(): GraphQLObjectType {
        return new GraphQLObjectType({
            name: 'Query',
            fields: Object.values(this._types).reduce<Record<string, any>>((fields, type) => {
                fields[type.Output.name] = {
                    type: type.Output,
                    args: {
                        [type.pKey]: { type: new GraphQLNonNull(GraphQLID) },
                    },
                };
                fields[`all${camelize(pluralize(type.Output.name))}`] = {
                    type: new GraphQLList(type.Output),
                    args: {
                        page: { type: GraphQLInt },
                        perPage: { type: GraphQLInt },
                        sortField: { type: GraphQLString },
                        sortOrder: { type: GraphQLString },
                        filter: { type: type.Input },
                    },
                };
                fields[`_all${camelize(pluralize(type.Output.name))}Meta`] = {
                    type: listMetadataType,
                    args: {
                        page: { type: GraphQLInt },
                        perPage: { type: GraphQLInt },
                        filter: { type: GraphQLString },
                    },
                };
                return fields;
            }, {}),
        })
    }

    private _buildMutation(): GraphQLObjectType {
        return new GraphQLObjectType({
            name: 'Mutation',
            fields: Object.values(this._types).reduce<Record<string, any>>((fields, type) => {
                const typeFields = type.Output.getFields();
                const nullableTypeFields = Object.keys(
                    typeFields
                ).reduce<Record<string, any>>((f, fieldName) => {
                    f[fieldName] = Object.assign({}, typeFields[fieldName], {
                        type:
                            fieldName !== type.pKey &&
                                typeFields[fieldName].type instanceof GraphQLNonNull
                                ? (typeFields[fieldName].type as any).ofType
                                : typeFields[fieldName].type,
                    });
                    return f;
                }, {});
                fields[`create${type.Output.name}`] = {
                    type: type.Output,
                    args: typeFields,
                };
                fields[`update${type.Output.name}`] = {
                    type: type.Output,
                    args: nullableTypeFields,
                };
                fields[`remove${type.Output.name}`] = {
                    type: GraphQLBoolean,
                    args: {
                        [type.pKey]: { type: new GraphQLNonNull(GraphQLID) },
                    },
                };
                return fields;
            }, {}),
        })
    }
    private _isRelationshipField(pKey: string) {
        const primaryKeys = this._primaryKeys ? Object.values(this._primaryKeys).filter((key) => key !== pKey) : false
        return function (fieldName: string) {
            return (primaryKeys ? fieldName.endsWith('_id') || primaryKeys.includes(fieldName) : fieldName.endsWith('_id'))
        }
    }

    private _getRelatedType(fieldName: string) {
        if (this._primaryKeys) {
            return Object.keys(this._primaryKeys).find(key => this._primaryKeys[key] === fieldName) || getRelatedType(fieldName)
        }
        return getRelatedType(fieldName)
    }
    private _buildExtensions() {
        return Object.values(this._types).reduce((ext, type) => {
            Object.keys(type.Output.getFields())
                .filter(this._isRelationshipField(type.pKey))
                .map(fieldName => {
                    const relType = this._getRelatedType(fieldName);
                    const rel = pluralize(type.Output.toString());
                    ext += `
    extend type ${type.Output} { ${relType}: ${relType} }
    extend type ${relType} { ${rel}: [${type.Output}] }`;
                });
            return ext;
        }, '')
    }

    public get schema() {
        if (this._schema) return this._schema
        const _schema = new GraphQLSchema({
            query: this._buildQuery(),
            mutation: this._buildMutation()
        })
        this._extensions = this._buildExtensions()
        this._schema = this._extensions
            ? extendSchema(_schema, parse(this._extensions))
            : _schema;
        return this._schema
    }
}