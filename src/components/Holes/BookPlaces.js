import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'

class BookPlaces extends Component {
    deleteBlock=(film,place)=>{
        const {blockQueue,queue,userBlockQueue,userQueue}=this.props
        blockQueue(queue,film,place-1,'unlocked')
        userBlockQueue(userQueue,film,place-1,'unlocked')
    }
    renderPlaces(){
        const {places,reservePlaces}=this.props
        let liveBlocks=[];
        for(let i=0; i<places.length; i++){
            if(!(JSON.stringify(places[i])===JSON.stringify(reservePlaces[i]))){
               liveBlocks.push(places[i])
            }
        }
        if(liveBlocks.length===0){
            return <li className='warnBookedPlace'>У вас еще нет броней</li>
        }
        return liveBlocks.map(filmKey=>{
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
