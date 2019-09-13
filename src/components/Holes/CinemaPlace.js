import React, {Component} from 'react';


class CinemaPlace extends Component {

    state={
        status:this.props.status
    }


    changeStatus=()=>{
        const {i,film, blockQueue,queue,userBlockQueue,userQueue}=this.props
        const {status}=this.state
        if(status==='unlocked'){
            blockQueue(queue,film,i,'prelocked')
            userBlockQueue(userQueue,film,i,'prelocked')
            this.setState({
                status:'prelocked'
            })
        }else{
            blockQueue(queue,film,i,'unlocked')
            userBlockQueue(userQueue,film,i,'unlocked')
            this.setState({
                status:'unlocked'
            })
        }
    }
    renderPlace(){
        const {i}=this.props
        const {status} = this.state
        if( status === 'unlocked'){
            return <div className='placeUnlocked' onClick={this.changeStatus}>
                <p>{i+1}</p>
            </div>
        }else if(status==='prelocked'){
            return <div className='placePreLocked' onClick={this.changeStatus}>
                <p>{i+1}</p>
            </div>
        } else{
            return <div className='placeLocked'>
                <p>{i+1}</p>
            </div>
        }
    }
    render() {
        return this.renderPlace()
    }
}

export default CinemaPlace;
