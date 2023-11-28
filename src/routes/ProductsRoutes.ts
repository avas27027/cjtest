import HttpStatusCodes from '../constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import ProductService from '../services/ProductService';

/**
 * Get all categories
 */
async function getCategoryList(_: IReq, res: IRes) {
    const catList = await ProductService.getAllCategories()
    return res.status(HttpStatusCodes.OK).json({ catList });
}

/**
 * Get all products
 */
async function getProductList(_: IReq, res: IRes) {
    const prodList = await ProductService.getProductList()
    return res.status(HttpStatusCodes.OK).json({ prodList });
}

/**
 * Get detail of a product
 */
async function getProductDetails(req: IReq, res: IRes) {
    const pid = req.params.pid
    const prodDetail = await ProductService.getProductDetails(pid)
    return res.status(HttpStatusCodes.OK).json({ prodDetail });
}

/**
 * Get all comments of a product
 */
async function getProductComments(req: IReq, res: IRes) {
    const pid = req.params.pid
    const prodComment = await ProductService.getProductComments(pid)
    return res.status(HttpStatusCodes.OK).json({ prodComment });
}

export default {
    getProductList,
    getCategoryList,
    getProductDetails,
    getProductComments
} as const