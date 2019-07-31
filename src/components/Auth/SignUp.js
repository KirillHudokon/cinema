import React from 'react';
class SignUp extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        const {email,password,name,signUp}=this.props
        signUp(email,password,name)
    }
    render(){
        return (
            <button className="btn_sign_up" onClick={this.handleClick}>SignUp</button>
        );
    }
}

export default SignUp;
