import React from 'react';
import LogOut from './Auth/LogOut'
import {connect} from 'react-redux'
import {logout} from "../actions/UserAction";
import {getRooms} from "../actions/RoomAction";
class  Home extends React.Component{
     componentDidMount(){
        this.props.getRoomsAction()
    }
    render(){
        const{user,room,logOutAction}=this.props
        console.log(room)
        return (
            <div>
                You are on page, {user.name}
            <LogOut logout={logOutAction}/>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user,
    room:store.room
})
export const mapDispatchToProps = dispatch =>({
    logOutAction: ()=>dispatch(logout()),
    getRoomsAction:()=>dispatch(getRooms())
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
