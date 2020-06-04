import Knex from 'knex';

// realizar as alterações necessárias no banco
export async function up(knex: Knex){
    return knex.schema.createTable('point_itens', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('itens');
    });
}

// rollback
export async function down(knex: Knex){
    return knex.schema.dropTable('point_itens');
}