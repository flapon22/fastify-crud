import Fastify from 'fastify';
import itemRoutes from './routes/items.js';
import fastifySwagger from 'fastify-swagger';

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'fastify-api'},
    },
});

fastify.register(itemRoutes);

const PORT = 5000;

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
