import fire from "../config/Fire";
import {resetUserBlockPlaces} from './HoleAction'

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

export const LOGOUT_HOLE_REQUEST = 'LOGOUT_HOLE_REQUEST'
export const LOGOUT_HOLE_SUCCESS = 'LOGOUT_HOLE_SUCCESS'
export const LOGOUT_HOLE_FAIL = 'LOGOUT_HOLE_FAIL'

export const GET_USER_PLACES='GET_USER_PLACES'


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

const onHoleLogOutRequest = () => ({
    type: LOGOUT_HOLE_REQUEST,
})

const onHoleLogOutSuccess=(room)=>({
    type: LOGOUT_HOLE_SUCCESS,
    payload: room,
})
const onHoleLogOutError=(error)=>({
    type: LOGOUT_HOLE_FAIL,
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
const getUserPlaces=(places)=>({
    type:GET_USER_PLACES,
    payload:places
})


export const login = (email,password)=>{
    return dispatch => {
        dispatch(onLogRequest())
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(()=>fire.auth().currentUser)
            .then((userData)=> {
                dispatch(onLogSuccess(userData))
                fire.firestore().collection('users').doc(userData.uid).get().then((snap)=> {
                    dispatch(getUserPlaces(snap.data().booked))
                })
            })
            .catch((error) => {
                dispatch(onLogError(error))
            });
    }
}
export const signUp = (email,password,name)=>{
    return  dispatch => {
        dispatch(onRegisterRequest())
         fire.auth()
        .createUserWithEmailAndPassword( email,password )
        .then(async userCredentials=>{
            if (userCredentials.user) {
                await userCredentials.user.updateProfile({displayName: name});
                let userData = await fire.auth().currentUser;
                dispatch(onRegisterSuccess(userData))
                dispatch(getUserPlaces([]))
            }
        })
        .catch((error)=> {
            dispatch(onRegisterError(error))
        });
    }
}
export const logout=()=>{
    return dispatch => {
        dispatch(onLogOutRequest())
        fire.auth().signOut().then(() => {
            dispatch(onLogOutSuccess())
            dispatch(resetUserBlockPlaces())
        }).then(()=>{
            dispatch(onHoleLogOutRequest())
            fire.firestore().collection('hole').doc('holes').get().then((snap)=> {
                dispatch(onHoleLogOutSuccess(snap.data()))
            },(error)=>{
                dispatch(onHoleLogOutError(error))
            })
        }).catch((error)=> {
            dispatch(onLogOutError(error))
        });
    }
}
export const userListener=()=>{
    return dispatch =>{
        dispatch(onUserListenerRequest())
        fire.auth().onAuthStateChanged(user=> {
            if (user) {
              dispatch(onUserListenerSuccessAuth(user))
            } else {
                dispatch(onUserListenerUnsuccessAuth())
            }
        });
    }
}