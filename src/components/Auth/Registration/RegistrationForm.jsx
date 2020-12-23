import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from '../Login/Login.module.css'

const RegistrationForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={'input'} name={'email'} type={'text'} placeholder={'Введите email'} className={c.loginFormInput}/>
            <Field component={'input'} name={'password'} type={'text'} placeholder={'Введите password'} className={c.loginFormInput}/>
            <Field component={'input'} name={'name'} type={'text'} placeholder={'Введите имя'} className={c.loginFormInput}/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Создать</button></div>
        </form>
    )
}

const RegistrationFormReudx = reduxForm({
    form: 'registration'
})(RegistrationForm)

export default RegistrationFormReudx