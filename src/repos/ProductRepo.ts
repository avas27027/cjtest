import { Product } from '../models/Products';
import FirebaseOrm from './FirebaseOrm';
import orm from './MockOrm';

// **** Functions **** //

/**
 * Get one product.
 */
async function getOne(sku: string): Promise<Product | null> {
  const db = await FirebaseOrm.openDb()
  for (const product of db.products) {
    if (product.productSku === sku) {
      return product;
    }
  }
  return null;
}

/**
 * See if a product with the given sku exists.
 */
async function persists(sku: string): Promise<boolean> {
  const db = await FirebaseOrm.openDb()
  for (const product of db.products) {
    if (product.productSku === sku) {
      return true;
    }
  }
  return false;
}

/**
 * Sync the products with another list of Sku's
 */
async function syncProducts(productsList: Product[]): Promise<void> {
  const db = await orm.openDb();
  const now = new Date()
  const formatDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`
  for (const newProds of productsList) {
    if (!await persists(newProds.productSku)) {
      await add(newProds)
    }
  }
  for (const product of db.products) {
    if (productsList.findIndex((e) => e.productSku === product.productSku) === -1) {
      await delete_(product.productSku)
    }
    else{
      product.syncDate = formatDate
      await update(product)
    }
  }
}

/**
 * Get all products.
 */
async function getAll(): Promise<Product[]> {
  const fDB = await FirebaseOrm.openDb()
  return fDB.products;
}

/**
 * Add one product.
 */
async function add(product: Product): Promise<void> {
  const now = new Date()
  product.syncDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}  ${now.getHours()}:${now.getMinutes()}`
  FirebaseOrm.saveDb(product, FirebaseOrm.dbName.PRODUCT)
}

/**
 * Update a product.
 */
async function update(product: Product): Promise<void> {
  FirebaseOrm.saveDb(product, FirebaseOrm.dbName.PRODUCT)
}

/**
 * Delete one product.
 */
async function delete_(sku: string): Promise<void> {
  FirebaseOrm.deleteDb(sku, FirebaseOrm.dbName.PRODUCT)
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  syncProducts,
} as const;
