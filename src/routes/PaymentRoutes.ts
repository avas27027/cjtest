import HttpStatusCodes from '../constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import PaypalService from '../services/PaypalService';


async function paypalCreateOrder(req: IReq<{ cart: string }>, res: IRes) {
    try {
        // use the cart information passed from the front-end to calculate the order amount detals
        const { cart } = req.body;
        const { jsonResponse, httpStatusCode } = await PaypalService.createOrder(cart);
        return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create order." });
    }
}

async function paypalCaptureOrder(req: IReq<{ orderID: string }>, res: IRes) {
    try {
        const { orderID } = req.params;
        const { jsonResponse, httpStatusCode } = await PaypalService.captureOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to capture order." });
    }
}

export default {
    paypalCaptureOrder,
    paypalCreateOrder
}