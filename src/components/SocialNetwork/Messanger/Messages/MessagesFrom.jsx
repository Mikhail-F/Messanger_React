import React from 'react'
import {Field, reduxForm} from "redux-form";
import c from './Messages.module.css'

const MessagesForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit} className={c.messagesForm}>
            <Field component={'input'} name={'newMessage'} placeholder={'Введите сообщение'} type={'text'} className={c.inputFormMessage}/>
            <button>Отправить</button>
        </form>
    )
}

const MessagesFormRedux = reduxForm({
    form: 'messages'
})(MessagesForm)

export default MessagesFormRedux