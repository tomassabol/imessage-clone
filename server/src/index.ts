import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { GraphQLContext } from './util/types';

async function main() {
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    };

    /**
     * Context parameters
     */
    const prisma = new PrismaClient();
    // const pubsub = new PubSub();

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        context: async ({ req, res }): Promise<GraphQLContext> => {
            const session = await getSession( { req } )
            console.log('CONTEXT SESSION: ', session)
            return { 
                session
            };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
    });

    await server.start();
    server.applyMiddleware({ app, cors: corsOptions });

    await new Promise<void>((resolve) => 
        httpServer.listen({ port: 4000 }, resolve)
        );
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch((err) => console.error(err));