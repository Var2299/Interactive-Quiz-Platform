// src/utils/db.js
import { openDB } from 'idb';

const DB_NAME = 'quiz-db';
const DB_VERSION = 1;
const STORE_NAME = 'attempts';

// Initialize or upgrade the IndexedDB database
const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addAttempt = async (attempt) => {
  const db = await initDB();
  await db.add(STORE_NAME, attempt);
};

export const getAttempts = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
