import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserBookedPlaces extends Component {
    renderPlaces(){
        if(this.props.places.length===0){
            return <p>У вас еще нет броней</p>
        }
        return this.props.places.map(filmKey=>{
           return Object.keys(filmKey).map((film,i)=>{
                return <div key={i}>
                    {film} : {filmKey[film]} место
                </div>
            })
        })
    }
    render() {
        return (
            <div>
                {this.renderPlaces()}
            </div>
        );
    }
}

export default UserBookedPlaces;
