import React from 'react';
import LogOut from './Auto/LogOut'
import {connect} from 'react-redux'
import {logout} from "../actions/UserAction";
class  Home extends React.Component{
    render(){
        const{user,logOutAction}=this.props
        return (
            <div>
                You are on page, {user.name}
            <LogOut logout={logOutAction}/>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = dispatch =>({
    logOutAction: ()=>dispatch(logout()),
})
export default connect(mapStateToProps,mapDispatchToProps)(Home);
