import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};
    renderCategories=()=>{
        const {categories,changer}=this.props
        return categories.map(categoryObj=> {
            return Object.keys(categoryObj).map(category=>{
                return <li className='category' key={category} onClick={()=>changer(category)}>
                    {category} <span className='counter'>({categoryObj[category]})</span>
                </li>
            })
        })
    }
    render() {
        return(
            <ul className='categories'>
                {this.renderCategories()}
            </ul>
        )
    }
}

export default Categories;
