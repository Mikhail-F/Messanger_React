import Posts from "./Posts";
import {connect} from "react-redux";
import {addNewPost} from "../../../../Redux/AuthReducer";

const PostsContainer = (props) =>{
    return(
        <Posts {...props}/>
    )
}

let mapStateToProps = (state) =>{
    return{}
}

export default connect(mapStateToProps, {addNewPost})(PostsContainer)