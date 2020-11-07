import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { SchemaBuilder } from '../src/'
import DateType from '../src/DateType';

const data = {
    posts: [
        {
            id: 1,
            title: 'Lorem Ipsum',
            views: 254,
            created_at: new Date("2020-02-22"),
            rating: 4.5,
            user_id: 123,
            hidden: true,
            audits: [
                {
                    user: "Admin",
                    message: "Lorem Ipsum"
                }
            ]
        },
        {
            id: 2,
            title: 'Sic Dolor amet',
            views: 65,
            created_at: new Date("2020-03-05"),
            rating: 3.1,
            user_id: 456,
            hidden: false,
            audits: [
                {
                    user: "Admin",
                    message: "Sic Dolor amet"
                }
            ]
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

const dataWithKeys = {
    posts: [
        {
            PostID: 1,
            title: 'Lorem Ipsum',
            views: 254,
            created_at: new Date("2020-02-22"),
            rating: 4.5,
            UserID: 123,
            hidden: true,
            audits: [
                {
                    user: "Admin",
                    message: "Lorem Ipsum"
                }
            ]
        },
        {
            PostID: 2,
            title: 'Sic Dolor amet',
            views: 65,
            created_at: new Date("2020-03-05"),
            rating: 3.1,
            UserID: 456,
            hidden: false,
            audits: [
                {
                    user: "Admin",
                    message: "Sic Dolor amet"
                }
            ]
        },
    ],
    users: [
        {
            UserID: 123,
            name: 'John Doe',
        },
        {
            UserID: 456,
            name: 'Jane Doe',
        },
    ],
}

const AuditType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Audit',
    fields: () => ({
        user: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const PostType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: new GraphQLNonNull(GraphQLInt) },
        created_at: { type: new GraphQLNonNull(DateType) },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        hidden: { type: new GraphQLNonNull(GraphQLBoolean) },
        audits: { type: new GraphQLList(AuditType) },
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

const PostTypeCustom: GraphQLObjectType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        PostID: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: new GraphQLNonNull(GraphQLInt) },
        created_at: { type: new GraphQLNonNull(DateType) },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        UserID: { type: new GraphQLNonNull(GraphQLID) },
        hidden: { type: new GraphQLNonNull(GraphQLBoolean) },
        audits: { type: new GraphQLList(AuditType) },
        User: { type: UserType },
    }),
});

const UserTypeCustom: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        UserID: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        Posts: { type: new GraphQLList(PostType) },
    }),
});



describe("SchemaBuild ", () => {
    describe("Without user provided primary keys", () => {
        createTest(data, PostType, UserType)
    })
    describe("With user provided primary keys", () => {
        createTest(dataWithKeys, PostTypeCustom, UserTypeCustom, "users:UserID,posts:PostID")
    })
})
describe('Inflection ', () => {
    test('pluralizes and capitalizes correctly', () => {
        const data = {
            feet: [{ id: 1, size: 42 }, { id: 2, size: 39 }],
            categories: [{ id: 1, name: 'foo' }],
        };
        const schema = new SchemaBuilder(data).schema
        const queries = schema.getQueryType()!.getFields();
        expect(queries).toHaveProperty('Foot');
        expect(queries).toHaveProperty('Category');
        expect(queries).toHaveProperty('allFeet');
        expect(queries).toHaveProperty('allCategories');
        const types = schema.getTypeMap();
        expect(types).toHaveProperty('Foot');
        expect(types).toHaveProperty('Category');
    });
})

function createTest(data: Record<string, any>, posts: GraphQLObjectType, users: GraphQLObjectType, pkeys = "") {
    const schema = new SchemaBuilder(data, pkeys)
    const typeMap = schema.schema.getTypeMap()
    const postTypeMap = typeMap['Post'] as GraphQLObjectType
    const userTypeMap = typeMap['User'] as GraphQLObjectType
    test('creates one type per data type', () => {
        // expect(postTypeMap.getFields()).toBeDefined()
        expect(postTypeMap!.name).toBeDefined()
        expect(postTypeMap!.name).toEqual(posts.name);
        expect(Object.keys(postTypeMap.getFields())).toEqual(
            Object.keys(posts.getFields())
        );
        expect(userTypeMap!.name).toEqual(users.name);
        expect(Object.keys(userTypeMap.getFields())).toEqual(
            Object.keys(users.getFields())
        );
    });

    test('creates one field per relationship', () => {
        expect(Object.keys(postTypeMap.getFields())).toContain('User');
    });

    test('creates one field per reverse relationship', () => {
        expect(Object.keys(userTypeMap.getFields())).toContain('Posts');
    });

    test('creates seven query fields per data type', () => {
        const queries = schema.schema.getQueryType()!.getFields();
        expect((queries['Post'].type as GraphQLObjectType).name).toEqual(posts.name);
        expect(queries['Post'].args).toEqual([
            {
                astNode: undefined,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
                name: queries['Post'].args[0].name,
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

        expect((queries['User'].type as GraphQLObjectType).name).toEqual(users.name);
        expect(queries['User'].args).toEqual([
            {
                astNode: undefined,
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
                name: queries['User'].args[0].name,
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
        const mutations = schema.schema.getMutationType()!.getFields();
        expect((mutations['createPost'].type as GraphQLObjectType).name).toEqual(posts.name);
        expect(mutations['createPost'].args.length).toEqual(8)
        expect((mutations['updatePost'].type as GraphQLObjectType).name).toEqual(posts.name);
        expect(mutations['updatePost'].args.length).toEqual(8);
        expect((mutations['removePost'].type as typeof GraphQLBoolean).name).toEqual(GraphQLBoolean.name);
        expect(mutations['removePost'].args).toEqual([
            {
                astNode: undefined,
                name: mutations['removePost'].args[0].name,
                type: new GraphQLNonNull(GraphQLID),
                defaultValue: undefined,
                deprecationReason: undefined,
                description: undefined,
                extensions: undefined,
            },
        ]);
        expect((mutations['createUser'].type as GraphQLObjectType).name).toEqual(users.name);
        expect(mutations['createUser'].args).toEqual([
            {
                astNode: undefined,
                name: mutations['createUser'].args[0].name,
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
        expect((mutations['updateUser'].type as GraphQLObjectType).name).toEqual(users.name);
        expect(mutations['updateUser'].args).toEqual([
            {
                astNode: undefined,
                name: mutations['updateUser'].args[0].name,
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
                name: mutations['removeUser'].args[0].name,
                type: new GraphQLNonNull(GraphQLID),
            },
        ]);
    });
}