import { GraphQLFieldConfigMap, GraphQLType, GraphQLInputType } from "graphql";

export interface JsonData {
    [key: string]: JsonObj[]
}

export interface JsonObj {
    [key: string]: string | JsonObj[] | number | null | Record<string, any>
}

export interface FilterTypes {
    [key: string]: GraphQLInputType;
}


export interface FieldsObj {
    fields: FieldObj
}
export interface FieldObj {
    [key: string]: {
        type: GraphQLType
    };
}

export interface GQLObjType {
    name: string;
    FieldsObj
}

export interface FieldArgs {
    type: GraphQLType;
    args?: {
        [key: string]: { type: GraphQLType };
    };
}