import Fastify from 'fastify'
import { registerPostRoutes } from './controllers/post.js'
import { registerUserRoutes } from './controllers/auth.js';
import FastifyAuth from '@fastify/auth'
import { registerAuthMiddlewares } from './middlewares/auth.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';


const logger = {
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid, hostname',
            singleline: true,
            colorize: true,
        },
    },
};

const fastify = Fastify({
    logger
})


fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
})
await fastify.register(FastifyAuth);

await Fastify.register(fastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
});

await fastify.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
        doxExpansion: 'list'
    }
});

await fastify.ready();

registerPostRoutes(fastify);
registerUserRoutes(fastify);
registerAuthMiddlewares(fastify);

try {
    await fastify.listen({ 
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost' 
    });
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}