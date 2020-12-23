import React from 'react'
import ForgotPasswordFormContainer from "./ForgotPasswordFormContainer";
import {NavLink} from "react-router-dom";

const ForgotPossword = (props) =>{

    let ForgotMe = (value) =>{
        props.ForgotPasswordThunk(value.email)
    }

    return(
        <div>
            <NavLink to={'/login'}>Назад</NavLink>
            <div>Восстановление пароля:</div>
            <ForgotPasswordFormContainer {...props} onSubmit={ForgotMe} />
        </div>
    )
}

export default ForgotPossword