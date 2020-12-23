import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {unLoginUser} from "../../../Redux/AuthReducer";

const HeaderContainer = (props) =>{
    return(
        <Header {...props} />
    )
}

const mapStateToProps = (state) =>{
    return{
        myName: state.authR.myName,
        isAuth: state.authR.isAuth,
        myPhoto: state.authR.myPhoto,
        myId: state.authR.myId,
    }
}

export default connect(mapStateToProps, {unLoginUser})(HeaderContainer)