import HttpStatusCodes from '../constants/HttpStatusCodes';
import { OrderCreateBody } from '../models/Order';
import { IReq, IRes } from './types/express/misc';
import OrderService from '../services/OrderService';


/**
 * Get all the Orders
 */
async function getOrders(_: IReq, res: IRes) {
    const orderList = await OrderService.getOrders()
    return res.status(HttpStatusCodes.OK).json({ orderList });
}

/**
 * Get Orders by User
 */
async function getOrdersByUser(req: IReq<{ JWT: string }>, res: IRes) {
    const JWT = req.body.JWT
    const filterOrderList = await OrderService.getOrdersByUser(JWT)
    return res.status(HttpStatusCodes.OK).json({ filterOrderList });
}

/**
 * Post an Order
 */
async function postOrder(req: IReq<{ order: OrderCreateBody, JWT: string }>, res: IRes) {
    const { order, JWT } = req.body
    const response = await OrderService.postOrder(order, JWT)
    return res.status(HttpStatusCodes.OK).json({ response });
}

export default {
    getOrders,
    getOrdersByUser,
    postOrder,
} as const