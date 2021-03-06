import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'

class BookPlaces extends Component {
    deleteBlock=(film,place)=>{
        const {queue,userBlockQueue,userQueue,filmId}=this.props
        userBlockQueue(userQueue,film,place-1,'unlocked','user')
        userBlockQueue(queue,filmId,place-1,'unlocked','films')
    }
    renderPlaces(){
        const {userQueue}=this.props
        return userQueue.map(filmKey=>{
            return Object.keys(filmKey).map((film,i)=>{
                return <li className='userBookedPlace live' key={i}>
                     {film} : {filmKey[film]} место
                    <FontAwesomeIcon onClick={()=>this.deleteBlock(film,filmKey[film])} className='delete' icon={faTrashAlt}/>
                </li>
            })
        })
    }
    render() {
        return (
            <div className='userBookedPlaces liveBooked'>
                 <div className='warnBookedPlace'>Список ваших новых броней сейчас</div>
                <ol>
                    {this.renderPlaces()}
                </ol>
                <button className='btn_prin' onClick={this.props.blockPlace}>Book places</button>
            </div>
        );
    }
}

export default BookPlaces;
