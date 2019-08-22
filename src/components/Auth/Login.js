import React from 'react';
class Login extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        const {email,password, login}=this.props
        login(email,password)
    }
    render(){
        return (
            <button className="btn_login" onClick={this.handleClick}>Login</button>
        );
    }
}

export default Login;
