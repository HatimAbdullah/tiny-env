import { Connection, createConnection } from 'typeorm';

const initializeDB = async (): Promise<void> => {
  try {
    const conn: Connection = await createConnection();
    await conn.synchronize();
    console.log('Database successfully initialized');
  } catch (error) {
    console.log(`Database failed to connect ${error.message}`);
  }
};

export default initializeDB;