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

export const ACTIVE_CATEGORY='ACTIVE_CATEGORY'

export const RESET_TO_MAIN_MENU='RESET_TO_MAIN_MENU'

export const UPDATE_COMMENTS_REQUEST='UPDATE_COMMENTS_REQUEST'
export const UPDATE_COMMENTS_SUCCESS='UPDATE_COMMENTS_SUCCESS'
export const UPDATE_COMMENTS_FAIL='UPDATE_COMMENTS_FAIL'

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
const onResetToMainMenu=()=>({
    type:RESET_TO_MAIN_MENU
})
const onActiveCategory=(category)=>({
    type:ACTIVE_CATEGORY,
    payload:category
})

const onUpdateCommentsRequest = () => ({
    type: UPDATE_COMMENTS_REQUEST
})

const onUpdateCommentsSuccess=()=>({
    type: UPDATE_COMMENTS_SUCCESS,
})
const onUpdateCommentsError=(error)=>({
    type: UPDATE_COMMENTS_FAIL,
    error: true,
    payload: error,
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
                let transformDateAdding=new Date(1000*doc.data().description.time.seconds);
                let dateAdding=dateFormatter.format(transformDateAdding, 'YYYY.MM.DD, HH:mm');
                films.push({[doc.id]: {...doc.data().description, time: dateAdding}})
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
        dispatch(onActiveCategory(category))
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
export const resetToMainMenu=()=>{
    return dispatch=>{
        dispatch(onResetToMainMenu())
    }
}
export const filterFilmsAction=(filter, films)=>{
    return dispatch =>{

       dispatch(sortFilms(bubbleSort(films)))
       dispatch(onActiveCategory(filter))
        function bubbleSort(arr) {
            for (let i = 0, endI = arr.length - 1; i < endI; i++) {
                for (let j = 0, endJ = endI - i; j < endJ; j++) {
                    let pathOfFilm = Object.values(arr[j])[0]
                    let pathOfFilmNext= Object.values(arr[j+1])[0]
                    if (pathOfFilm[filter] < pathOfFilmNext[filter]) {
                        let swap = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = swap;
                    }
                }
            }
            return arr;
        }
    }
}
export const updateComments=(comments,text,filmId)=>{
    return dispatch=>{
        dispatch(onUpdateCommentsRequest())
        fire.firestore().collection('films').doc(filmId).get().then((snap)=>{
            if (snap.exists) {
                return snap.data()
            }
        }).then(key=>{
            fire.firestore().collection('films').doc(filmId).update({
                description:{
                    ...key.description,
                    comments:[
                        ...key.description.comments,
                        {
                            name:fire.auth().currentUser.displayName,
                            text:text.trim(),
                        }
                    ]
                }
            })
        }).then(()=>{
            dispatch(onUpdateCommentsSuccess())
        }).catch((e)=>{
            dispatch(onUpdateCommentsError(e))
        })
    }
}