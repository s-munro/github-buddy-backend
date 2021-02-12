exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("username").notNullable().unique();
    table.string("user_email").notNullable().unique();
    table.string("user_first_name");
    table.string("user_last_name");
    table.string("user_password").notNullable();
    table.integer("user_role").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
