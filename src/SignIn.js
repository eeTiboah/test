import React, { useContext } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from "./firebase.js";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth.js";
 

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
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()}/>
      </div>
    );
  }

export default withRouter(SignInScreen)