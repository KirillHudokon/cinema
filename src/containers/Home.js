import React from 'react';
import LogOut from '../components/Auth/LogOut'
import {connect} from 'react-redux'
import {logout,} from "../actions/UserAction";
import {getUserBlockPlaces} from "../actions/HoleAction";
import Holes from './Holes'
import AccountImage from "../components/account/AccountImage";
import Form from './Form'
class  Home extends React.Component{
    componentDidMount(){
        const {user,getUserBlockPlacesAction} = this.props
        if(user.cred) {
            getUserBlockPlacesAction(user.cred.uid)
        }
    }
    state={
        visible:false
    }
    handleClicker=()=>{
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
                {this.state.visible && <Form/>}
            </div>

        </div>
    }
    render(){
        const {user}=this.props
        let HeaderInfo= user.cred ? this.renderHeaderAuthInfo() : this.renderHeaderWithOutInfo()
        return (
            <div>
                <header className='header'>
                    <div className='flexContainer'>
                        <div className='logo'>
                            Cinema
                        </div>
                        { HeaderInfo }
                    </div>
                </header>
                <main>
                    <Holes/>
                </main>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user,
})
export const mapDispatchToProps = dispatch =>({
    logOutAction: ()=>dispatch(logout()),
    getUserBlockPlacesAction: (uid)=>dispatch(getUserBlockPlaces(uid))
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
