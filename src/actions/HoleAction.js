import fire from "../config/Fire";


export const BLOCK_PLACES_REQUEST = 'BLOCK_PLACES_REQUEST'
export const BLOCK_PLACES_SUCCESS = 'BLOCK_PLACES_SUCCESS'
export const BLOCK_PLACES_FAIL = 'BLOCK_PLACES_FAIL'

export const BLOCK_QUEUE_SUCCESS='BLOCK_QUEUE_SUCCESS'

export const UPDATE_HOLE_BLOCK_PLACES_REQUEST = 'UPDATE_USER_BLOCK_PLACES_REQUEST'
export const UPDATE_HOLE_BLOCK_PLACES_SUCCESS = 'UPDATE_USER_BLOCK_PLACES_SUCCESS'
export const UPDATE_HOLE_BLOCK_PLACES_FAIL = 'UPDATE_USER_BLOCK_PLACES_FAIL'

export const USER_BLOCK_PLACES_SUCCESS = 'USER_BLOCK_PLACES_SUCCESS'

export const GET_USER_BLOCK_PLACES_REQUEST = 'GET_USER_BLOCK_PLACES_REQUEST'
export const GET_USER_BLOCK_PLACES_SUCCESS = 'GET_USER_BLOCK_PLACES_SUCCESS'
export const GET_USER_BLOCK_PLACES_FAIL = 'GET_USER_BLOCK_PLACES_FAIL'

export const UPDATE_USER_BLOCK_PLACES_REQUEST = 'UPDATE_USER_BLOCK_PLACES_REQUEST'
export const UPDATE_USER_BLOCK_PLACES_SUCCESS = 'UPDATE_USER_BLOCK_PLACES_SUCCESS'
export const UPDATE_USER_BLOCK_PLACES_FAIL = 'UPDATE_USER_BLOCK_PLACES_FAIL'

export const RESET_USER_BLOCK_PLACES = 'RESET_USER_BLOCK_PLACES'

export const UPDATE_QUEUE='UPDATE_QUEUE'


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
const onUpdateQueue=(queue)=>({
    type: UPDATE_QUEUE,
    error: true,
    payload: queue
})

export const resetUserBlockPlaces=()=>({
    type:RESET_USER_BLOCK_PLACES
})

export const blockPlaces =(queue)=>{ //отправка всей очереди и получение
    return async dispatch => {
        dispatch(onBlockPlacesRequest())
        try {
            for (let item of queue) {
                let name = Object.keys(item).join('')
                await updateFilm(name, item[name])
            }
            dispatch(onBlockPlacesSuccess())
        }catch (e) {
            dispatch(onBlockPlacesError(e))
        }

        async function updateFilm(nameOfFilm,number) {
            await fire.firestore().collection('films').doc(nameOfFilm).get().then((snap)=> {
                if (snap.exists) {
                    return snap.data().description
                }
            }).then(data=>{
                let places=data.allPlaces
                let newAllPlaces=[...places.slice(0,number-1),{status:'locked'},...places.slice(number)]
                fire.firestore().collection('films').doc(nameOfFilm).update({
                    description:{
                        ...data,
                        allPlaces:newAllPlaces
                    }
                })
            })
        }
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

export const userBlockQueue = (userQueue,film,index,state,type) =>{ // хранение очереди(юзера)
   let updateAllQueue=(successDispatch)=>{
        return dispatch=>{
            let newStatusLocked=[...userQueue, {[film]:index+1}]
            let newStatusUnlocked=[]
            if(state==='prelocked') {
                dispatch(successDispatch([
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
                dispatch(successDispatch([
                    ...newStatusUnlocked
                ]))
            }
        }
    }
    return dispatch =>{
       if(type==='user') {
           dispatch(updateAllQueue(onBlockUserQueueSuccess))
       }else {
           dispatch(updateAllQueue(onUpdateQueue))
       }
    }
}
export const getUserBlockPlaces=(uid)=>{ //получение броней юзера
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
    return dispatch => {
        dispatch(onUpdateUserBlockPlacesRequest())
        fire.firestore().collection('users').doc(uid).get().then((snap)=>{
            if (snap.exists) {
                return snap.data().booked
            }
        }).then(key=>{
            fire.firestore().collection('users').doc(uid).update({
                booked:[...key,...userQueue]
            })
            return [...key,...userQueue]
        }).then((res)=>{

            dispatch(onUpdateUserBlockPlacesSuccess(res))
        }).catch((error) => {
            dispatch(onUpdateUserBlockPlacesError(error))
        });
    }
}
