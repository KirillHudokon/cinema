import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CinemaPlace from "./CinemaPlace";

class CinemaLines extends Component {

    renderBlocks(blocks){
        const {queue, rooms,film,blockQueue,userBlockQueue,userQueue}=this.props
        return blocks.map((key,i)=>{
            const {status} = key;
            return <CinemaPlace
                key={`${key }${i}`}
                userQueue={userQueue}
                queue={queue}
                blockQueue={blockQueue}
                rooms={rooms}
                film={film}
                status={status}
                i={i}
                userBlockQueue={userBlockQueue}
            />
        })
    }

    render() {
        const {rooms,film}=this.props
        return this.renderBlocks(rooms[film])
    }
}

export default CinemaLines;
