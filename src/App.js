import React, { useState } from "react";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {

  // State for the user's data (including login fields and additional info)
  const[loginUser, setLoginUser] = useState({ email: '', password: '', firstName: '', lastName: '' });

  // State for current app bar title
  const[appBarTitle, setAppBarTitle] = useState('Log In');

  // State for current screen
  const[currentScreen, setCurrentScreen] = useState('Login');

  // State for error message
  const[messageOpen, setMessageOpen] = useState(false);  

  // Function for handling login form submission
  const loginSubmit = (event) => {        
    event.preventDefault();

    // Set request body
    const requestBody = {'email': loginUser.email,
                         'password': loginUser.password,
                         'operation': 'login'};    

    // Post request to the server, it will return the user if it exists
    axios.post('http://localhost:3001/users', requestBody).then(res => {
      
      // If we received the result 
      if(res.data)
      {
        // updated the login user state with rest of the details
        setLoginUser({...loginUser, firstName: res.data.firstName, lastName: res.data.lastName});

        // Update the current screen
        setCurrentScreen('Home')

        // Set title
        setAppBarTitle(`Welcome ${res.data.firstName} ${res.data.lastName}`);
      }
      else
      {
        setMessageOpen(true)
      }
    });
  }

  // Navigate to register component
  const navigateToRegister = () => {
    setAppBarTitle('Register');
    setCurrentScreen('Register');
    setLoginUser({ email: '', password: '', firstName: '', lastName: '' });
  }

  // Function for handling register form submission
  const registerSubmit = (event) => {        
    event.preventDefault();
    
    // Set request body
    const requestBody = {'firstName': loginUser.firstName,
                         'lastName': loginUser.lastName,
                         'email': loginUser.email,
                         'password': loginUser.password,
                         'operation': 'register'};    

    // Post request to the server, it will create the user
    axios.post('http://localhost:3001/users', requestBody).then(res => {
      
      // If we received the result 
      if(res.data)
      {
        // Update the current screen
        setCurrentScreen('Home')

        // Set title
        setAppBarTitle(`Welcome ${loginUser.firstName} ${loginUser.lastName}`);
      }
    });
  }  

  // Function for updating email/password due to field change
  const loginInputChange = (event) => {
    const target = event.target;
    const name = target.name;      
    setLoginUser({
      ...loginUser, [name]: target.value
    });
  };

  // Current component object will hold the current component that we want to display on the screen
  let currentComponent;

  // Render component according to current screen
  switch(currentScreen) {
    case 'Register':
      currentComponent = <Register loginUser={loginUser} 
                                   registerSubmit={registerSubmit} 
                                   loginInputChange={loginInputChange}></Register>
      break;      
    case 'Login':
      currentComponent = <Login loginUser={loginUser} 
                                loginSubmit={loginSubmit} 
                                loginInputChange={loginInputChange} 
                                navigateToRegister={navigateToRegister}
                                messageOpen={messageOpen}></Login>
      break;
    case 'Home':
      currentComponent = <Home loginUser={loginUser}></Home>
      break;
  }

  return (
      <div className='App'>
        <MuiThemeProvider>
          <React.Fragment>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
                  {appBarTitle}
                </Typography>
              </Toolbar>
            </AppBar>
            {currentComponent}
          </React.Fragment>
        </MuiThemeProvider>
      </div>
  );
}

export default App;
