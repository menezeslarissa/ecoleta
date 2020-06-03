import express, { request, response }  from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);
// Rota: endereço completo da nossa requisição
// Recurso: entidade que queremos acessar

/**
 * primeiro parametero é a rota e o segundo a func a ser exceutada
 */ 



