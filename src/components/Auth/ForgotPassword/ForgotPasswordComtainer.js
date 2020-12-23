import React from 'react'
import ForgotPassword from "./ForgotPassword";
import {connect} from "react-redux";
import c from "../Login/Login.module.css";
import {ForgotPasswordThunk} from "../../../Redux/AuthReducer";

function ForgotPasswordComponent(props) {
    return (
        <div className={c.loginInputs}>
            <ForgotPassword {...props}/>
        </div>
    );
}

export default connect(null, {ForgotPasswordThunk})(ForgotPasswordComponent)