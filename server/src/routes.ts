import express from 'express';

const routes = express.Router();


routes.get('/', (request, response) => {
    return response.json([
        'Larissa'
    ]);
});

export default routes;