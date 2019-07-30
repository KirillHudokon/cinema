import React from 'react';
import {connect} from 'react-redux'
import {signUp} from "../../actions/UserAction";
import {login} from "../../actions/UserAction";
import Login from './Login'
import SignUp from './SignUp'
class Form extends React.Component{
    state={
        email:'',
        password:''
    }
    handleChanger = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        const {loginAction,signUpAction,user} = this.props
        return (
            <div>
                <form>
                    <input type="text" name='email' onChange={this.handleChanger} value={this.state.email}/>
                    <br/>
                    <input type="password" name='password' onChange={this.handleChanger} value={this.state.password}/>
                    <br/>
                    <Login email={this.state.email} password={this.state.password} login={loginAction} />
                    <br/>
                    <SignUp email={this.state.email} password={this.state.password} signUp={signUpAction}/>
                    <p>{user.name}</p>
                </form>
            </div>
        );
    }
}

export const mapStateToProps = store =>({
    user: store.user
})
export const mapDispatchToProps = dispatch =>({
    loginAction: (email,password)=>dispatch(login(email,password)),
    signUpAction: (email,password)=>dispatch(signUp(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(Form);
