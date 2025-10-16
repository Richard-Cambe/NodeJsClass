export function registerErrorMiddleware(fastify){
    fastify.setErrorHandler((error, request, reply) => {
        if(error.name === "Not Found Error"){
            reply.state(404).send({ ok: false, message: error.message });
        } else {
            reply.status(500).send({ ok: false});
        }
    });
};