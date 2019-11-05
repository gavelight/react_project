import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  button: {
    margin: 15
  }
}

export default function Login({loginUser, loginSubmit, loginInputChange, navigateToRegister, messageOpen}) {  

    // State for email error
    const[emailError, setEmailError] = useState({ error: false, helperText: ''});

    // State for password error
    const[passwordError, setPasswordError] = useState({ error: false, helperText: ''});

    // Checks email validity
    const isValidEmail = (email) => {

      // Defining regex for checking
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      // Returns true if email matches the regex
      return (email.match(mailFormat));
    };

    // Handles closing message
    const handleClose = () => {
      messageOpen = false;
    }

    // Handle field change
    const onFieldChange = (event) => {
      loginInputChange(event);
    };

    // Handle register click
    const onRegisterClick = (event) => {
      navigateToRegister();
    }

    // Handle submit click
    const onSubmitClick = (event) => {

      let errorFound;

      // First, perform some validations

      // If email wasn't filled
      if(!loginUser.email) {
        setEmailError({error:true, helperText:'Email field must be entered'});
        errorFound=true;
      }

      // If email is invalid
      else if(!isValidEmail(loginUser.email)) {
        setEmailError({error:true, helperText:'The entered email is invalid'});
        errorFound=true;
      }

      // If email is valid
      else {
        setEmailError({error:false, helperText:''});
      }

      // If password wasn't filled
      if(!loginUser.password) {
        setPasswordError({error:true, helperText:'Password field must be entered'});
        errorFound=true;
      }

      else {
        setPasswordError({error:false, helperText:''});
      }

      // If error was found, exit
      if(errorFound)
        return;

      loginSubmit(event);
    };

    return (
        <>
          <TextField label="Email"
                     type="email"
                     name="email"
                     variant="outlined"
                     margin="normal"
                     error={emailError.error}
                     helperText={emailError.helperText}
                     defaultValue={loginUser.email}
                     onChange={onFieldChange}/>
          <br/>
          <TextField label="Password"
                     name="password"
                     type="password"
                     variant="outlined"
                     margin="normal"
                     error={passwordError.error}
                     helperText={passwordError.helperText}
                     defaultValue={loginUser.password}
                     onChange={onFieldChange}/>
          <br/>
          <Button variant="contained"
                  color="primary"
                  style={styles.button}
                  onClick={onSubmitClick}>
            Log In
          </Button>
          <br/>
          <Button variant="contained"
                  color="secondary"
                  style={styles.button}
                  onClick={onRegisterClick}>
            New here? Register!
          </Button>
          <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={messageOpen}
                    onClose={handleClose}
                    ContentProps={{'aria-describedby': 'message-id'}}
                    message={<span id="message-id">The entered details are incorrect, please try again</span>}/>
        </>
    );
}

