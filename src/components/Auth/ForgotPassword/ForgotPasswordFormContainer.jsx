import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from "../Login/Login.module.css";

let ForgotPasswordForm = (props) =>{

    return(
        <form onSubmit={props.handleSubmit} className={c.loginForm}>
            <Field component={'input'} type={'email'} name={'email'} placeholder={"Введите email"} className={c.loginFormInput} required/>
            <div className={c.buttonInner}><button className={c.buttonLogIn}>Отправить</button></div>
        </form>
    )
}

let ForgotPasswordFormContainer = reduxForm({
    form: 'forgot'
})(ForgotPasswordForm)

export default ForgotPasswordFormContainer