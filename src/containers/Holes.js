import React from 'react';
import {connect} from 'react-redux'
import {getHoles} from "../actions/HoleAction";
import Places from "../components/Holes/Places";

class Holes extends React.Component{
    componentDidMount(){
        this.props.getHolesAction()
    }
    render(){
        return (
            <div>
                <Places/>
            </div>
        )
    }
}
export const mapDispatchToProps = dispatch =>({
    getHolesAction:()=>dispatch(getHoles())
})

export default connect(null,mapDispatchToProps)(Holes);
