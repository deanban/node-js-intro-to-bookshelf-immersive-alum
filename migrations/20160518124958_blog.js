exports.up = function(knex, Promise) {
  knex.schema.createTable("users").then(tb1 => {
    tb1.increments();
    tb1.string("name");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.destroyTable("users");
};
