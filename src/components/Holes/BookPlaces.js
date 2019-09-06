import React, {Component} from 'react';

class BookPlaces extends Component {
    renderPlaces(){
        if(this.props.places.length===0){
            return <li>У вас еще нет броней</li>
        }
        return this.props.places.map(filmKey=>{
            return Object.keys(filmKey).map((film,i)=>{
                return <li className='userBookedPlace' key={i}>
                     {film} : {filmKey[film]} место
                </li>
            })
        })
    }
    render() {
        return (
            <div className='userBookedPlaces'>
                 Список ваших новых броней сейчас
                <ol>
                    {this.renderPlaces()}
                </ol>
            </div>
        );
    }
}

export default BookPlaces;
