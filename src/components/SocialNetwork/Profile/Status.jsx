import React from 'react'
import c from './Profile.module.css'

const Status = (props) =>{
    return(
        props.myId === props.url ?
            props.isStatusChange ? <div>
            <input type="text" onChange={props.setMyStatus} value={props.status} placeholder={'Введите статус'}/>
            <div onClick={() => props.setStatusChange(false)}>Сохранить</div>
        </div> : <div onClick={() => props.setStatusChange(true)} className={c.status}>{props.status}</div>
            :
            <div className={c.status}>{props.status !== 'Изменить статус' ? props.status : ''}</div>
    )
}

export default Status