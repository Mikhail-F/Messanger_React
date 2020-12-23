import React from "react";
import c from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const NavBar = (props) =>{
    return (
        <div className={c.navbar}>
            <NavLink to={`/profile/${props.myId}`}>Моя страница</NavLink>
            <NavLink to={'/messanger'} onClick={props.toLeaveAMessages}>Мессeнджер</NavLink>
        </div>
    )
}

export default NavBar