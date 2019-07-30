import fire from "../config/Fire";

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

const onLogRequest = () => ({
    type: LOGIN_REQUEST,
})

const onLogSuccess=(username)=>({
    type: LOGIN_SUCCESS,
    payload: username,
})
const onLogError=(error)=>({
    type: LOGIN_FAIL,
    error: true,
    payload: error,
})

export const login = (email,password)=>{
    return dispatch => {
        dispatch(onLogRequest())
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then( (u) => {
                const {user} = u
                 dispatch(onLogSuccess(user.email))
            })
            .catch((error) => {
                dispatch(onLogError(error))
            });
    }
}
export const signUp = (email,password)=>{
    return  dispatch => {
        dispatch(onLogRequest())
         fire.auth()
        .createUserWithEmailAndPassword( email,password )
        .then((u)=>{
            const {user} = u
            dispatch(onLogSuccess(user.email))
        })
        .catch((error)=> {
            dispatch(onLogError(error))
        });
    }
}
export const logout=()=>{
    return dispatch => {
        dispatch(onLogRequest())
        fire.auth().signOut().then(() => {
            dispatch(onLogSuccess('unknown'))
        }).catch((error)=> {
            dispatch(onLogError(error))
        });
    }
}