import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userListener} from "../actions/UserAction";
import {connect} from "react-redux";
import {
    getCategoriesAction,
    getFilmsAction,
    sortFilmAction,
    activeFilmContentAction,
    fullFilmAction,
    filterFilmsAction
} from "../actions/FilmsAction";
import Categories from "../components/Categories";
import fire from "../config/Fire";
import ViewContent from "../components/ViewContent";
import Home from "./Home";
import {Route} from "react-router-dom";
import {blockPlaces, blockQueue, updateUserBlockPlaces, userBlockQueue} from "../actions/HoleAction";
import BookPlaces from "../components/Holes/BookPlaces";
import UserBookedPlaces from "../components/Holes/UserBookedPlaces";


class Menu extends Component {
    static defaultProps = {};
    state={
        filter:''
    }
    static propTypes = {};

    componentDidMount() {
        this.props.getCategoriesAction()
        this.props.getFilmsAction()
    }
    sortChange=(sort)=>{
        const{films,sortFilmAction}=this.props
        sortFilmAction(sort,films.viewContent)
    }
    filterChange=(filter)=>{
        const{films, filterFilms}=this.props
        filterFilms(filter,films.viewContent)
    }

    blockPlace=()=>{
        const {queue, user, userQueue,blockPlacesAction,updateUserBlockPlacesAction}=this.props
        blockPlacesAction(queue)
        if(user.cred){
            updateUserBlockPlacesAction(user.cred.uid,userQueue)
        }
    }
    render() {
        const {user,userBooked,userQueue,queue,blockQueueAction,userBlockQueueAction,films}=this.props
        return (
            <div className='menu'>
                <div className='leftSideContainer'>
                    <Categories
                        changer={this.sortChange}
                        filterChange={this.filterChange}
                        categories={films.categories}
                        films={films.viewContent}
                    />
                </div>
                <div className='centerContainer'>
                    <div className='filmSelection'>
                        <Route
                            path='/'
                            render={(props)=><ViewContent
                                {...props}
                                sortFilms={films.sort}
                                films={films.viewContent}
                                activeFilm={films.activeFilm}
                                activeFilter={films.activeFilter}
                                fullFilmAction={this.props.fullFilmAction}
                                activeFilmContentAction={this.props.activeFilmContentAction}
                                fullFilm={films.fullFilm}
                                userQueue={userQueue}
                                queue={queue}
                                blockQueue={blockQueueAction}
                                userBlockQueue={userBlockQueueAction}
                                user={user}
                            />
                            }
                            exact={true}
                        />
                        <Route
                            path={`/${films.activeFilter}`}
                            render={(props)=><ViewContent
                                {...props}
                                sortFilms={films.sort}
                                films={films.viewContent}
                                activeFilm={films.activeFilm}
                                activeFilter={films.activeFilter}
                                fullFilmAction={this.props.fullFilmAction}
                                activeFilmContentAction={this.props.activeFilmContentAction}
                                fullFilm={films.fullFilm}
                                userQueue={userQueue}
                                queue={queue}
                                blockQueue={blockQueueAction}
                                userBlockQueue={userBlockQueueAction}
                                user={user}/>
                            }
                            exact={true}
                        />
                        <Route
                            path={`/${films.activeFilter}/${films.activeFilm}`}
                            render={(props)=><ViewContent
                                {...props}
                                sortFilms={films.sort}
                                films={films.viewContent}
                                activeFilm={films.activeFilm}
                                activeFilter={films.activeFilter}
                                fullFilmAction={this.props.fullFilmAction}
                                activeFilmContentAction={this.props.activeFilmContentAction}
                                fullFilm={films.fullFilm}
                                userQueue={userQueue}
                                queue={queue}
                                blockQueue={blockQueueAction}
                                userBlockQueue={userBlockQueueAction}
                                user={user}/>
                            }
                            exact={true}
                        />
                    </div>
                </div>
                <div>
                    {user.cred && <BookPlaces
                       userQueue={userQueue}
                       queue={queue}
                       blockQueue={blockQueueAction}
                       userBlockQueue={userBlockQueueAction}
                       reservePlaces={userBooked}
                       blockPlace={this.blockPlace}
                       filmId={films.activeFilm}
                   />}
                    {user.cred ? <UserBookedPlaces places={userBooked}/> : null}
                </div>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user:store.user,
    films: store.films,

    userQueue:store.holes.userQueue,
    rooms:store.holes.rooms,
    queue:store.holes.queue,
    userBooked:store.holes.userBooked,
})
export const mapDispatchToProps = dispatch=>({
    getCategoriesAction:()=>dispatch(getCategoriesAction()),
    getFilmsAction:()=>dispatch(getFilmsAction()),
    sortFilmAction:(category,films)=>dispatch(sortFilmAction(category,films)),
    activeFilmContentAction:(active)=>dispatch(activeFilmContentAction(active)),
    fullFilmAction:(film)=>dispatch(fullFilmAction(film)),

    blockPlacesAction:(queue)=>dispatch(blockPlaces(queue)),
    blockQueueAction:(queue,film,index,state)=>dispatch(blockQueue(queue,film,index,state)),
    userBlockQueueAction:(userQueue,film,index,state,type)=>dispatch(userBlockQueue(userQueue,film,index,state,type)),
    updateUserBlockPlacesAction:(uid,queue)=>dispatch(updateUserBlockPlaces(uid,queue)),
    filterFilms:(filter, films)=>dispatch(filterFilmsAction(filter, films))
})
export default connect(mapStateToProps,mapDispatchToProps)(Menu);