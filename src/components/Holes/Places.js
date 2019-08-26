import React from 'react';
import {connect} from 'react-redux'
import CinemaLines from "./CinemaLines";
import {blockPlaces, blockQueue,userBlockQueue,updateUserBlockPlaces} from "../../actions/HoleAction";
import UserBookedPlaces from "./UserBookedPlaces";
class Places extends React.Component{
    renderCinemaPlaces=()=>{
        const {queue,rooms,blockQueueAction,userBlockQueueAction,userQueue}=this.props
        return Object.keys(rooms).length ?
            Object.keys(rooms).map((keyName)=> {
            return <div className='placeBlock' key={keyName}>
                <h2 className='nameOfHole'>{keyName}</h2>
                    <div className='screen'>Экран</div>
                    <div className='line'>
                       <CinemaLines
                        userQueue={userQueue}
                        queue={queue}
                        blockQueue={blockQueueAction}
                        rooms={rooms}
                        film={keyName}
                        userBlockQueue={userBlockQueueAction}
                      />
                    </div>
                </div>

        }): null
    }
    blockPlace=()=>{
        const {queue, user, userQueue,blockPlacesAction,updateUserBlockPlacesAction}=this.props
        blockPlacesAction(queue)
        if(user.cred){
            updateUserBlockPlacesAction(user.cred.uid,userQueue)
        }
    }

    render(){
        console.log(this.props)
        const {user,userBooked}=this.props
        const userBooks=userBooked ? <UserBookedPlaces places={userBooked}/> : null
        const reserve= user.cred ?
                       <button className='btn_prin' onClick={this.blockPlace}>Book places</button>:
                       <p>Войдите чтобы Забронировать</p>
        return (
            <div className='placeContainer'>
                {userBooks}
                <div className='films'>
                    {this.renderCinemaPlaces()}
                    {reserve}
                </div>
            </div>
        )
    }
}

export const mapStateToProps = store =>({
    userQueue:store.holes.userQueue,
    user:store.user,
    rooms:store.holes.rooms,
    queue:store.holes.queue,
    userBooked:store.holes.userBooked
})
export const mapDispatchToProps = dispatch =>({
    blockPlacesAction:(queue)=>dispatch(blockPlaces(queue)),
    blockQueueAction:(queue,film,index,state)=>dispatch(blockQueue(queue,film,index,state)),
    userBlockQueueAction:(userQueue,film,index,state)=>dispatch(userBlockQueue(userQueue,film,index,state)),
    updateUserBlockPlacesAction:(uid,queue)=>dispatch(updateUserBlockPlaces(uid,queue))
})

export default connect(mapStateToProps,mapDispatchToProps)(Places);
