import fire from "../config/Fire";

export const ROOM_REQUEST = 'ROOM_REQUEST'
export const ROOM_SUCCESS = 'ROOM_SUCCESS'
export const ROOM_FAIL = 'ROOM_FAIL'

const onRoomRequest = () => ({
    type: ROOM_REQUEST,
})

const onRoomSuccess=(room)=>({
    type: ROOM_SUCCESS,
    payload: room,
})
const onRoomError=(error)=>({
    type: ROOM_FAIL,
    error: true,
    payload: error,
})


export const getRooms = ()=>{
    return dispatch => {
        dispatch(onRoomRequest())
        let placesMas=[];
        fire.firestore().collection('rooms').doc('1').get().then((snap)=> {
                    let {places}=snap.data()
                    placesMas.push({room:1,places})
                    fire.firestore().collection('rooms').doc('2').get().then((snap)=> {
                        let {places}= snap.data()
                         placesMas.push({room:2,places})
                            fire.firestore().collection('rooms').doc('3').get().then((snap)=> {
                                let {places}= snap.data()
                                 placesMas.push({room:3,places})
                                 dispatch(onRoomSuccess(placesMas))
                            }).catch((error) => {
                                dispatch(onRoomError(error))
                            });
                    }).catch((error) => {
                        dispatch(onRoomError(error))
                    });
            })
            .catch((error) => {
                dispatch(onRoomError(error))
            });
    }
}