import Fastify from 'fastify'
import { registerPostRoutes } from './controllers/post.js'
import { registerUserRoutes } from './controllers/auth.js';
import FastifyAuth from '@fastify/auth'
import { registerAuthMiddlewares } from './middlewares/auth.js';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import dotenv from 'dotenv';

dotenv.config();

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

await fastify.register(FastifyAuth);

await fastify.register(fastifySwagger, {
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

fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' }
})

registerAuthMiddlewares(fastify);
registerPostRoutes(fastify);
registerUserRoutes(fastify);


try {
    await fastify.listen({ 
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost' 
    });
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

await fastify.ready();