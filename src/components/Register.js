import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    margin: 15
  }
}

export default function Register({loginUser, registerSubmit, loginInputChange}) {  

    // State for first name
    const[firstNameError, setFirstNameError] = useState({ error: false, helperText: ''});

    // State for last name
    const[lastNameError, setLastNameError] = useState({ error: false, helperText: ''});

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

    // Checks name validity
    const isValidName = (name) => {

        // Defining regex for checking
        const nameFormat = /^[a-zA-Z ]{2,30}$/;
  
        // Returns true if email matches the regex
        return (name.match(nameFormat));
      };    

    // Handle field change
    const onFieldChange = (event) => {
      loginInputChange(event);
    };

    // Handle submit click
    const onSubmitClick = (event) => {

      let errorFound;

      // First, perform some validations

      // If first name wasn't filled
      if(!loginUser.firstName) {
        setFirstNameError({error:true, helperText:'First name must be entered'});
        errorFound=true;
      }

      // If first name is invalid
      else if(!isValidName(loginUser.firstName)) {
        setFirstNameError({error:true, helperText:'The entered first name is invalid'});
        errorFound=true;
      }

      // If first name is valid
      else {
        setFirstNameError({error:false, helperText:''});
      }

      // If last name wasn't filled
      if(!loginUser.lastName) {
        setLastNameError({error:true, helperText:'Last name must be entered'});
        errorFound=true;
      }

      // If last name is invalid
      else if(!isValidName(loginUser.lastName)) {
        setLastNameError({error:true, helperText:'The entered last name is invalid'});
        errorFound=true;
      }

      // If last name is valid
      else {
        setLastNameError({error:false, helperText:''});
      }      

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

      registerSubmit(event);
    };

    return (
        <>
          <TextField label="First name"
                     type="text"
                     name="firstName"
                     variant="outlined"
                     margin="normal"
                     error={firstNameError.error}
                     helperText={firstNameError.helperText}
                     defaultValue={loginUser.firstName}
                     onChange={onFieldChange}/>
          <br/>
          <TextField label="Last name"
                     type="text"
                     name="lastName"
                     variant="outlined"
                     margin="normal"
                     error={lastNameError.error}
                     helperText={lastNameError.helperText}
                     defaultValue={loginUser.lastName}
                     onChange={onFieldChange}/>
          <br/>                  
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
            Register
          </Button>       
        </>
    );
}

