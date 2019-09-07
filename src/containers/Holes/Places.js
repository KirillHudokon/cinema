import React from 'react';
import {connect} from 'react-redux'
import CinemaLines from "../../components/Holes/CinemaLines";
import {blockPlaces, blockQueue,userBlockQueue,updateUserBlockPlaces} from "../../actions/HoleAction";
import UserBookedPlaces from "../../components/Holes/UserBookedPlaces";
import BookPlaces from "../../components/Holes/BookPlaces";
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
        const {user,userBooked,userQueue,queue,blockQueueAction,userBlockQueueAction}=this.props
        const userBooks=user.cred ? <UserBookedPlaces places={userBooked}/> : null
        const userLiveBooks=user.cred ? <BookPlaces   userQueue={userQueue}
                                                      queue={queue}
                                                      blockQueue={blockQueueAction}
                                                      userBlockQueue={userBlockQueueAction}
                                                      reservePlaces={userBooked}
                                                      places={userQueue}
                                                      blockPlace={this.blockPlace}
                                        />: null
        return (
            <div className='placeContainer'>
                {userBooks}
                <div className='films'>
                    {this.renderCinemaPlaces()}
                </div>
                {userLiveBooks}
            </div>
        )
    }
}

export const mapStateToProps = store =>({
    userQueue:store.holes.userQueue,
    user:store.user,
    rooms:store.holes.rooms,
    queue:store.holes.queue,
    userBooked:store.holes.userBooked,
})
export const mapDispatchToProps = dispatch =>({
    blockPlacesAction:(queue)=>dispatch(blockPlaces(queue)),
    blockQueueAction:(queue,film,index,state)=>dispatch(blockQueue(queue,film,index,state)),
    userBlockQueueAction:(userQueue,film,index,state)=>dispatch(userBlockQueue(userQueue,film,index,state)),
    updateUserBlockPlacesAction:(uid,queue)=>dispatch(updateUserBlockPlaces(uid,queue))
})

export default connect(mapStateToProps,mapDispatchToProps)(Places);
