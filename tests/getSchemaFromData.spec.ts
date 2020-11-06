import {
    GraphQLBoolean,
    GraphQLID,
    // GraphQLInputObjectType,
    // GraphQLInputType,
    GraphQLInt,
    GraphQLList,
    // GraphQLNamedType,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import getSchemaFromData from '../src/getSchemaFromData';

const data = {
    posts: [
        {
            id: 1,
            title: 'Lorem Ipsum',
            views: 254,
            user_id: 123,
        },
        {
            id: 2,
            title: 'Sic Dolor amet',
            views: 65,
            user_id: 456,
        },
    ],
    users: [
        {
            id: 123,
            name: 'John Doe',
        },
        {
            id: 456,
            name: 'Jane Doe',
        },
    ],
};

const PostType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        User: { type: UserType },
    }),
});

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        Posts: { type: new GraphQLList(PostType) },
    }),
});

/*
const ListMetadataType = new GraphQLObjectType({
    name: 'ListMetadata',
    fields: {
        count: { type: GraphQLInt },
    },
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfPost: {
            type: new GraphQLList(PostType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
        getUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfUser: {
            type: new GraphQLList(UserType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
    },
});
*/
describe('getSchemaFromData ', () => {
    const schema = getSchemaFromData(data)
    const typeMap = schema.getTypeMap()
    const postTypeMap = typeMap['Post'] as GraphQLObjectType
    const userTypeMap = typeMap['User'] as GraphQLObjectType
    test('creates one type per data type', () => {
        // expect(postTypeMap.getFields()).toBeDefined()
        expect(postTypeMap!.name).toBeDefined()
        expect(postTypeMap!.name).toEqual(PostType.name);
        expect(Object.keys(postTypeMap.getFields())).toEqual(
            Object.keys(PostType.getFields())
        );
        expect(userTypeMap!.name).toEqual(UserType.name);
        expect(Object.keys(userTypeMap.getFields())).toEqual(
            Object.keys(UserType.getFields())
        );
    });

    test('creates one field per relationship', () => {
        expect(Object.keys(postTypeMap.getFields())).toContain('User');
    });

    test('creates one field per reverse relationship', () => {
        expect(Object.keys(userTypeMap.getFields())).toContain('Posts');
    });

    test('creates seven query fields per data type', () => {
        const queries = schema!.getQueryType()!.getFields();
        expect((queries['Post'].type as GraphQLObjectType).name).toEqual(PostType.name);
        expect(queries['Post'].args).toEqual([
            {
                astNode: undefined,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
            },
        ]);
        expect(queries['allPosts'].type.toString()).toEqual('[Post]');
        expect(queries['allPosts'].args[0].name).toEqual('page');
        expect(queries['allPosts'].args[0].type).toEqual(GraphQLInt);
        expect(queries['allPosts'].args[1].name).toEqual('perPage');
        expect(queries['allPosts'].args[1].type).toEqual(GraphQLInt);
        expect(queries['allPosts'].args[2].name).toEqual('sortField');
        expect(queries['allPosts'].args[2].type).toEqual(GraphQLString);
        expect(queries['allPosts'].args[3].name).toEqual('sortOrder');
        expect(queries['allPosts'].args[3].type).toEqual(GraphQLString);
        expect(queries['allPosts'].args[4].name).toEqual('filter');
        expect(queries['allPosts'].args[4].type.toString()).toEqual('PostFilter');
        expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');

        expect((queries['User'].type as GraphQLObjectType).name).toEqual(UserType.name);
        expect(queries['User'].args).toEqual([
            {
                astNode: undefined,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
            },
        ]);
        expect(queries['allUsers'].type.toString()).toEqual('[User]');
        expect(queries['allUsers'].args[0].name).toEqual('page');
        expect(queries['allUsers'].args[0].type).toEqual(GraphQLInt);
        expect(queries['allUsers'].args[1].name).toEqual('perPage');
        expect(queries['allUsers'].args[1].type).toEqual(GraphQLInt);
        expect(queries['allUsers'].args[2].name).toEqual('sortField');
        expect(queries['allUsers'].args[2].type).toEqual(GraphQLString);
        expect(queries['allUsers'].args[3].name).toEqual('sortOrder');
        expect(queries['allUsers'].args[3].type).toEqual(GraphQLString);
        expect(queries['allUsers'].args[4].name).toEqual('filter');
        expect(queries['allUsers'].args[4].type.toString()).toEqual('UserFilter');
        expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');
    });

    test('creates seven mutation fields per data type', () => {
        const mutations = schema.getMutationType()!.getFields();
        expect((mutations['createPost'].type as GraphQLObjectType).name).toEqual(PostType.name);
        expect(mutations['createPost'].args).toEqual([
            {
                astNode: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'title',
                type: new GraphQLNonNull(GraphQLString),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'views',
                type: new GraphQLNonNull(GraphQLInt),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'user_id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['updatePost'].type as GraphQLObjectType).name).toEqual(PostType.name);
        expect(mutations['updatePost'].args).toEqual([
            {
                astNode: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'title',
                type: GraphQLString,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'views',
                type: GraphQLInt,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'user_id',
                type: GraphQLID,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['removePost'].type as typeof GraphQLBoolean).name).toEqual(GraphQLBoolean.name);
        expect(mutations['removePost'].args).toEqual([
            {
                astNode: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['createUser'].type as GraphQLObjectType).name).toEqual(UserType.name);
        expect(mutations['createUser'].args).toEqual([
            {
                astNode: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'name',
                type: new GraphQLNonNull(GraphQLString),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['updateUser'].type as GraphQLObjectType).name).toEqual(UserType.name);
        expect(mutations['updateUser'].args).toEqual([
            {
                astNode: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
            {
                astNode: undefined,
                name: 'name',
                type: GraphQLString,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['removeUser'].type as typeof GraphQLBoolean).name).toEqual(GraphQLBoolean.name);
        expect(mutations['removeUser'].args).toEqual([
            {
                astNode: undefined,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
                name: 'id',
                type: new GraphQLNonNull(GraphQLID),
            },
        ]);
    });
})
describe('Inflection ', () => {
    test('pluralizes and capitalizes correctly', () => {
        const data = {
            feet: [{ id: 1, size: 42 }, { id: 2, size: 39 }],
            categories: [{ id: 1, name: 'foo' }],
        };
        const queries = getSchemaFromData(data).getQueryType()!.getFields();
        expect(queries).toHaveProperty('Foot');
        expect(queries).toHaveProperty('Category');
        expect(queries).toHaveProperty('allFeet');
        expect(queries).toHaveProperty('allCategories');
        const types = getSchemaFromData(data).getTypeMap();
        expect(types).toHaveProperty('Foot');
        expect(types).toHaveProperty('Category');
    });
})

