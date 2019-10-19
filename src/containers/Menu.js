import React, {useEffect} from 'react';
import {changePassword} from "../actions/UserAction";
import {connect} from "react-redux";
import {
    getCategoriesAction,
    getFilmsAction,
    sortFilmAction,
    activeFilmContentAction,
    fullFilmAction,
    filterFilmsAction,
    updateComments
} from "../actions/FilmsAction";
import Categories from "../components/Categories";
import ViewContent from "../components/ViewContent";
import {Route,Switch} from "react-router-dom";
import {blockPlaces, blockQueue, updateUserBlockPlaces, userBlockQueue} from "../actions/HoleAction";
import BookPlaces from "../components/Holes/BookPlaces";
import NavMenu from "../components/NavMenu";


function Menu(props) {
    useEffect(() => {
        props.getCategoriesAction()
        props.getFilmsAction()
    },[]);
    const sortChange=(sort)=>{
        const{films,sortFilmAction}=props
        sortFilmAction(sort,films.viewContent)
    }
    const filterChange=(filter)=>{
        console.log(filter,'filter')
        const{films, filterFilms}=props
        filterFilms(filter,films.viewContent)
    }

    const blockPlace=()=>{
        const {queue, user, userQueue,blockPlacesAction,updateUserBlockPlacesAction}=props
        blockPlacesAction(queue)
        if(user.cred){
            updateUserBlockPlacesAction(user.cred.uid,userQueue)
        }
    }
    const renderMenu=()=>{
        const {user,userBooked,userQueue,queue,blockQueueAction,userBlockQueueAction,films,changePasswordAction,updateComments,fullFilmAction,activeFilmContentAction}=props
        const view=<ViewContent
            sortFilms={films.sort}
            films={films.viewContent}
            activeFilm={films.activeFilm}
            activeFilter={films.activeFilter}
            fullFilmAction={fullFilmAction}
            activeFilmContentAction={activeFilmContentAction}
            fullFilm={films.fullFilm}
            userQueue={userQueue}
            queue={queue}
            blockQueue={blockQueueAction}
            userBlockQueue={userBlockQueueAction}
            user={user}
            updateComments={updateComments}
        />
        return (
            <div className='menu'>
                {user.cred && <NavMenu message={user.successfulMessage} error={user.error} places={userBooked} changePassword={changePasswordAction}/>}
                <div className='leftSideContainer'>
                    <Categories
                        changer={sortChange}
                        filterChange={filterChange}
                        categories={films.categories}
                        films={films.viewContent}
                    />
                </div>
                <div className='centerContainer'>
                    <div className='filmSelection'>
                        <Switch>
                            <Route path={`/:${films.activeFilter}/:${films.activeFilm}`} exact={true}>
                                {view}
                            </Route>
                            <Route path={`/:${films.activeFilter}`} exact={true}>
                                {view}
                            </Route>
                            <Route path='/' exact={true}>
                                {view}
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div>
                    {user.cred && <BookPlaces
                        userQueue={userQueue}
                        queue={queue}
                        blockQueue={blockQueueAction}
                        userBlockQueue={userBlockQueueAction}
                        reservePlaces={userBooked}
                        blockPlace={blockPlace}
                        filmId={films.activeFilm}
                    />}
                </div>
            </div>
        );
    }
    return renderMenu()
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
    changePasswordAction:(currentPassword,newPassword)=>dispatch(changePassword(currentPassword,newPassword)),
    blockPlacesAction:(queue)=>dispatch(blockPlaces(queue)),
    blockQueueAction:(queue,film,index,state)=>dispatch(blockQueue(queue,film,index,state)),
    userBlockQueueAction:(userQueue,film,index,state,type)=>dispatch(userBlockQueue(userQueue,film,index,state,type)),
    updateUserBlockPlacesAction:(uid,queue)=>dispatch(updateUserBlockPlaces(uid,queue)),
    filterFilms:(filter, films)=>dispatch(filterFilmsAction(filter, films)),
    updateComments:(comments,text,filmId)=>dispatch(updateComments(comments,text,filmId))
})
export default connect(mapStateToProps,mapDispatchToProps)(Menu);