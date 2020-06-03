import Knex from 'knex';

// realizar as alterações necessárias no banco
export async function up(knex: Knex){
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal('lat').notNullable();
        table.decimal('lon').notNullable();
    });
}

// rollback
export async function down(knex: Knex){
    return knex.schema.dropTable('point');
}