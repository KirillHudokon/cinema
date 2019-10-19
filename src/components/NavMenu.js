import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faKey} from "@fortawesome/free-solid-svg-icons";

class NavMenu extends Component {
    state={
        currentPassword:'',
        newPassword:''
    }
    handleClick() {
        const wrapper = document.getElementById('navMenu');
        wrapper.classList.toggle('is-nav-open')
        const back = document.getElementById('supGrey');
        back.classList.toggle('isActive')
    }
    renderPlaces(){
        if(this.props.places.length===0){
            return <li className='warnBookedPlace'>У вас еще нет броней</li>
        }
        return this.props.places.map(filmKey=>{
            return Object.keys(filmKey).map((film,i)=>{
                return <li className='userBookedPlace books' key={i}>
                    {film} : {filmKey[film]} место
                </li>
            })
        })
    }
    handleChanger = (e) =>{
        e.preventDefault()
        this.setState({[e.target.name]:e.target.value})
    }
    passwordChanger=()=>{
        const {currentPassword,newPassword}=this.state
        this.props.changePassword(currentPassword,newPassword)
    }
    render() {
        const {error,message}=this.props
        return (
            <div id="navMenu" className="navMenu">
                <div className="nav">
                    <FontAwesomeIcon className='nav__icon' icon={faBars} onClick={this.handleClick}/>
                    <ul>
                        {this.renderPlaces()}
                    </ul>
                </div>
                <div className='inputs white'>
                    Сменить пароль:
                    <div className='iconContainer'>
                        <FontAwesomeIcon className='icon' icon={faKey}/>
                        <input type="password" placeholder="Старый" name='currentPassword' onChange={this.handleChanger}
                               value={this.state.currentPassword}/>
                    </div>
                    <div className='iconContainer'>
                        <FontAwesomeIcon className='icon' icon={faKey}/>
                        <input type="password" placeholder="Новый" name='newPassword' onChange={this.handleChanger}
                               value={this.state.newPassword}/>
                    </div>
                    {!!error ? <div className='error'>{error}</div> : null }
                    {!!message ? <div className='success'>{message}</div> : null}
                </div>
                <button className="btn_login" onClick={this.passwordChanger}>Change</button>
            </div>
        );
    }
}

export default NavMenu;
