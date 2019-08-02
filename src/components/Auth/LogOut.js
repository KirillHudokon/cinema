import React from 'react';
class LogOut extends React.Component{
    handleClick=(e)=>{
        e.preventDefault()
        this.props.logout()
    }
    render(){
        return (
            <button className='btn_logout' onClick={this.handleClick}>Logout</button>
        );
    }
}

export default LogOut;
