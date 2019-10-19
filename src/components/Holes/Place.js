import React, {PureComponent } from 'react';


class Place extends PureComponent {


    state = {
        status:this.props.place.status
    };

    changeStatus=()=>{
        const {film,queue,userQueue,userBlockQueueAction,i,filmId}=this.props
        const {status}=this.state
        if(status==='unlocked'){
            userBlockQueueAction(userQueue,film,i,'prelocked','user')
            userBlockQueueAction(queue,filmId,i,'prelocked','films')
            this.setState({
                status:'prelocked'
            })
        }else{
            userBlockQueueAction(userQueue,film,i,'unlocked','user')
            userBlockQueueAction(queue,filmId,i,'unlocked','films')
            this.setState({
                status:'unlocked'
            })
        }
    }
    renderPlace(){
        const {i,userQueue,film}=this.props
        const {status} = this.state

        if(userQueue.length) {
           userQueue.filter(keyObj => Object.keys(keyObj).join('') === film).forEach(filterFilm => {
                if(+Object.values(filterFilm).join('')===i+1){
                    this.setState({
                        status:'prelocked'
                    })
                }
            })
        }
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

export default Place;
