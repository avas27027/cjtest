
//** Types */
/**
 * All in dollars US ($)
 */
export interface OrderList {
    "code": number,
    "result": boolean,
    "message": string,
    "data"?: {
        "pageNum"?: number,
        "pageSize"?: number,
        "total"?: number,
        "list"?: [
            {
                "orderId"?: string,
                "orderNum"?: string,
                "cjOrderId"?: string | null,
                "shippingCountryCode"?: string,
                "shippingProvince"?: string,
                "shippingCity"?: string,
                "shippingPhone"?: string,
                "shippingAddress"?: string,
                "shippingCustomerName"?: string,
                "remark"?: string,
                "orderWeight"?: number,
                "orderStatus"?: string,
                "orderAmount"?: number | null,
                "productAmount"?: number,
                "postageAmount"?: string | null,
                "logisticName"?: string | null,
                "trackNumber"?: string | null,
                "createDate"?: string,
                "paymentDate"?: string | null,
                "productList"?: string | null
            }
        ]
    }
}

export interface OrderListFilter{
    "orderId"?: string,
    "orderNum"?: string,
    "cjOrderId"?: string | null,
    "shippingCountryCode"?: string,
    "shippingProvince"?: string,
    "shippingCity"?: string,
    "shippingPhone"?: string,
    "shippingAddress"?: string,
    "shippingCustomerName"?: string,
    "remark"?: string,
    "orderWeight"?: number,
    "orderStatus"?: string,
    "orderAmount"?: number | null,
    "productAmount"?: number,
    "postageAmount"?: string | null,
    "logisticName"?: string | null,
    "trackNumber"?: string | null,
    "createDate"?: string,
    "paymentDate"?: string | null,
    "productList"?: string | null
}

export interface OrderCreateBody {
    "orderNumber": string,
    "shippingZip": string,
    "shippingCountryCode": string,
    "shippingCountry": string,
    "shippingProvince": string,
    "shippingCity": string,
    "shippingAddress": string,
    "shippingCustomerName": string,
    "shippingPhone": string,
    "remark": string,
    "fromCountryCode": string,
    "logisticName": "PostNL" | "DHL" | "UPS",
    "houseNumber": string,
    "products": [
        {
            "vid": string, //variant_id
            "quantity": number,
            "shippingName": string
        }
    ]
}

export interface OrderResponse {
    "code": number,
    "result": boolean,
    "message": string,
    "data": string | null,
    "requestId": string
}

/**
 * See if the param meets criteria to be an order.
 */
function isOrder(arg: unknown): boolean {
    return (
        !!arg &&
        typeof arg === 'object' &&
        'orderNumber' in arg &&
        'shippingZip' in arg &&
        'shippingCountryCode' in arg &&
        'shippingCountry' in arg &&
        'shippingProvince' in arg &&
        'shippingCity' in arg &&
        'shippingAddress' in arg &&
        //'shippingCustomerName' in arg &&
        'shippingPhone' in arg &&
        'remark' in arg &&
        'fromCountryCode' in arg &&
        'logisticName' in arg &&
        'products' in arg
    );
}

export default {
    isOrder
} as const