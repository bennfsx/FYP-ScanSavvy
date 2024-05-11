'use strict';
const mysql = require('promise-mysql');

const createUnixSocketPool = async config => {
  return mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
    // Specify additional properties here.
    ...config,
  });
};
module.exports = createUnixSocketPool;