import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import Film from "../components/Holes/Film";

class Menu extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className='menu'>
                <div className='leftSideContainer'>
                    <ul className='categories'>
                        <li className='category'>
                           Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span  className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                        <li className='category'>
                            Pizda <span className='counter'>(150)</span>
                        </li>
                    </ul>
                </div>
                <div className='centerContainer'>
                    {/*<Film/>*/}

                    <div className='filmSelection'>
                        <div className='viewContainerContent'>
                            <div className='viewContainerTitleAndRate'>
                                <h2 className='viewContainerTitle'>Cчастливы вместе</h2>
                                <div className='viewContainerRate'>
                                    <FontAwesomeIcon className='starLiked' icon={faStar}/>
                                    <FontAwesomeIcon className='starLiked' icon={faStar}/>
                                    <FontAwesomeIcon className='starLiked' icon={faStar}/>
                                    <FontAwesomeIcon className='star' icon={faStar}/>
                                    <FontAwesomeIcon className='star' icon={faStar}/>
                                </div>
                            </div>
                            <div className='viewContainerDescription'>
                                <div className='viewContainerImage'>
                                    <img
                                        src="https://www.rabotnikitv.com/wp-content/uploads/2018/09/IMG_8075-200x300.jpg"
                                        alt="image"
                                    />
                                </div>
                                <div className='viewContainerInf'>
                                    <div className='viewContainerText content'>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid
                                        ex laudantium libero modi nobis nostrum qui recusandae vel. Dolorum enim
                                        exercitationem fuga illum minima quas rerum velit veniam! Distinctio?
                                    </div>
                                    <div className='viewContainerYearOfManufacture content'>
                                        Год выпуска: 2014
                                    </div>
                                    <div className='viewContainerCountry content'>
                                        Страна: США
                                    </div>
                                    <div className='viewContainerNumberOfPlaces content'>
                                        Количество мест: 50
                                    </div>
                                    <div className='viewContainerNumberOfFreePlaces content'>
                                        Количество свободных мест: 30
                                    </div>
                                </div>
                            </div>
                            <div className='viewContainerExtra'>
                                <div className='viewContainerExDet'>
                                    <button className='viewContainerDetails'>
                                        Подробнее
                                    </button>
                                </div>
                                <div className='viewContainerDate'>
                                    12.04.2017, 13:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
