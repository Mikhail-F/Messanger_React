import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from './Login.module.css'

const LoginForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={'input'} name={'email'} type={'text'} placeholder={'Введите email'} className={c.loginFormInput}/>
            <Field component={'input'} name={'password'} type={'text'} placeholder={'Введите password'} className={c.loginFormInput}/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Войти</button></div>
        </form>
    )
}

const LoginFormReudx = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginFormReudx