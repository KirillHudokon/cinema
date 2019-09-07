import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserBookedPlaces extends Component {
    renderPlaces(){
        if(this.props.places.length===0){
            return <li className='warnBookedPlace'>У вас еще нет броней</li>
        }
        return this.props.places.map(filmKey=>{
           return Object.keys(filmKey).map((film,i)=>{
                return <li className='userBookedPlace books' key={i}>
                    {film} : {filmKey[film]} место
                </li>
            })
        })
    }
    render() {
        return (
            <div className='userBookedPlaces booked'>
                <ul>
                {this.renderPlaces()}
                </ul>
            </div>
        );
    }
}

export default UserBookedPlaces;
