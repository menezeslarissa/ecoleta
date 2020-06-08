import express, { request } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();


// INDEX::ITEMS
routes.get('/items', itemsController.index);


//index items
routes.get('/items', itemsController.index);

// create poits
routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            lat: Joi.number().required(),
            lon: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required(),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);

// index points
routes.get('/points/', pointsController.index);

// show points by id 
routes.get('/points/:id', pointsController.show);

//delete all points
routes.delete('/points', pointsController.deleteAll);

//delete by id
routes.delete('/points/:id', pointsController.delete);

export default routes;