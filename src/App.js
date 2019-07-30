import React from 'react';
import Form from './components/Auto/Form'
import Home from './components/Home'
import {connect} from 'react-redux'
import fire from './config/Fire'
class App extends React.Component{
    componentDidMount(){
         this.onAuthState()
    }
    state={
        user:{}
    }
    onAuthState=()=>{
        const self=this
         fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user})
            } else {
                self.setState({user : null})
            }
        });
    }
    render(){
       // console.log('daunsergeich@gmail.com', 'Ab712712s')
        return (
            <div className="App">
                {this.state.user ? <Home/> : <Form/> }
            </div>
        );
    }
}
export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = null
export default connect(mapStateToProps,mapDispatchToProps)(App);
