import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
const serviceAccount = require('../../serviceAccountKey.json');
import { IKey } from '../models/Key';
import { Product } from '../models/Products';
import e from 'express';

export const DB_NAME_INVALID_ERR = 'DB name Invalid';

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

interface IDb {
    'key': IKey,
    'products': Product[]
}
enum dbName { 'KEY' = 'key', 'PRODUCT' = 'products' }
// **** Functions **** //

/**
 * Fetch the json from the file.
 */
async function openDb(): Promise<IDb> {
    const key: IKey = await db.collection('key').get().then((snapshot: any) => { return snapshot.docs[0].data() });
    const product: Product[] = await db.collection('products').get().then((snapshot: any) => {
        let data: Array<Product> = []
        snapshot.docs.forEach((e: any) => {
            data[data.length] = e.data()
        });
        return data
    });
    return { 'key': key, 'products': product }
}

/**
 * Update the file.
 */
async function saveDb(document: IKey | Product, name: dbName): Promise<void> {
    if (name == 'key') {
        await db.collection(name).doc('testData').set(document);
    }
    else if (name == 'products') {
        const ref = document as Product
        await db.collection(name).doc(ref.productSku).set(ref);
    }
}

/**
 * Delete the file.
 */
async function deleteDb(id: string, name: dbName): Promise<void> {
    await db.collection(name).doc(id).delete();
}

// **** Export default **** //

export default {
    openDb,
    saveDb,
    deleteDb,
    dbName
} as const;
