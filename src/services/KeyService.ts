const fs = require('fs')
import { IKey } from '../models/Key';
import KeyRepo from '../repos/KeyRepo';
import EnvVars from '../constants/EnvVars';

const delay = (ms = 2000) => new Promise(r => setTimeout(r, ms));
const margin = EnvVars.Server_Config.syncMarginDays
async function newKey() {
    const keyPost = KeyRepo.add
    console.log(EnvVars.CJ.username, EnvVars.CJ.password)
    let cred = { email: EnvVars.CJ.username, password: EnvVars.CJ.password }
    const newKey: IKey = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken?", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cred) }).then((res) => res.json())
    await keyPost(newKey)
}

async function getKey(): Promise<IKey> {
    const keyGet = await KeyRepo.get()
    let today = new Date()
    if (keyGet.data != null) {
        let expireDate = new Date(keyGet.data.accessTokenExpiryDate)
        expireDate.setDate(expireDate.getDate() - margin)
        if (today >= expireDate) {
            newKey()
            return await KeyRepo.get()
        }
        else return await KeyRepo.get()
    }
    else {
        await delay()
        await newKey()
        return await KeyRepo.get()
    }
}

export default { getKey } as const