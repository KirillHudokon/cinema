import React from 'react';
class Login extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        const {email,password, login}=this.props
        //console.log(email,password,name)
        login(email,password)
    }
    render(){
        return (
            <button className="btn_login" onClick={this.handleClick}>Login</button>
        );
    }
}

export default Login;
