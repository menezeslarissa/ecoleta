import express, { request, response } from 'express';
import knex from './database/connection';

const routes = express.Router();

// listagem de items
routes.get('/items', async (request, response) => {
   const items = await knex('itens').select('*');

   const serializedItems = items.map(item => {
        return {
            id: item.id,
            title : item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
   });
   return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    // recurso de desestruturação do javascript
    // coloca cada campo em um variavel diferente qnd sabe qual formato do body
    const {
        name,
        email,
        whatsapp,
        lat,
        lon,
        city,
        uf,
        items
    } = request.body;

    // short syntax
    const ids = await knex('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        lat,
        lon,
        city,
        uf
    });

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id: ids[0],
        };
    });
    await knex('point_itens').insert(pointItems);
    return response.json({ success: true})
});

export default routes;