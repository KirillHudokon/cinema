import fire from "../config/Fire";

import dateFormatter from 'date-and-time';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL'

export const GET_FILMS_REQUEST = 'GET_FILMS_REQUEST'
export const GET_FILMS_SUCCESS = 'GET_FILMS_SUCCESS'
export const GET_FILMS_FAIL = 'GET_FILMS_FAIL'

export const SORT_FILMS='SORT_FILMS'

export const ACTIVE_FILM_CONTENT='ACTIVE_FILM_CONTENT'

export const FULL_FILM='FULL_FILM'

const onCategoriesRequest = () => ({
    type: GET_CATEGORIES_REQUEST
})

const onCategoriesSuccess=(categories)=>({
    type: GET_CATEGORIES_SUCCESS,
    payload: categories,
})
const onCategoriesError=(error)=>({
    type: GET_CATEGORIES_FAIL,
    error: true,
    payload: error,
})


const onFilmsRequest = () => ({
    type: GET_FILMS_REQUEST
})

const onFilmsSuccess=(films)=>({
    type: GET_FILMS_SUCCESS,
    payload: films,
})
const onFilmsError=(error)=>({
    type: GET_FILMS_FAIL,
    error: true,
    payload: error,
})

const sortFilms=(sort)=> ({
    type: SORT_FILMS,
    payload: sort,
})

const activeFilmContent=(active)=> ({
    type: ACTIVE_FILM_CONTENT,
    payload: active,
})

const onFullFilm=(film)=> ({
    type: FULL_FILM,
    payload: film,
})

export const getCategoriesAction=()=>{
    let categories=[];
    return  dispatch => {
        dispatch(onCategoriesRequest())
        fire.firestore().collection("categories").get().then( querySnapshot => {
            querySnapshot.forEach((doc) => {
               categories.push({[doc.id]:doc.data().increment})
            });
            dispatch(onCategoriesSuccess(categories))
        }).catch((error)=> {
            dispatch(onCategoriesError(error))
        });
    }
}

export const getFilmsAction=()=>{
    let films=[];
    return  dispatch => {
        dispatch(onFilmsRequest())
        fire.firestore().collection("films").get().then( querySnapshot => {
            querySnapshot.forEach((doc) => {
                let transformDate=new Date(1000*doc.data().description.time.seconds);
                let date=dateFormatter.format(transformDate, 'YYYY.MM.DD, HH:mm');
                films.push({[doc.id]:{...doc.data().description,time:date}})
            });
            dispatch(onFilmsSuccess(films))
        }).catch((error)=> {
            dispatch(onFilmsError(error))
        });
    }
}
export const sortFilmAction=(category,films)=>{
    let sortMas=[]
    return dispatch => {
        if(films.length) {
            films.forEach(key => {
                Object.values(key).map(film => {
                    if (film.category === category) {
                        sortMas.push(key)
                    }
                })
            })

        }
        dispatch(sortFilms(sortMas))
        dispatch(onFullFilm([]))
    }
}
export const activeFilmContentAction=(active)=>{
    return dispatch=>{
        Object.keys(active).map(key=>dispatch(activeFilmContent({activeFilm:key,activeCategory:active[key].category}))
        )
    }
}
export const fullFilmAction=(film)=>{
    return dispatch=>{
        dispatch(onFullFilm([film]))
        dispatch(sortFilms([]))
    }
}