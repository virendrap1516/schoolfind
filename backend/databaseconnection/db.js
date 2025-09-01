import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
   port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

let connection;

export async function initDb() {
  try {
    // Ensure database exists
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
       port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log(`Database ${process.env.DB_NAME} checked/created.`);

    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the MySQL database.');

    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

export function getDb() {
  if (!connection) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return connection;
}
