import fire from "../config/Fire";

export const HOLE_REQUEST = 'HOLE_REQUEST'
export const HOLE_SUCCESS = 'HOLE_SUCCESS'
export const HOLE_FAIL = 'HOLE_FAIL'

export const BLOCK_PLACES_REQUEST = 'BLOCK_PLACES_REQUEST'
export const BLOCK_PLACES_SUCCESS = 'BLOCK_PLACES_SUCCESS'
export const BLOCK_PLACES_FAIL = 'BLOCK_PLACES_FAIL'

export const BLOCK_QUEUE_SUCCESS='BLOCK_QUEUE_SUCCESS'

export const USER_BLOCK_PLACES_SUCCESS = 'USER_BLOCK_PLACES_SUCCESS'

export const GET_USER_BLOCK_PLACES_REQUEST = 'GET_USER_BLOCK_PLACES_REQUEST'
export const GET_USER_BLOCK_PLACES_SUCCESS = 'GET_USER_BLOCK_PLACES_SUCCESS'
export const GET_USER_BLOCK_PLACES_FAIL = 'GET_USER_BLOCK_PLACES_FAIL'

export const UPDATE_USER_BLOCK_PLACES_REQUEST = 'UPDATE_USER_BLOCK_PLACES_REQUEST'
export const UPDATE_USER_BLOCK_PLACES_SUCCESS = 'UPDATE_USER_BLOCK_PLACES_SUCCESS'
export const UPDATE_USER_BLOCK_PLACES_FAIL = 'UPDATE_USER_BLOCK_PLACES_FAIL'

export const RESET_USER_BLOCK_PLACES = 'RESET_USER_BLOCK_PLACES'

const onHoleRequest = () => ({
    type: HOLE_REQUEST,
})

const onHoleSuccess=(room)=>({
    type: HOLE_SUCCESS,
    payload: room,
})
const onHoleError=(error)=>({
    type: HOLE_FAIL,
    error: true,
    payload: error,
})


const onBlockPlacesRequest=()=>({
    type:BLOCK_PLACES_REQUEST
})
const onBlockPlacesSuccess=()=>({
    type: BLOCK_PLACES_SUCCESS,
})
const onBlockPlacesError=(error)=>({
    type: BLOCK_PLACES_FAIL,
    error: true,
    payload: error,
})

const onBlockQueueSuccess=(queue)=>({
    type: BLOCK_QUEUE_SUCCESS,
    payload: queue,
})

const onBlockUserQueueSuccess=(block)=>({
    type: USER_BLOCK_PLACES_SUCCESS,
    payload: block,
})

const onGetUserBlockPlacesRequest=()=>({
    type:GET_USER_BLOCK_PLACES_REQUEST
})
const onGetUserBlockPlacesSuccess=(blocks)=>({
    type: GET_USER_BLOCK_PLACES_SUCCESS,
    payload:blocks
})
const onGetUserBlockPlacesError=(error)=>({
    type: GET_USER_BLOCK_PLACES_FAIL,
    error: true,
    payload: error,
})

const onUpdateUserBlockPlacesRequest=()=>({
    type:UPDATE_USER_BLOCK_PLACES_REQUEST
})
const onUpdateUserBlockPlacesSuccess=(blocks)=>({
    type: UPDATE_USER_BLOCK_PLACES_SUCCESS,
    payload:blocks
})
const onUpdateUserBlockPlacesError=(error)=>({
    type: UPDATE_USER_BLOCK_PLACES_FAIL,
    error: true,
    payload: error,
})

export const resetUserBlockPlaces=()=>({
    type:RESET_USER_BLOCK_PLACES
})
export const getHoles = ()=>{ //получение залов с местами
    return dispatch => {
        dispatch(onHoleRequest())
        fire.firestore().collection('hole').doc('holes').get().then((snap)=> {
                dispatch(onHoleSuccess(snap.data()))
            }).catch((error) => {
                dispatch(onHoleError(error))
            });
    }
}

export const blockPlaces =(queue)=>{ //отправка всей очереди и получение
    return dispatch => {
        dispatch(onBlockPlacesRequest())
        fire.firestore().collection('hole').doc('holes').set({
            ...queue
        }).then(()=>{
            fire.firestore().collection('hole').doc('holes').get().then((snap)=> {
                dispatch(onHoleSuccess(snap.data()))
            })
        }).then(()=> {
            dispatch(onBlockPlacesSuccess())
        }).catch((error) => {
            dispatch(onBlockPlacesError(error))
        });
    }
}
export const blockQueue = (queue,film,i,state) =>{ // хранение очереди(всей)
    return dispatch =>{
        const newStatusLocked=[...queue[film].slice(0,i),{status:'locked'},...queue[film].slice(i+1)]
        const newStatusUnlocked=[...queue[film].slice(0,i),{status:'unlocked'},...queue[film].slice(i+1)]
        if(state==='prelocked') {
            dispatch(onBlockQueueSuccess({
                ...queue,
                [film]: newStatusLocked
            }))
        }else{
            dispatch(onBlockQueueSuccess({
                ...queue,
                [film]: newStatusUnlocked
            }))
        }
    }
}

export const userBlockQueue = (userQueue,film,index,state) =>{ // хранение очереди(юзера)
    console.log(film,index)
    return dispatch =>{
        let newStatusLocked=[...userQueue, {[film]:index+1}]
        let newStatusUnlocked=[]
        if(state==='prelocked') {
            dispatch(onBlockUserQueueSuccess([
                ...newStatusLocked
            ]))
        }else{
            let flag=null;
            userQueue.forEach((key,i)=>{
                if(key[film]===index+1){
                    flag=i
                }
            })

            newStatusUnlocked=[...userQueue.slice(0,flag),...userQueue.slice(flag+1)]
            dispatch(onBlockUserQueueSuccess([
                ...newStatusUnlocked
            ]))
        }
    }
}
export const getUserBlockPlaces=(uid)=>{ //получение броней юзера
    console.log(uid)
    return dispatch => {
        dispatch(onGetUserBlockPlacesRequest())
        fire.firestore().collection('users').doc(uid).get().then((snap)=> {
            if (snap.exists) {
                dispatch(onGetUserBlockPlacesSuccess(snap.data().booked))
            }
        }).catch((error) => {
            dispatch(onGetUserBlockPlacesError(error))
        });
    }
}
export const updateUserBlockPlaces=(uid,userQueue)=>{ //апдейт броней юзера
    console.log('запрос')
    return dispatch => {
        dispatch(onUpdateUserBlockPlacesRequest())
        fire.firestore().collection('users').doc(uid).update({
            booked:userQueue
        }).then(()=>{
            dispatch(onUpdateUserBlockPlacesSuccess(userQueue))
        }).catch((error) => {
            dispatch(onUpdateUserBlockPlacesError(error))
        });
    }
}
