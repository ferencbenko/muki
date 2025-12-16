import mysql from 'mysql2/promise';
import config from './index';

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

if (process.env.NODE_ENV !== 'test') {
  pool
    .getConnection()
    .then((connection) => {
      console.log('Database connected successfully');
      connection.release();
    })
    .catch((error) => {
      console.error('Database connection failed:', error.message);
    });
}

export default pool;
