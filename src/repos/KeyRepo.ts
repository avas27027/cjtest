import { IKey } from '../models/Key';
import FirebaseOrm from './FirebaseOrm';
import orm from './MockOrm';


async function get(): Promise<IKey> {
    const snapshot = await FirebaseOrm.openDb()
    //const db = await orm.openDb();
    return snapshot.key;
}
async function add(key: IKey): Promise<void> {
    await FirebaseOrm.saveDb(key, FirebaseOrm.dbName.KEY)
    //const db = await orm.openDb();
    //db.key = key;
    //return orm.saveDb(db);
}

export default {
    get,
    add
} as const