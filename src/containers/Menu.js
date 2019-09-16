import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {userListener} from "../actions/UserAction";
import {connect} from "react-redux";
import {getCategoriesAction,getFilmsAction,sortFilmAction} from "../actions/FilmsAction";
import Categories from "../components/Categories";
import fire from "../config/Fire";
import ViewContent from "../components/ViewContent";
class Menu extends Component {
    static defaultProps = {};

    static propTypes = {};

    componentDidMount() {
        this.props.getCategoriesAction()
        this.props.getFilmsAction()
    }
    sortChange=(sort)=>{
        const{films,sortFilmAction}=this.props
        sortFilmAction(sort,films.viewContent)
    }

    render() {
        const {categories,viewContent,sort}=this.props.films
        return (
            <div className='menu'>
                <div className='leftSideContainer'>
                    <Categories changer={this.sortChange} categories={categories}/>
                </div>
                <div className='centerContainer'>
                    <div className='filmSelection'>
                         <ViewContent sortFilms={sort} films={viewContent}/>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    films: store.films
})
export const mapDispatchToProps = dispatch=>({
    getCategoriesAction:()=>dispatch(getCategoriesAction()),
    getFilmsAction:()=>dispatch(getFilmsAction()),
    sortFilmAction:(category,films)=>dispatch(sortFilmAction(category,films))
})
export default connect(mapStateToProps,mapDispatchToProps)(Menu);