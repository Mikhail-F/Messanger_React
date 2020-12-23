import './App.css';
import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import LoginContainer from "./components/Auth/Login/LoginContainer";
import RegistrationContainer from "./components/Auth/Registration/RegistrationContainer";
import {Auth} from "./Redux/AuthReducer";
import {connect} from "react-redux";
import SocialNetwork from "./components/SocialNetwork/SocialNetwork";
import ForgotPasswordComponent from "./components/Auth/ForgotPassword/ForgotPasswordComtainer";

const App = (props) => {

    useEffect(() =>{
        props.Auth()
    }, [])

  return (
      <>
          {!props.isFetching && <div className="App">
              {/*{props.isAuth && <Redirect to={`/messanger/oyPDErcC00ToEa9DmcMFCquR5y72`}/>}*/}
              {props.isAuth && <SocialNetwork/>}
              <Route path={'/login'} render={() => <LoginContainer/>}/>
              <Route path={'/registration'} render={() => <RegistrationContainer/>}/>
              <Route path={'/forgotPassword'} render={() => <ForgotPasswordComponent/>}/>
          </div>}
      </>
  );
}

let mapStateToProps = (state) =>{
    return{
        isFetching: state.authR.isFetching,
        isAuth: state.authR.isAuth,
        myId: state.authR.myId
    }
}

export default connect(mapStateToProps, {Auth})(App);
