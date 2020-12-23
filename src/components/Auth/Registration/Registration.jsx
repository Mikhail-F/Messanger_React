import React from 'react'
import RegistrationFormReudx from "./RegistrationForm";
import c from '../Login/Login.module.css'
import {NavLink} from "react-router-dom";

const Registration = (props) =>{

    const regSubmit = (value) =>{
        debugger
        props.registrationNewUser(value.email, value.password, value.name)
    }

    return(
        <div className={c.loginInputs}>
            <NavLink to={'/login'}>Назад</NavLink>
            <div>Регистрация:</div>
            <RegistrationFormReudx {...props} onSubmit={regSubmit}/>
        </div>
    )
}


export default Registration