import Knex from 'knex';

// realizar as alterações necessárias no banco
export async function up(knex: Knex){
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

// rollback
export async function down(knex: Knex){
    return knex.schema.dropTable('itens');
}