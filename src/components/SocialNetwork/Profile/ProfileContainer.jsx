import {connect} from "react-redux";
import Profile from "./Profile";
import {setInterlocutor, setNewStatus, setStatusChange, setUpdateProfileTrunk} from "../../../Redux/AuthReducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const ProfileContainer = (props) =>{
    return(
        <Profile {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{
        myPhoto: state.authR.myPhoto,
        myName: state.authR.myName,
        myStatus: state.authR.myStatus,
        myPosts: state.authR.myPosts,
        myId: state.authR.myId,
        isStatusChange: state.authR.isStatusChange,
        talkUserId: state.authR.talkUserId,
        talkUserPhoto: state.authR.talkUserPhoto,
        talkUserName: state.authR.talkUserName,
        talkUserStatus: state.authR.talkUserStatus,
        talkUserPosts: state.authR.talkUserPosts,
        allUsers: state.dialogsR.allUsers,
    }
}

export default compose(
    connect(mapStateToProps, {setUpdateProfileTrunk, setStatusChange, setNewStatus, setInterlocutor}),
    withRouter
)(ProfileContainer)