import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

class ViewContent extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        full:false
    };
    renderRate=(rate)=>{
        let stars=[]
        for(let i=1;i<=5;i++){
            if(i<=rate){
                stars.push(<FontAwesomeIcon className='starLiked' icon={faStar}/>)
            }else{
                stars.push(<FontAwesomeIcon className='star' icon={faStar}/>)
            }
        }
        return stars
    }

    renderText(text){
       return text.split(' ').splice(0,31).map((key,i)=>{
           return i===30 ? '...' : key
       }).join(' ')
    }
    seeFull=()=>{
        this.setState({full:!this.state.full})
    }
    renderFilms(content){
        if(!content.length){
            return null
        }else{
            return content.map(key=>{
                return Object.values(key).map(film=>{
                    return <div className='viewContainerContent' key={film.name}>
                        <div className='viewContainerTitleAndRate'>
                            <h2 className='viewContainerTitle'>{film.name}</h2>
                            <div className='viewContainerRate'>
                                {this.renderRate(film.rate)}
                            </div>
                        </div>
                        <div className='viewContainerDescription'>
                            <div className='viewContainerImage'>
                                <img
                                    src={film.img}
                                    alt="image"
                                />
                            </div>
                            <div className='viewContainerInf'>
                                <div className='viewContainerText content'>
                                    {!this.state.full && this.renderText(film.text)}
                                    {this.state.full && film.text }
                                </div>
                                <div className='viewContainerYearOfManufacture content'>
                                    Год выпуска: {film.year}
                                </div>
                                <div className='viewContainerCountry content'>
                                    Страна: {film.country}
                                </div>
                                <div className='viewContainerCategory content'>
                                    Жанр: {film.category}
                                </div>

                                <div className='viewContainerNumberOfPlaces content'>
                                    Количество мест: {film.places}
                                </div>
                                <div className='viewContainerNumberOfFreePlaces content'>
                                    Количество свободных мест: {film.freePlaces}
                                </div>
                            </div>
                        </div>
                        <div className='viewContainerExtra'>
                            <div className='viewContainerExDet'>
                                {!this.state.full && <button onClick={this.seeFull} className='viewContainerDetails'>
                                    Подробнее
                                </button>}
                            </div>
                            <div className='viewContainerDate'>
                                {film.time}
                            </div>
                        </div>
                    </div>
                })
            })
        }
    }

    render() {
        const {sortFilms,films}=this.props
        let content= sortFilms.length ? this.renderFilms(sortFilms) : this.renderFilms(films)
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default ViewContent;
