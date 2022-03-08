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

const port = 5000;

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || port, '0.0.0.0');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
