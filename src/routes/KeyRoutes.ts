import HttpStatusCodes from '../constants/HttpStatusCodes';

import KeyService from '../services/KeyService';

import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get current Key.
 */
async function getKey(_: IReq, res: IRes) {
  const key = await KeyService.getKey();
  return res.status(HttpStatusCodes.OK).json({ key });
}

// **** Export default **** //

export default {
  getKey,
} as const;
