// **** Types **** //

export interface IKey {
  "code": number,
  "result": boolean,
  "message": string,
  "data": {
    "openId": number,
    "accessToken": string,
    "accessTokenExpiryDate": string,
    "refreshToken": string,
    "refreshTokenExpiryDate": string,
    "createDate": string
  },
  "requestId": string,
  "success": boolean
}

/**
 * Create new Key.
 */

function new_(
  code?: number,
  result?: boolean,
  message?: string,
  openId?: number,
  accessToken?: string,
  accessTokenExpiryDate?: string,
  refreshToken?: string,
  refreshTokenExpiryDate?: string,
  createDate?: string,
  requestId?: string,
  success?: boolean
): IKey {
  return {
    "code": code ?? 200,
    "result": result ?? false,
    "message": message ?? '',
    "data": {
      "openId": openId ?? -1,
      "accessToken": accessToken ?? '',
      "accessTokenExpiryDate": accessTokenExpiryDate ?? '',
      "refreshToken": refreshToken ?? '',
      "refreshTokenExpiryDate": refreshTokenExpiryDate ?? '',
      "createDate": createDate ?? ''
    },
    "requestId": requestId ?? '',
    "success": success ?? false
  }
}

export default {
  new: new_
}