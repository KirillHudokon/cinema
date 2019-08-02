import React from 'react';
import LogOut from '../components/Auth/LogOut'
import {connect} from 'react-redux'
import {logout} from "../actions/UserAction";
import {getHoles} from "../actions/HoleAction";
import Holes from '../components/Holes'
import {blockPlaces} from "../actions/HoleAction";
class  Home extends React.Component{
     componentDidMount(){
         this.props.getHolesAction()
    }
    render(){
        const{user,holes,logOutAction,blockPlacesAction}=this.props
        console.log(holes)
        const {rooms}= holes
        return (
            <div>
                <header className='header'>
                    <div className='flexContainer'>
                        <div className='logo'>
                            React Cinema
                        </div>
                        <div className='prof'>
                            <div className='userName'>
                                Hi, {user.name}!
                            </div>
                            <div className='logOutBlock'>
                                <LogOut logout={logOutAction}/>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <Holes blockPlaces={blockPlacesAction} rooms={rooms}/>
                </main>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user,
    holes:store.holes
})
export const mapDispatchToProps = dispatch =>({
    logOutAction: ()=>dispatch(logout()),
    getHolesAction:()=>dispatch(getHoles()),
    blockPlacesAction:(hole,block)=>dispatch(blockPlaces(hole,block))
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
