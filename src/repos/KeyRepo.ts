import { IKey } from '../models/Key';
import orm from './MockOrm';


async function get(): Promise<IKey> {
    const db = await orm.openDb();
    return db.key;
}
async function add(key: IKey): Promise<void> {
    const db = await orm.openDb();
    db.key = key;
    return orm.saveDb(db);
}

export default {
    get,
    add
} as const