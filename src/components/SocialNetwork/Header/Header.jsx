import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import c from './Header.module.css'
import face from '../../../assets/imgs/face.jpg'

const Header = (props) => {

    let [headerModal, setHeaderModal] = useState(false)

    return (
        <div className={c.headerAbsolute}>
            <div className={c.headerComponent}>
                <div className={headerModal ? c.headerActive : c.headerDisable} onClick={() => setHeaderModal(!headerModal)}>
                    {props.myName}
                    <img className={c.face} src={props.myPhoto === null ? face : props.myPhoto} alt="" />
                    {props.isAuth && <div className={headerModal ? c.headerModalActive : c.headerModalDisable}><NavLink to={'/login'} onClick={props.unLoginUser}>Выйти</NavLink></div>}
                </div>
            </div>
        </div>
    )
}

export default Header