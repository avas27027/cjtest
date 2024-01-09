import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { IReq, IRes } from './types/express/misc';
import UserService from "@src/services/UserService";

const auth = UserService.auth
/**
 * SignIn user
 */
async function singInFirebase(req: IReq<{ email: string, password: string }>, res: IRes) {
    const { email, password } = req.body
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //console.log(userCredential.user.uid)
            return userCredential.user;
        })
        .catch((error) => {
            console.log(error.code, error.message)
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        });
    return res.status(HttpStatusCodes.OK).json(userCredential);
}

/**
 * Register user
 */
async function registerFirebase(req: IReq<{ email: string, password: string }>, res: IRes) {
    const { email, password } = req.body
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            console.log(error.code, error.message)
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        });
    return res.status(HttpStatusCodes.OK).json(userCredential);
}


/**
 * LogOut user
 */
async function signOutFirebase(_: IReq, res: IRes) {
    await signOut(auth)
        .catch((error) => {
            console.log(error.code, error.message)
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        });
    return res.status(HttpStatusCodes.OK);
}

/**
 * Check if user logged
 */
async function authStateFirebase(_: IReq, res: IRes) {
    const logState = UserService.logState
    return res.status(HttpStatusCodes.OK).json({ "userState": logState });
}

export default {
    singInFirebase,
    registerFirebase,
    signOutFirebase,
    authStateFirebase
}