const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'baseBase',
  password: '6969',
  port: 5432,
});

module.exports = pool;