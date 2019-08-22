import React from 'react';
class AccountImage extends React.Component{
    getLetters(){
       const {name}=this.props
        if(name.split(' ').length!==2){
            return `${name[0]}${name[name.length-1]}`.toUpperCase()
        }else {
            return name.split(' ')
                .splice(0, 2)
                .map(word => word[0])
                .join('')
                .toUpperCase()
        }
    }
    render(){
        return (
            <div className='round'>
                <div className='blockRound'>
                    {this.getLetters()}
                </div>
            </div>
        );
    }
}

export default AccountImage;
