import React from 'react';

class Holes extends React.Component{
    state={
        blockQueuee:[]
    }
    updateBlockPlaces=()=>{
        let masWithStatus=[];
        this.state.blockQueuee.map(key=>{
            Object.keys(key).map(name=>{
                getFiniteValue(key,name)
                this.props.blockPlaces(name,masWithStatus)
                masWithStatus=[]
            })
        })
        function getFiniteValue(obj,name) {
            getProp(obj,name);

            function getProp(o) {
                for(let prop in o) {
                    if(typeof(o[prop]) === 'object') {
                        getProp(o[prop]);
                    } else {
                        let {status}=o
                        if(status==='prelocked'){
                            masWithStatus.push({status:'locked'})
                        }else {
                            masWithStatus.push(o)
                        }
                    }
                }
            }
        }

    }
    addToQueuee=(block,e)=>{
        delete block[Number(e.target.innerText)-1]
        block[Number(e.target.innerText)-1]={status:'prelocked'}
        const nextBlock=[{[e.currentTarget.parentElement.previousSibling.innerText]:block},...this.state.blockQueuee]
        this.setState({blockQueuee:nextBlock})

    }
    removeOutOfQueuee=(block,e)=>{
        delete block[Number(e.target.innerText)-1]
        block[Number(e.target.innerText)-1]={status:'unlocked'}
        e.currentTarget.className='placeUnlocked'
    }
    renderBlocks(blocks){
        return blocks.map((key,i)=>{
            const {status} = key;
            if( status === 'locked'){
                return <div className='placeLocked' key={i}>
                             <p>{i+1}</p>
                       </div>
            }else if(status==='prelocked'){
                return <div className='placePreLocked'  onClick={(e)=>this.removeOutOfQueuee(blocks,e)} key={i}>
                            <p>{i+1}</p>
                       </div>
            } else{
                return <div className='placeUnlocked'  onClick={(e)=>this.addToQueuee(blocks,e)} key={i}>
                            <p>{i+1}</p>
                       </div>
            }
        })
    }
    renderCinemaPlaces=()=>{
        const {rooms}= this.props
        return Object.keys(rooms).length ? Object.keys(rooms).map((keyName)=> {
            return keyName
        }).map((hole,key)=>{
            return <div className='placeBlock' key={hole}>
                <h2>{hole}</h2>
                <div className='placeContainer'>{this.renderBlocks(rooms[hole])}</div>
            </div>
        }): null
    }
    render(){
        return (
            <div>
                {this.renderCinemaPlaces()}
                <button className='btn_prin' onClick={this.updateBlockPlaces}>Принять</button>
            </div>
        )
    }
}


export default Holes
