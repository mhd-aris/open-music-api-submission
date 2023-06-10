const { Pool } = require('pg');

const pool = new Pool();

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
    return true;
  } catch (error) {
    console.error('Failed to connect to the database : ', error.message);
    return false;
  }
};

module.exports = { testConnection };
