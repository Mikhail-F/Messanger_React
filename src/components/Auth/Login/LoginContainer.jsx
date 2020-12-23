import {connect} from "react-redux";
import Login from "./Login";
import {loginUser} from "../../../Redux/AuthReducer";

const LoginContainer = (props) =>{
    return(
        <Login {...props}/>
    )
}

export default connect(null, {loginUser})(LoginContainer)