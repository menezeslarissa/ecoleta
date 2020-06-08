import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    //index
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_itens', 'points.id', '=', 'point_itens.point_id')
            .whereIn('point_itens.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image}`
            }
        });

        return response.json(serializedPoints);
    }

    // create points
    async create(request: Request, response: Response) {
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

        const trx = await knex.transaction();


        // short syntax
        const point = await trx('points').insert({
            image: request.file.filename,
            name,
            email,
            whatsapp,
            lat,
            lon,
            city,
            uf
        });

        const lastInsertedIds = await trx('points').insert(point);

        const point_id = lastInsertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            };
        });

        
        await trx('point_itens').insert(pointItems);

        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point
         });
    }

    // show by id
    async show(request: Request, response: Response) {
        const point_id = request.params.id;

        const point = await knex('point').where('id', point_id).first();

        if (!point) {
            return response.status(400).json({ message: 'point.notFound' });
        }

        const serializedPoint = {
            ...point,
            image_url: `http:localhost:3333/uploads/${point.image}`
        };

        const items = await knex('itens')
            .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
            .where('point_itens.point_id', point_id)
            .select('itens.title');

        return response.json({
            point: serializedPoint,
            items
        });
    }

    //delete all points
    async deleteAll(request: Request, response: Response) {
        const point_delete = await knex('points').del();

        return response.json(point_delete);
    }

    //delete by id
    async delete(request: Request, response: Response) {
        const point_id = request.params.id;

        const point_delete = await knex('points')
            .where('id', point_id)
            .del();

        return response.json(point_delete);
    }


}

export default PointsController;


// const pointItems = items
// .split(',')
// .map((item: string) => Number(item.trim()))
// .map((item_id: number) => {
//   return {
//     item_id,
//     point_id
//   }
// })