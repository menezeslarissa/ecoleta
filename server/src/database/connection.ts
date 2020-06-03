import knex from 'knex';
import path from  'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    }
});

export default connection;

// tabelas 
// points (pontos de coleta) : img, nome, email, whatsapp, lat, lon, city, uf
// itens (itens para coleta) : titulo, img

// n-n (points - itens) -- tablea pivot
// points_itens 

//migrations: histórico do banco de dados
