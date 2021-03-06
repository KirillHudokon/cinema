import fire from "../config/Fire";
import {resetUserBlockPlaces,getUserBlockPlaces} from './HoleAction'
const Firebase = require('firebase');


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'

export const USER_LISTENER_REQUEST = 'USER_LISTENER_REQUEST'
export const USER_LISTENER_SUCCESS_AUTH = 'USER_LISTENER_SUCCESS_AUTH'
export const USER_LISTENER_UNSUCCESS_AUTH='USER_LISTENER_UNSUCCESS_AUTH'
export const USER_LISTENER_FAIL = 'USER_LISTENER_FAIL'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'


const onLogRequest = () => ({
    type: LOGIN_REQUEST,
})

const onLogSuccess=(cred)=>({
    type: LOGIN_SUCCESS,
    payload: cred,
})
const onLogError=(error)=>({
    type: LOGIN_FAIL,
    error: true,
    payload: error,
})


const onRegisterRequest = () => ({
    type: REGISTER_REQUEST,
})

const onRegisterSuccess=(cred)=>({
    type: REGISTER_SUCCESS,
    payload: cred,
})
const onRegisterError=(error)=>({
    type: REGISTER_FAIL,
    error: true,
    payload: error,
})

const onLogOutRequest = () => ({
    type: LOGOUT_REQUEST,
})

const onLogOutSuccess=()=>({
    type: LOGOUT_SUCCESS,
    payload: null,
})
const onLogOutError=(error)=>({
    type: LOGOUT_FAIL,
    error: true,
    payload: error,
})

const onUserListenerRequest=()=>({
    type: USER_LISTENER_REQUEST,
})
const onUserListenerSuccessAuth=(cred)=>({
    type: USER_LISTENER_SUCCESS_AUTH,
    payload: cred,
})
const onUserListenerUnsuccessAuth=()=>({
    type: USER_LISTENER_UNSUCCESS_AUTH,
    payload: null,
})
const onUserListenerError=(error)=>({
    type: USER_LISTENER_FAIL,
    error: true,
    payload: error,
})

const onChangePasswordRequest=()=>({
    type:CHANGE_PASSWORD_REQUEST,
})
const onChangePasswordSuccess=()=>({
    type:CHANGE_PASSWORD_SUCCESS,
    payload:'Successful update password'
})
const onChangePasswordFail=(error)=>({
    type:CHANGE_PASSWORD_FAIL,
    payload:error
})


export const login = (email,password)=>{             //логин
    return dispatch => {
        dispatch(onLogRequest())
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(()=>fire.auth().currentUser)
            .then((userData)=> {
                dispatch(onLogSuccess(userData))
                dispatch(getUserBlockPlaces(userData.uid))
            })
            .catch((error) => {
                dispatch(onLogError(error))
            });
    }
}
export const signUp = (email,password,name)=>{         //регистрация
    return  dispatch => {
        dispatch(onRegisterRequest())
         fire.auth()
        .createUserWithEmailAndPassword( email,password )
        .then(async userCredentials=>{
            if (userCredentials.user) {
                await userCredentials.user.updateProfile({displayName: name});
                let userData = await fire.auth().currentUser;
                dispatch(onRegisterSuccess(userData))
                dispatch(getUserBlockPlaces(userData.uid))
            }
        })
        .catch((error)=> {
            dispatch(onRegisterError(error))
        });
    }
}
export const logout=()=>{            //логаут
    return dispatch => {
        dispatch(onLogOutRequest())
        fire.auth().signOut().then(() => {
            dispatch(onLogOutSuccess())
            dispatch(resetUserBlockPlaces())
        }).catch((error)=> {
            dispatch(onLogOutError(error))
        });
    }
}
export const userListener=()=>{            //прослушка
    return dispatch =>{
        try {
            dispatch(onUserListenerRequest())
            fire.auth().onAuthStateChanged(user => {
                if (user) {
                    dispatch(onUserListenerSuccessAuth(user))
                } else {
                    dispatch(onUserListenerUnsuccessAuth())
                }
            })
        }catch (e) {
            dispatch(onUserListenerError(e))
        }
    }
}

export const changePassword=(currentPassword,newPassword)=>{
    return dispatch =>{
        dispatch(onChangePasswordRequest())
        let user = fire.auth().currentUser;
        userReAuth(currentPassword).then(()=>{
            user.updatePassword(newPassword).then(()=>{
                dispatch(onChangePasswordSuccess())
            }).catch(error=>{
                dispatch(onChangePasswordFail(error))
            })
        }).catch(error=>{
            dispatch(onChangePasswordFail(error))
        })


        function userReAuth(){
            let cred=Firebase.auth.EmailAuthProvider.credential(user.email,currentPassword)
            return user.reauthenticateWithCredential(cred)
        }
    }
}