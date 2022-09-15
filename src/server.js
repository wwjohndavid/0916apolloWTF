import { ApolloServer } from 'apollo-server';
import schemas from './schema.js';
import resolvers from './resolvers.js';
import { mergeSchemas } from 'graphql-tools';
import { getConfig } from './util';

const schema = mergeSchemas({
    schemas,
    resolvers
});

export const serverConfig = {
    schema,
    context: ({ req }) => ({
        // token: req.headers['authorization'],
        organizationId: req.headers['organization-id']
    })
};

export const instantiateServer = (customConfig = {}) =>
    new ApolloServer({
        ...serverConfig,
        ...customConfig,
        
    });

export async function startServer(server = instantiateServer(), customPort) {
    try {
        const port = customPort || getConfig('apolloPort');
        const host = '0.0.0.0';
        const { url } = await server.listen(process.env.port || { port }, host);
        console.log(`🚀  Apollo Server ready at ${url}.`);
    } catch (error) {
        console.error('Could not start server.', error);
    }
}
