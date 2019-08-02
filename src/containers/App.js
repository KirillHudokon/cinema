import React from 'react';
import Form from '../components/Auth/Form'
import Home from './Home'
import {connect} from 'react-redux'
class App extends React.Component{
    render(){
        return (
            <div className="App">
                {/*{this.props.user.name ? <Home/> : <Form/>}*/}
                <Home/>
            </div>
        );
    }
}
export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = null
export default connect(mapStateToProps,mapDispatchToProps)(App);
