import {connect} from "react-redux";
import React from "react";
import Messages from "./Messages";
import {addNewMessage, changeMessage} from "../../../../Redux/MessagesReducer";

const MessagesContainer = (props) =>{
    return (
        <Messages {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{
        viewMessages: state.messagesR.viewMessages,
        talkUserId: state.authR.talkUserId,
        talkUserPhoto: state.authR.talkUserPhoto,
        talkUserName: state.authR.talkUserName,
        myId: state.authR.myId,
    }
}

export default connect(mapStateToProps, {addNewMessage, changeMessage})(MessagesContainer)