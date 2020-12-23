import {connect} from "react-redux";
import Registration from "./Registration";
import {registrationNewUser} from "../../../Redux/AuthReducer";
import React from "react";
import {Redirect} from "react-router-dom";

const RegistrationContainer = (props) =>{
    return(
        props.isReg ? <Redirect to={'/login'}/> : <Registration {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{
        isReg: state.authR.isReg
    }
}

export default connect(mapStateToProps, {registrationNewUser})(RegistrationContainer)