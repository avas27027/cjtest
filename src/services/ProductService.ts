import { ProductList, CategoryList, ProductDetail, ProductReview, Product } from '../models/Products';
import ProductRepo from '../repos/ProductRepo';
import KeyService from '../services/KeyService';

const CJfetcher = async (api: string, aToken: string, method: 'GET' | 'POST') => await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" } }).then((res) => res.json())
const Strapifetcher = async () => await fetch(`https://strapi3-gm7c.onrender.com/api/product-skus`, { method: "GET" }).then((res) => res.json())

/**
 * Sync the new products with the DB
 */
const delay = (ms = 2000) => new Promise(r => setTimeout(r, ms));
const syncNewProds = async (skuList: string[], key: string) => {
    const productList: Product[] = []
    for (const sku of skuList) {
        await delay()
        const newProd = await CJfetcher(`/list?productSku=${sku}`, key, "GET")
        productList.push(newProd.data.list![0])
    }
    await ProductRepo.syncProducts(productList)
}
const syncNewProdsInter = async (skuList: string[], key: string, syncMinutes: number) => {
    const firstProd = await ProductRepo.getAll()
    const now = new Date()
    if (firstProd.length != 0) {
        const prevDate = new Date(firstProd[0].syncDate!)
        const minBtw = ((now.getTime() - prevDate.getTime()) / 60000)
        if (minBtw > syncMinutes) {
            await syncNewProds(skuList, key)
            console.log("Products are syncronize")
        }
    }
    else {
        await syncNewProds(skuList, key)
    }
}

/**
 * GET all products
 */
async function getAllCategories(): Promise<CategoryList> {
    const key = await KeyService.getKey();
    const catList: CategoryList = await CJfetcher('/getCategory', key.data.accessToken, "GET")
    return catList
}
/**
 * Get all products
 */
async function getProductList(): Promise<Product[]> {
    const key = await KeyService.getKey();
    const skuResponse = await Strapifetcher();
    const skuList: string[] = skuResponse.data.map((e: { attributes: { SKU: string } }) => { return e.attributes.SKU })
    syncNewProdsInter(skuList, key.data.accessToken, 15)
    return await ProductRepo.getAll();
}

/**
 * Get detail of a product
 */
async function getProductDetails(pid: string): Promise<ProductDetail> {
    const key = await KeyService.getKey();
    const prodDetail: ProductDetail = await CJfetcher(`/query?pid=${pid}`, key.data.accessToken, "GET")
    return prodDetail;
}

/**
 * Get all comments of a product
 */
async function getProductComments(pid: string): Promise<ProductReview> {
    const key = await KeyService.getKey();
    const prodComment: ProductReview = await CJfetcher(`/comments?pid=${pid}`, key.data.accessToken, "GET")
    return prodComment;
}


export default {
    getAllCategories,
    getProductList,
    getProductDetails,
    getProductComments
}