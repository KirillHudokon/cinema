import fire from "../config/Fire";

export const HOLE_REQUEST = 'HOLE_REQUEST'
export const HOLE_SUCCESS = 'HOLE_SUCCESS'
export const HOLE_FAIL = 'HOLE_FAIL'
export const BLOCK_PLACES_REQUEST = 'BLOCK_PLACES_REQUEST'
export const BLOCK_PLACES_SUCCESS = 'BLOCK_PLACES_SUCCESS'
export const BLOCK_PLACES_FAIL = 'BLOCK_PLACES_FAIL'

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


export const getHoles = ()=>{
    return dispatch => {
        dispatch(onHoleRequest())
        fire.firestore().collection('hole').doc('holes').get().then((snap)=> {
                dispatch(onHoleSuccess(snap.data()))
            }).catch((error) => {
                dispatch(onHoleError(error))
            });
    }
}

export const blockPlaces =(hole,block)=>{
    return dispatch => {
        dispatch(onBlockPlacesRequest)
        fire.firestore().collection('hole').doc('holes').update({
            [hole]: block
        }).then(()=> {
            dispatch(onBlockPlacesSuccess)
        }).catch((error) => {
            dispatch(onBlockPlacesError(error))
        });
    }
}