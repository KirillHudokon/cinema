import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Place from "../containers/Holes/Place";

class ViewContent extends Component {
    static defaultProps = {};

    static propTypes = {};

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
    renderPlaces=(places)=>{
        const {fullFilm,userQueue,queue,userBlockQueue,activeFilm}=this.props
        let nameOfFilm=fullFilm.map(key=> Object.values(key).map(filmName=>filmName.name)).join('');
        return places.length ? places.map((place,i)=>{
                return <Place
                    place={place}
                    i={i}
                    film={nameOfFilm}
                    userQueue={userQueue}
                    userBlockQueueAction={userBlockQueue}
                    filmId={activeFilm}
                    queue={queue}
                />
        }) : null
    }

    renderText(text){
        const {fullFilm}=this.props
        switch (!!fullFilm.length) {
            case true:
                return text
            case false:
                return text.split(' ').splice(0,31).map((key,i)=>{
                    return i===30 ? '...' : key
                }).join(' ')
            default:
                return null
        }

    }
    seeFull=(film)=>{
        this.props.fullFilmAction(film)
        this.props.activeFilmContentAction(film)
    }
    renderBlockContainer(film){
        const {fullFilm,user}=this.props
        if(fullFilm.length&&user.cred){
            return <div className='blockContainer'>
                <div className='blockText'>Забронированые места:</div>
                <div className='screen'>Экран</div>
                <div className='blockPlaces'>{this.renderPlaces(film.allPlaces)}</div>
            </div>
        }else if(fullFilm.length&&!user.cred){
            return <div>Войдите чтобы посмотреть/забронировать места</div>
        }else{
            return null
        }
    }
    renderFilms(content){
        const {fullFilm,userQueue,queue,blockQueueAction,userBlockQueueAction,}=this.props

        if(!content.length){
            return null
        }else{
            return content.map(key=>{
                let pathOfFilm = Object.keys(key).map(path=>path).join('')
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
                                    {this.renderText(film.text)}
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
                        <div className='viewContainerPlaces'>
                            {this.renderBlockContainer(film)}
                        </div>
                        <div className='viewContainerExtra'>
                            <div className='viewContainerExDet'>
                                {!fullFilm.length &&  <Link to={`/${film.category}/${pathOfFilm}`} onClick={()=>this.seeFull(key)} className='viewContainerDetails'>
                                    Подробнее
                                </Link> }
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
        const {sortFilms,films,fullFilm}=this.props
        let content
          if(fullFilm.length){
             content = this.renderFilms(fullFilm)
          }else if (sortFilms.length){
              content = this.renderFilms(sortFilms)
          } else{
              content = this.renderFilms(films)
          }
        return (
            <div>
                {content}
            </div>
        );
    }
}
{/*<CinemaLines
                                userQueue={userQueue}
                                queue={queue}
                                blockQueue={blockQueueAction}
                                film={film.name}
                                userBlockQueue={userBlockQueueAction}
                            />*/}
export default ViewContent;
