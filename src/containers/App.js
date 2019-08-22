import React from 'react';
import Home from './Home'
import {connect} from 'react-redux'
import {userListener} from "../actions/UserAction";

class App extends React.Component{
    componentDidMount(){
        this.props.userListenerAction()
    }
    render(){
        if(!this.props.user.loading) {
            return (
                <div className="App">
                    <Home/>
                </div>
            )
        }else{
            return(
                <p>Loading...</p>
            )
        }
    }
}
export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = dispatch=>({
    userListenerAction:()=>dispatch(userListener())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
