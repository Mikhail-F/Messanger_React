import React from 'react'
import LoginFormReudx from "./LoginForm";
import {NavLink} from "react-router-dom";
import c from './Login.module.css'

const Login = (props) =>{

    const loginSubmit = (value) =>{
        props.loginUser(value.email, value.password)
    }

    return(
        <div className={c.loginInputs}>
            <div>Логин:</div>
            <div className={c.regForm}><NavLink to={'/registration'}>Регистрация</NavLink></div>
            <LoginFormReudx onSubmit={loginSubmit}/>
            <div className={c.regForm}><NavLink to={'/forgotPassword'}>Забыли пароль ?</NavLink></div>
        </div>
    )
}


export default Login