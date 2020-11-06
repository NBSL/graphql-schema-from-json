import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
// import type { GraphQLType } from 'graphql/type/definition';
import DateType from './DateType';

const isNumeric = (value: string) => !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
const valuesAreNumeric = (values: string[]) => values.every(isNumeric);
const isInteger = (value: unknown) => Number.isInteger(value);
const valuesAreInteger = (values: unknown[]) => values.every(isInteger);
const isBoolean = (value: unknown) => typeof value === 'boolean';
const valuesAreBoolean = (values: unknown[]) => values.every(isBoolean);
const isString = (value: unknown) => typeof value === 'string';
const valuesAreString = (values: unknown[]) => values.every(isString);
const isArray = (value: unknown) => Array.isArray(value);
const valuesAreArray = (values: unknown[]) => values.every(isArray);
const isDate = (value: unknown) => value instanceof Date;
const valuesAreDate = (values: unknown[]) => values.every(isDate);
const isObject = (value: unknown) =>
    Object.prototype.toString.call(value) === '[object Object]';
const valuesAreObject = (values: unknown[]) => values.every(isObject);

function requiredTypeOrNormal(type: any, isRequired: boolean) {
    return isRequired ? new GraphQLNonNull(type) : type;
}
export default (name: string, idArray: string[] = [], values: any[] = [], isRequired = false) => {
    if (name === 'id' || name.substr(name.length - 3) === '_id' || idArray.includes(name)) {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreArray(values)) {
            const leafValues = values.reduce((agg, arr) => {
                arr.forEach((value: any) => agg.push(value));
                return agg;
            }, []);
            if (valuesAreBoolean(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLBoolean),
                    isRequired
                );
            }
            if (valuesAreString(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLString),
                    isRequired
                );
            }
            if (valuesAreInteger(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLInt),
                    isRequired
                );
            }
            if (valuesAreNumeric(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLFloat),
                    isRequired
                );
            }
            if (valuesAreObject(leafValues)) {
                return requiredTypeOrNormal(GraphQLJSON, isRequired);
            } 1
            return requiredTypeOrNormal(
                new GraphQLList(GraphQLString),
                isRequired
            ); // FIXME introspect further
        }
        if (valuesAreBoolean(values)) {
            return requiredTypeOrNormal(GraphQLBoolean, isRequired);
        }
        if (valuesAreDate(values)) {
            return requiredTypeOrNormal(DateType, isRequired);
        }
        if (valuesAreString(values)) {
            return requiredTypeOrNormal(GraphQLString, isRequired);
        }
        if (valuesAreInteger(values)) {
            return requiredTypeOrNormal(GraphQLInt, isRequired);
        }
        if (valuesAreNumeric(values)) {
            return requiredTypeOrNormal(GraphQLFloat, isRequired);
        }
        if (valuesAreObject(values)) {
            return requiredTypeOrNormal(GraphQLJSON, isRequired);
        }
    }
    return requiredTypeOrNormal(GraphQLString, isRequired); // FIXME introspect further
};
