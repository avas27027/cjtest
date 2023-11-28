//** Types */
export interface Product {
    "pid": string,
    "productName"?: string,
    "productNameEn"?: string,
    "productSku": string,
    "productImage"?: string,
    "productWeight"?: string,
    "productType"?: string,
    "productUnit"?: string | null,
    "categoryName"?: string,
    "listingCount"?: number,
    "sellPrice"?: string,
    "remark"?: string | null,
    "addMarkStatus"?: string | null,
    "createTime"?: string,
    "isVideo"?: string | null,
    "saleStatus"?: number,
    "listedNum"?: number,
    "supplierName"?: string | null,
    "supplierId"?: string | null,
    "categoryId"?: string,
    "sourceFrom"?: string,
    "shippingCountryCodes"?: string[],
    "syncDate"?:string
}

export interface ProductList {
    "code": number,
    "result": boolean,
    "message": string,
    "data": {
        "pageNum": number,
        "pageSize": number,
        "total": number,
        "list"?: Product[]
    },
    "requestId": string
}

export interface CategoryList {
    "code": number,
    "result": boolean,
    "message": string,
    "data"?: [
        {
            "categoryFirstName"?: string,
            "categoryFirstList"?: [
                {
                    "categorySecondName"?: string,
                    "categorySecondList"?: [
                        {
                            "categoryId"?: string,
                            "categoryName"?: string
                        },
                    ]
                }
            ]
        }
    ],
    "requestId": string
}

export interface ProductDetail {
    "code": number,
    "result": boolean,
    "message": string,
    "data"?: {
        "pid"?: string,
        "productName"?: string,
        "productNameEn"?: string,
        "productSku"?: string,
        "productImage"?: string,
        "productWeight"?: string,
        "productUnit"?: string,
        "productType"?: string,
        "categoryId"?: string,
        "categoryName"?: string,
        "entryCode"?: string,
        "entryName"?: string,
        "entryNameEn"?: string,
        "materialName"?: string,
        "materialNameEn"?: string,
        "materialKey"?: string,
        "packingWeight"?: string,
        "packingName"?: string,
        "packingNameEn"?: string,
        "packingKey"?: string,
        "productKey"?: string,
        "productKeyEn"?: string,
        "sellPrice"?: number,
        "sourceFrom"?: number,
        "description"?: string,
        "suggestSellPrice"?: string,
        "listedNum"?: number,
        "status"?: string,
        "supplierName"?: string,
        "supplierId"?: string,
        "variants"?: [
            {
                "vid"?: string,
                "pid"?: string,
                "variantName"?: string | null,
                "variantNameEn"?: string,
                "variantSku"?: string,
                "variantUnit"?: string | null,
                "variantProperty"?: string | null,
                "variantKey"?: string,
                "variantLength"?: number,
                "variantWidth"?: number,
                "variantHeight"?: number,
                "variantVolume"?: number,
                "variantWeight"?: number,
                "variantSellPrice"?: number,
                "createTime"?: string
                "variantStandard"?: string,
                "variantSugSellPrice"?: number
            }
        ],
        "createrTime": string
    },
    "requestId": string
}

export interface ProductReview {
    "success": boolean,
    "code": number,
    "message": string | null,
    "data": {
        "pageNum": string,
        "pageSize": number,
        "total": number,
        "list": [
            {
                "commentId": number,
                "pid": string,
                "comment": string,
                "commentDate": string,
                "commentUser": string,
                "score": string,
                "commentUrls": string[],
                "countryCode": string,
                "flagIconUrl": string
            }
        ],
        "requestId": string
    }
}