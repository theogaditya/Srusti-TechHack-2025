import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define the schema for the IndexedDB
interface ComplaintDBSchema extends DBSchema {
  complaints: {
    key: number; // Auto-incremented ID
    value: {
      title: string;
      description: string;
      address: string;
      district: string;
      pincode: string;
      urgencyLevel: string;
      consentForFollowUp: boolean;
      userEmail: string;
      upvotedBy: string[]; // Ensure this field is included
      upvotes: number; // Ensure this field is included
      createdAt: Date; // Ensure this field is included
    };
    indexes: { 'by-id': number };
  };
}

// Database and store names
const DB_NAME = 'complaintsDB';
const STORE_NAME = 'complaints';

// Initialize the database
const initDB = async (): Promise<IDBPDatabase<ComplaintDBSchema>> => {
  return openDB<ComplaintDBSchema>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('by-id', 'id');
      }
    },
  });
};

export const addComplaintToIndexedDB = async (complaint: Omit<ComplaintDBSchema['complaints']['value'], 'id'>): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add(complaint);
  console.log("Complaint saved to IndexedDB:", complaint);
  await tx.done;
};

export const getComplaintsFromIndexedDB = async (): Promise<ComplaintDBSchema['complaints']['value'][]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const complaints = await store.getAll();
  console.log("Complaints retrieved from IndexedDB:", complaints);
  return complaints;
};

export const clearComplaintsFromIndexedDB = async (): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  console.log("Complaints cleared from IndexedDB.");
  await tx.done;
};