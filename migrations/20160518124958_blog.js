exports.up = function(knex, Promise) {
  knex.schema.createTable("users").then(userTabl => {
    userTabl.increments();
    userTabl.string("name");
    userTabl.string("username");
    userTabl.string("email");
  });
  knex.schema.createTable("posts").then(postsTabl => {
    postsTabl.increments();
    postsTabl.string("title");
    postsTabl.string("body");
    postsTabl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull()
      .onDelete("cascade");
  });
  knex.schema.createTable("comments").then(commTabl => {
    commTabl.increments();
    //   commTabl.string("title");
    commTabl.string("body");
    commTabl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull()
      .onDelete("cascade");
    commTabl
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .notNull()
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("users");
  knex.schema.dropTable("posts");
  knex.schema.dropTable("comments");
};
