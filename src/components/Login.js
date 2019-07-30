import React from 'react';

class Login extends React.Component{
    handleClick=()=>{
        this.props.handleLogin()
    }
    render(){
        return (
            <button onClick={this.handleClick}>
                Login
            </button>
        );
    }
}

export default Login;
