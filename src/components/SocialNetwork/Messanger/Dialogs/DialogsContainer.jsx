import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {setInterlocutor} from "../../../../Redux/AuthReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const DialogsContainer = (props) =>{
    return (
        <Dialogs {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{
        isAuth: state.authR.isAuth,
        allUsers: state.dialogsR.allUsers,
        myId: state.dialogsR.myId
    }
}

export default compose(
    connect(mapStateToProps, {setInterlocutor}),
    withRouter
)(DialogsContainer)