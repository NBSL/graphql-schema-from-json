import { GraphQLInputType, GraphQLType } from "graphql/type/definition";

export interface JsonData {
    [key: string]: Record<string, unknown>[]
}

export interface FilterTypes {
    [key: string]: GraphQLType | GraphQLInputType;
}

export interface Fields {
    [key: string]: FieldArgs;
}

export interface FieldArgs {
    type: GraphQLType;
    args?: {
        [key: string]: { type: GraphQLType };
    };
}