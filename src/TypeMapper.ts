import { GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLString } from "graphql";
import DateType from "./DateType";
import { JsonObj } from "./interfaces";
import { getTypeFromKey } from "./nameConverter";
import { isFloat, isDate, isObject, every } from "./utils";

export class TypeMapper {
    public pKey: string;
    public subtypes: Record<string, TypeMapper> = {};

    private _entities: JsonObj[];
    private _typeName: string;
    private _pKeys: Record<string, string>;
    private _values: Record<string, any[]>
    private _output: GraphQLObjectType;
    private _input: GraphQLInputObjectType;
    constructor(name: string, entities: JsonObj[], pKeys: Record<string, string> = {}) {
        this._typeName = name
        this._entities = entities
        this.pKey = pKeys[getTypeFromKey(name)] || 'id'
        this._pKeys = pKeys
        this._getValuesFromEntities(entities)
    }

    private _getValuesFromEntities(entities: JsonObj[]) {
        this._values = entities.reduce<Record<string, unknown[]>>((values, entity) => {
            Object.keys(entity).forEach(fieldName => {
                if (!values[fieldName]) {
                    values[fieldName] = [];
                }
                if (entity[fieldName] != null) {
                    values[fieldName].push(entity[fieldName]);
                }
            });
            return values;
        }, {});
    }

    private _getTypes(required = true) {
        const fields = {}
        for (const key of Object.keys(this._values)) {
            const values = this._values[key]
            const nonNull = required ? values.length === this._entities.length : false
            let fieldType;
            if (every(values, Array.isArray)) {
                const listValues: any[] = [].concat(...values)
                // console.log(this._typeName, "Array", values, listValues);
                fieldType = new GraphQLList(this._getType(key, listValues))
            } else {
                // console.log(this._typeName, "Single", values);
                fieldType = this._getType(key, values)
            }
            fields[key] = { type: this.subtypes[key] ? fieldType : nonNull ? GraphQLNonNull(fieldType) : fieldType }
        }
        return fields
    }
    private _getType(name: string, values: any[]) {
        if (
            name === this.pKey ||
            name.substr(name.length - 3) === '_id' ||
            Object.values(this._pKeys).includes(name)
        ) {
            return GraphQLID
        }
        if (every(values, isObject)) {
            if (this.subtypes[name]) return this.subtypes[name].Output
            this.subtypes[name] = new TypeMapper(name, values, this._pKeys)
            return this.subtypes[name].Output
        }
        if (every(values, 'boolean')) {
            return GraphQLBoolean
        }
        if (every(values, Number.isInteger)) {
            return GraphQLInt
        }
        if (every(values, isFloat)) {
            return GraphQLFloat
        }
        if (every(values, isDate)) {
            return DateType
        }
        return GraphQLString
    }

    private _getRangeFilters() {
        return Object.keys(this._values).reduce<Record<string, any>>((fields, fieldName) => {
            const fieldType = this._getType(
                fieldName,
                this._values[fieldName],
            );
            if (
                fieldType == GraphQLInt ||
                fieldType == GraphQLFloat ||
                fieldName == 'Date'
            ) {
                fields[`${fieldName}_lt`] = { type: fieldType };
                fields[`${fieldName}_lte`] = { type: fieldType };
                fields[`${fieldName}_gt`] = { type: fieldType };
                fields[`${fieldName}_gte`] = { type: fieldType };
            }
            return fields;
        }, {});
    }

    public get Output(): GraphQLObjectType {
        if (this._output) return this._output
        this._output = new GraphQLObjectType({
            name: getTypeFromKey(this._typeName),
            fields: this._getTypes()
        })
        return this._output
    }

    public get Input(): GraphQLInputObjectType {
        if (this._input) return this._input
        this._input = new GraphQLInputObjectType({
            name: `${getTypeFromKey(this._typeName)}Filter`,
            fields: Object.assign(
                {
                    q: { type: GraphQLString },
                },
                this._getTypes(false),
                this._getRangeFilters()
            ),
        })
        return this._input
    }
}