import {Route} from "react-router-dom";
import Messanger from "./Messanger/Messanger";
import ProfileContainer from "./Profile/ProfileContainer";
import React from "react";
import HeaderContainer from "./Header/HeaderContainer";
import NavbarContainer from "./NavBar/NavbarContainer";
import c from './SocialNetwork.module.css'

const SocialNetwork =(props) =>{
    return(
        <>
            <HeaderContainer {...props} />
           <div className={c.socialContainer}>
               <NavbarContainer {...props}/>
               <>
                   <Route path={'/messanger'} render={() => <Messanger/>}/>
                   <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
               </>
           </div>
        </>
    )
}

export default SocialNetwork