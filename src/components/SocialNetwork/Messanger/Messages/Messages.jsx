import React, {useState} from 'react'
import c from './Messages.module.css'
import face from '../../../../assets/imgs/face.jpg'
import {NavLink} from "react-router-dom";

const Messages = (props) => {

    const [defaultMessage, setDefaultMessage] = useState('')
    const [changeMessageText, setChangeMessageText] = useState(false)
    const [changeMessageTextValue, setChangeMessageTextValue] = useState('')
    const [changeMessageTextId, setChangeMessageTextId] = useState(null)
    const [changeMessageBtn, setChangeMessageBtn] = useState(null)
    const [showEditMessage, setShowEditMessage] = useState(false)

    const newMessage = (value) => {
        setDefaultMessage(value.target.value)
    }

    const sendNewMessage = () => {
        if(defaultMessage.trim() === ''){
            return
        }
        props.addNewMessage(defaultMessage)
        setDefaultMessage('')
    }

    const sendChangeMessage = (id) =>{
        setChangeMessageText(false)
        props.changeMessage(changeMessageTextValue, id)
    }

    const setVisibleChangeMessageInp = (message, id) =>{
        setChangeMessageTextValue(message)
        setChangeMessageTextId(id)
        setChangeMessageText(true)
    }

    return (
        props.talkUserId !== null &&
        <div className={c.messagesBlock}>
            <div className={c.profile}><span className={c.talkName}>{props.talkUserName}</span><NavLink to={`/profile/${props.talkUserId}`}><img className={c.face} src={props.talkUserPhoto === null ? face : props.talkUserPhoto} alt=""/></NavLink></div>
            <div className={c.messages} id={'messages'}>
                {props.viewMessages.map(el => {
                    debugger
                    return (
                        <div key={el.id} className={props.talkUserId !== el.userId ? c.right : c.left}>
                            {changeMessageText && changeMessageTextId === el.id ?
                                <>
                                    <input type="text" value={changeMessageTextValue} onChange={e => setChangeMessageTextValue(e.target.value)}/>
                                    <button onClick={() => sendChangeMessage(el.id)}>Save</button>
                                </>
                            :
                                <div className={props.talkUserId !== el.userId ? c.messageBlockRight : c.messageBlockLeft} onMouseEnter={() => setChangeMessageBtn(el.id)} onMouseLeave={() => setChangeMessageBtn(null)}>
                                    <div className={props.talkUserId !== el.userId ? c.messageReverse : c.message}>
                                        <div className={c.text}>{el.message}</div>
                                        {changeMessageBtn === el.id && el.userId === props.myId ?
                                            <span className={c.editMessage} onClick={() => setVisibleChangeMessageInp(el.message, el.id)}>&#9998;</span> : null
                                        }
                                    </div>
                                <div className={c.time}>
                                    {el.date}
                                </div>
                            </div>}

                        </div>
                    )

                })}
            </div>
            <div className={c.messagesForm}>
                <input type="text" onChange={newMessage} value={defaultMessage} className={c.inputFormMessage} placeholder={'Введите сообщение'}/>
                <button onClick={sendNewMessage}>Отправить</button>
            </div>
        </div>

    )
}

export default Messages