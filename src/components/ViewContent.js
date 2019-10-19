import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStar,faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Place from "./Holes/Place";
import Iframe from "react-iframe";

class ViewContent extends Component {
    static defaultProps = {};

    static propTypes = {};
    state={
        commentInput:''
    }
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
    renderDetailsButton=(category,path,key)=>{
        const {fullFilm}=this.props
        switch (!!fullFilm.length) {
            case false:
              return <Link to={`/${category}/${path}`} onClick={()=>this.seeFull(key)} className='viewContainerDetails'>
                    Подробнее
                </Link>
            default:
                return null
        }
    }
    renderUpdateCommentButton(film,path){
        const {updateComments}=this.props
        return <button
            onClick={()=>updateComments(film.comments,this.state.commentInput,path)}
            className='viewContainerUpdateComments'
            disabled={!this.state.commentInput}>
            Добавить
        </button>
    }
    renderCommentsAreaBlock(film,path){
        const {fullFilm, user}=this.props
        switch (!!fullFilm.length) {
            case true:
                return <div>
                    <div className='CommentsTitleAndCounter'>
                        <div className='blockText'>Отзывы:</div>
                        <div className='allComments'>Всего: {film.commentsCounter}</div>
                    </div>
                    {user.cred ? <textarea className='commentArea' placeholder='Написать отзыв' name='commentInput'
                                  onChange={this.changeInputComment}
                                  value={this.state.commentInput}/>
                    : null
                    }
                    {user.cred ?
                    <div className='UpdateCommentsContainer'>
                        {this.renderUpdateCommentButton(film,path)}
                    </div>
                    :null
                    }

                </div>
            default:
                return null
        }
    }
    changeInputComment=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    renderComments(film){
        const {fullFilm}=this.props
        if (!!fullFilm.length) {
                return film.comments.length ? film.comments.map(comment=>{
                    return <div className='commentContainer'>
               <div className='userIconContainer'>
                   <FontAwesomeIcon className='userIcon' icon={faUser}/>
               </div>
               <div className='comment'>
                    <div className='commentName'>{comment.name}</div>
                   <div className='commentText'>
                       {comment.text}
                    </div>
                   <div className='commentTime'>
                       {comment.time}
                   </div>
               </div>
            </div>
                }) : <div className='noComments'>Пока еще нет отзывов</div>
        }else{
            return null
        }
    }
    renderFilms(content){
        const {fullFilm}=this.props
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
                        {fullFilm.length ? <div className='blockContainer'>
                            <div className='blockText'>Трейлер:</div>
                            <Iframe url={film.trailer}
                                                     width="100%"
                                                     height="400px"
                                                     id="myId"
                                                     className="youtube_player"
                                                     display="initial"
                                                     position="relative"
                            />
                            </div> : null
                        }
                        <div className='viewContainerPlaces'>
                            {this.renderBlockContainer(film)}
                        </div>
                        <div className='viewContainerExtra'>
                            <div className='viewContainerExDet'>
                                {this.renderDetailsButton(film.category,pathOfFilm,key)}
                            </div>
                            <div className='viewContainerDate'>
                                {film.time}
                            </div>
                        </div>
                        <div className='viewContainerCommentsContent'>
                            {this.renderCommentsAreaBlock(film,pathOfFilm)}
                            {this.renderComments(film)}
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
export default ViewContent;
