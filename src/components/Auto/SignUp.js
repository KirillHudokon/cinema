import React from 'react';
class SignUp extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        const {email,password,signUp}=this.props
        signUp(email,password)
    }
    render(){
        return (
            <button onClick={this.handleClick}>SignUp</button>
        );
    }
}

export default SignUp;
