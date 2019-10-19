import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Categories extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};
    renderCategories=()=>{
        const {categories,changer}=this.props
        return categories.map(categoryObj=> {
            return Object.keys(categoryObj).map(category=>{
                return <Link to={`/${category}`} className='category' key={category} onClick={()=>changer(category)}>
                    {category} <span className='counter'>({categoryObj[category]})</span>
                </Link>
            })
        })
    }
    render() {
        const {filterChange,films}=this.props
        return(
            <div className='categoriesAndFilters'>
                <div className='categories'>
                    <h6 className='nameOfCaegories'> Категории: </h6>
                {this.renderCategories()}
                </div>
                <div className='filters'>
                    <h6 className='nameOfFilters'> Фильтры: </h6>
                    <Link to='/rate' className='category' onClick={()=>filterChange('rate',films)}>
                        По рейтингу
                    </Link>
                    <Link to='/year' className='category' onClick={()=>filterChange('year',films)}>
                        По Году
                    </Link>
                    <Link to='/country' className='category' onClick={()=>filterChange('country',films)}>
                        По Странам
                    </Link>
                </div>
            </div>
        )
    }
}

export default Categories;
