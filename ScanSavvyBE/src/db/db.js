const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.SQLHOST,
  port: process.env.SQLPORT,
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  database: process.env.SQLDATABASE,
});

module.exports = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.query(sql, params, (err, rows) => {
          connection.release();

          if (err) {
            reject(err);
            return;
          }

          resolve(rows);
        });
      });
    });
  },
};
