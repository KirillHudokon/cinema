import React,{useEffect} from 'react';
import LogOut from '../components/Auth/LogOut'
import {connect} from 'react-redux'
import {logout,} from "../actions/UserAction";
import {getUserBlockPlaces} from "../actions/HoleAction";
import {resetToMainMenu} from "../actions/FilmsAction";
import AccountImage from "../components/account/AccountImage";
import Form from './Form'
import Menu from "./Menu";
import {Link, Route,Switch,useLocation, Redirect} from "react-router-dom";
import NavMenu from "./NavMenu";
import ViewContent from "../components/ViewContent";

function usePageViews() {
    return useLocation().pathname
}

function Home(props){
    let localPath=usePageViews()!=='/Auth'? '/Auth' : '/'  // заглушка '/', должно быть равно предыдузему урлу
    useEffect(() => {
        const {user, getUserBlockPlacesAction} = props
        if(user.cred) {
            getUserBlockPlacesAction(user.cred.uid)
        }
    });
    const renderHeaderAuthInfo=()=>{
        const {user,logOutAction}=props
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
    const renderHeaderWithOutInfo=()=>{
        return <div className='prof'>
            <div className='logOutBlock'>
                <Link to={localPath} className='butLogin'>Login</Link>
            </div>

        </div>
    }
    const changeNavMenuState=()=>{
        const wrapper = document.getElementById('navMenu');
        wrapper.classList.toggle('is-nav-open')
        const back = document.getElementById('supGrey');
        back.classList.toggle('isActive')
    }
    const renderHeader=()=>{
        const {user,resetToMainMenu}=props
        if(user.cred){
            document.body.style.overflow = 'auto';
        }
        let HeaderInfo= user.cred ? renderHeaderAuthInfo() : renderHeaderWithOutInfo()
        return (
            <>
                <div className='supBack'/>
                <div id='supGrey' onClick={changeNavMenuState}/>
                <header className='header'>
                    <div className='flexContainer'>
                        <div className='logo'>
                            <Link to='/' onClick={resetToMainMenu} className='logoText'>
                                Cinema
                            </Link>
                        </div>
                        {HeaderInfo}
                    </div>
                </header>
                <main className='main'>
                    <Switch>
                        <Route path={`/Auth`} exact={true}>
                            {user.cred && localPath!=='/Auth' ?
                                <Redirect to='/'/>:
                                <Form
                                    message={user.successfulMessage}
                                    error={user.error}
                                />
                            }
                        </Route>
                        <Route path='/' component={Menu}/>
                    </Switch>
                </main>
            </>
           )
    }

    return renderHeader()

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
