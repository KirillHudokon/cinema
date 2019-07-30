import React from 'react';
class Login extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        const {email,password,login}=this.props
        console.log(email,password)
        login(email,password)
    }
    render(){
        return (
            <button onClick={this.handleClick}>Login</button>
        );
    }
}

export default Login;
