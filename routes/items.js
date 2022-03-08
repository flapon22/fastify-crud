import {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
} from '../controllers/items.js';
import cool from 'cool-ascii-faces';

const item = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'},
    },
};

const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: item,
            },
        },
    },
    handler: getItems,
};

const getItemOpts = {
    schema: {
        response: {
            200: item,
        },
    },
    handler: getItem,
};

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: 'string'},
            },
        },
        response: {
            201: item,
        },
    },
    handler: addItem,
};

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'},
                },
            },
        },
    },
    handler: deleteItem,
};

const updateItemOpts = {
    schema: {
        response: {
            200: item,
        },
    },
    handler: updateItem,
};

function itemRoutes(fastify, options, done) {
    fastify.get('/', function (request, reply) {
        reply.send(cool());
    });

    fastify.get('/items', getItemsOpts);

    fastify.get('/items/:key', getItemOpts);

    fastify.post('/items', postItemOpts);

    fastify.delete('/items/:key', deleteItemOpts);

    fastify.put('/items/:key', updateItemOpts);

    done();
}

export default itemRoutes;
