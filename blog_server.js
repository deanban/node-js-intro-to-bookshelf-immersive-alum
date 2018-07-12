"use strict";

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./knexfile.js");

// Initialize Express.
const app = express();
app.use(bodyParser.json());

// Configure & Initialize Bookshelf & Knex.
console.log("Running in environment: " + process.env.NODE_ENV);
const knex = require("knex")(config[process.env.NODE_ENV]);
const bookshelf = require("bookshelf")(knex);

// This is a good place to start!

const User = bookshelf.Model.extend({
  tableName: "users",
  posts: () => {
    return this.hasMany(Posts);
  },
  comments: () => {
    return this.hasMany(Comments);
  }
});

const Posts = bookshelf.Model.extend({
  tableName: "posts",
  comments: () => {
    return this.hasMany(Comments);
  },
  user: () => {
    this.belongsTo(User);
  }
});

const Comments = bookshelf.Model.extend({
  tableName: "comments",
  posts: () => {
    return this.belongsTo(Posts);
  },
  user: () => {
    return this.belongsTo(User);
  }
});

// Exports for Server hoisting.
const listen = port => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    });
  });
};

exports.up = justBackend => {
  return knex.migrate
    .latest([process.env.NODE_ENV])
    .then(() => {
      return knex.migrate.currentVersion();
    })
    .then(val => {
      console.log("Done running latest migration:", val);
      return listen(3000);
    })
    .then(() => {
      console.log("Listening on port 3000...");
    });
};

exports.Posts = Posts;
exports.User = User;
exports.Comments = Comments;
