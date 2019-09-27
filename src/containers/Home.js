import React from 'react';
import LogOut from '../components/Auth/LogOut'
import {connect} from 'react-redux'
import {logout,} from "../actions/UserAction";
import {getUserBlockPlaces} from "../actions/HoleAction";
import {resetToMainMenu} from "../actions/FilmsAction";
import AccountImage from "../components/account/AccountImage";
import Form from './Form'
import Menu from "./Menu";
import {Link, Route} from "react-router-dom";
import NavMenu from "./NavMenu";


class  Home extends React.Component{
    state={
        visible: false,
    }

    componentDidMount(){
        const {user, getUserBlockPlacesAction} = this.props
        if(user.cred) {
            getUserBlockPlacesAction(user.cred.uid)
        }
    }
    handleClicker=()=>{
        if(this.state.visible){
            document.body.style.overflow = 'auto';
        }
        else{
            document.body.style.overflow = 'hidden';
        }
        this.setState({visible:!this.state.visible})
    }
    renderHeaderAuthInfo=()=>{
        const {user,logOutAction}=this.props
        const {displayName}=user.cred
            return  <div className='prof'>
                     <div className='image'>
                         {displayName &&   <AccountImage name={user.cred.displayName}/>}
                     </div>
                     <div className='userName'>
                         {displayName && <p> Hi, {user.cred.displayName}!</p>}
                     </div>
                 <div className='logOutBlock'>
                     <LogOut logout={logOutAction}/>
                 </div>
             </div>

    }
    renderHeaderWithOutInfo=()=>{
        return <div className='prof'>
            <div className='logOutBlock'>
                <button className='butLogin' onClick={this.handleClicker}>Login</button>
            </div>

        </div>
    }
    changeNavMenuState=()=> {
        const wrapper = document.getElementById('navMenu');
        wrapper.classList.toggle('is-nav-open')
        const back = document.getElementById('supGrey');
        back.classList.toggle('isActive')
    }
    render(){
        const {user,resetToMainMenu}=this.props
        if(user.cred){
            document.body.style.overflow = 'auto';
        }
        let HeaderInfo= user.cred ? this.renderHeaderAuthInfo() : this.renderHeaderWithOutInfo()
        return (
            <>
                <div className='supBack'/>
                <div id='supGrey' onClick={this.changeNavMenuState}/>
                <header className='header'>
                    <div className='flexContainer'>
                        <div className='logo'>
                            <Link to='/' onClick={resetToMainMenu} className='logoText'>
                                Cinema
                            </Link>
                        </div>
                        { HeaderInfo }
                    </div>
                </header>
                <main className='main'>
                    <Route path='/' component={Menu}/>
                    {this.state.visible && !user.cred && <Form message={user.successfulMessage} error={user.error}/>}
                </main>

            </>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user,
})
export const mapDispatchToProps = dispatch =>({
    logOutAction: ()=>dispatch(logout()),
    getUserBlockPlacesAction: (uid)=>dispatch(getUserBlockPlaces(uid)),
    resetToMainMenu:()=>dispatch(resetToMainMenu())
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
