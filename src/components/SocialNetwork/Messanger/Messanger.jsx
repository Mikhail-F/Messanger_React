import React from 'react'
import DialogsContainer from "./Dialogs/DialogsContainer";
import MessagesContainer from "./Messages/MessagesContainer";
import c from './Messanger.module.css'

const Messanger = (props) =>{
    return(
        <>
            <div className={c.container}>
                <div className={c.messanger}>
                    <DialogsContainer {...props} />
                    <MessagesContainer {...props} />
                </div>
            </div>
        </>
    )
}


export default Messanger