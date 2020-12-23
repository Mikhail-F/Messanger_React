import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import c from './Dialogs.module.css'
import face from '../../../../assets/imgs/face.jpg'

const Dialogs = (props) =>{

    let url = props.location.pathname.slice(11)

    useEffect(() =>{
        props.allUsers.map(el => {
            if(el.profile.userId === url){
                props.setInterlocutor(el.profile.userId, el.profile.name, el.profile.photo, el.profile.status, el.profile.posts)
            }
        })
    }, [])

    return(
        <div className={c.dialogsContainer}>
            <div className={c.dialogs}>
                {props.allUsers.map(el =>{
                    return <NavLink key={el.profile.userId} to={`/messanger/${el.profile.userId}`} className={c.userSelected} activeClassName={c.active} onClick={() => {props.setInterlocutor(el.profile.userId, el.profile.name, el.profile.photo, el.profile.status, el.profile.posts)}}>
                            <div className={c.innerSelectUser}>
                                <img className={c.face} src={el.profile.photo === undefined ? face : el.profile.photo} alt="фейс"/>
                                {el.profile.name}
                            </div>
                    </NavLink>
                })}
            </div>
        </div>
    )
}

export default Dialogs