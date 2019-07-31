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
    let user=null
    return dispatch => {
        dispatch(onLogRequest())
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .then(()=>{
                user = fire.auth().currentUser;
            })
            .then(()=> {
                console.log(user.displayName)
                dispatch(onLogSuccess(user.displayName))
            })
            .catch((error) => {
                dispatch(onLogError(error))
            });
    }
}
export const signUp = (email,password,name)=>{
    let user=null
    return  dispatch => {
        dispatch(onLogRequest())
         fire.auth()
        .createUserWithEmailAndPassword( email,password )
        .then(()=>{
            user = fire.auth().currentUser;
        })
        .then(()=> {
            user.updateProfile({
                displayName: name
            }).then(()=>{
                console.log(user.uid)
                dispatch(onLogSuccess(name))
            }).then(()=>{
                fire
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({
                        displayName: name,
                    });
            }).catch((error)=> {
                dispatch(onLogError(error))
            });
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