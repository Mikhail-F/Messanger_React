import React from 'react'
import NavBar from "./Navbar";
import {connect} from "react-redux";
import {toLeaveAMessages} from "../../../Redux/MessagesReducer";

const NavbarContainer = (props) =>{
    return (
        <NavBar {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{
        myId: state.authR.myId
    }
}

export default connect(mapStateToProps, {toLeaveAMessages})(NavbarContainer)