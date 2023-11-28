const fs = require('fs')
import { OrderCreateBody, OrderList, OrderListFilter, OrderResponse } from '../models/Order';
import KeyService from '../services/KeyService';

const fetcher = async (api: string, aToken: string, method: 'GET' | 'POST', body?: {}) => await fetch(`https://developers.cjdropshipping.com/api2.0/v1/shopping/order${api}`, { method: method, headers: { 'CJ-Access-Token': aToken, "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json())
const authFecth = async (aToken: string) => await fetch(`https://strapi3-gm7c.onrender.com/api/users/me`, { method: 'GET', headers: { 'Authorization': `Bearer ${aToken}` } }).then((res) => res.json())


/**
* Get all the Orders
*/
async function getOrders(): Promise<OrderListFilter[]> {
    const key = await KeyService.getKey();
    const orderList: OrderList = await fetcher(`/list`, key.data.accessToken, "GET")
    return orderList.data!.list!.filter((e) => e.orderStatus != 'TRASH')
}

/**
* Get order by user Id
*/
async function getOrdersByUser(JWT: string): Promise<OrderListFilter[]> {
    const key = await KeyService.getKey();
    const orderList: OrderList = await fetcher(`/list`, key.data.accessToken, "GET")
    return await authFecth(JWT).then((e) => {
        if ('error' in e) return e
        else return orderList.data!.list!.filter((el) => {
            return el.orderNum == e.id && el.orderStatus != 'TRASH'
        })
    })
}

/**
* Post an Order
*/
async function postOrder(order: OrderCreateBody, JWT: string): Promise<OrderResponse> {
    const key = await KeyService.getKey();
    return await authFecth(JWT).then(async (e) => {
        if ('error' in e) return e
        else {
            order.orderNumber = e.id
            order.shippingCustomerName = e.username
            console.log(order)
            const response: OrderResponse = await fetcher(`/createOrder`, key.data.accessToken, "POST", order)
            return response
        }
    })
}

export default {
    getOrders,
    getOrdersByUser,
    postOrder
} as const