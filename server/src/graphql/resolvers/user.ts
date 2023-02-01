const resolvers = {
    Query: {
        searchUsers: () => {},
    },
    Mutation: {
        createUsername: () => {
            console.log('createUsername from resolvers')
        },
    }
}

export default resolvers;