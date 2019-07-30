import React from 'react';
import Login from './components/Login'
import {connect} from 'react-redux'
import handleLogin from './actions/UserAction'
class App extends React.Component{
    render(){
        console.log(this.props)
        const {user,handleLoginAction} = this.props
        return (
            <div className="App">
              <Login handleLogin={handleLoginAction}/>
                <div>
                    {user.name}
                </div>
            </div>
        );
    }
}
export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = dispatch =>({
    handleLoginAction: ()=>dispatch(handleLogin())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
