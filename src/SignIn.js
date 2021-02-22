import React, { useContext } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from "./firebase.js";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import './SignIn.css'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/order',
  signInOptions: [
    {
        provider: app.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', 
          size: 'normal', 
          badge: 'bottomleft' 
        },
        defaultCountry: 'GH'
    }
  ]
};

 
const SignInScreen = () =>{
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
      return <Redirect to="/order" />;
    }

    return (
      <div className="signin_page">
        <h3 className="signin_p">Please sign-in:</h3>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()}/>
      </div>
    );
  }

export default withRouter(SignInScreen)