import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Button from './elements/Button'; // Button -> Button
import { ButtonContainer, Form, Input } from './elements/ElementsOfForm'; // ContenedorButton -> ButtonContainer, Form -> Form
import { HeaderContainer, Header, Title } from './elements/Header'; // HeaderContainer -> HeaderContainer, Title -> Title
import { ReactComponent as SvgRegister } from '../images/registro.svg'; // SvgLogin -> SvgRegister (registreer plaatje)
import styled from 'styled-components';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Alert from './elements/Alert';

const Svg = styled(SvgRegister)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegisterUsers = () => {

  const navigate = useNavigate(); // navigation after registration
  // State hooks for form values and alert status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  // Update input fields based on name attribute
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'password2':
        setPassword2(e.target.value);
        break;
      default:
        break;
    }
  }

  // Handle user registration
  const registerUser = async (e) => {
    e.preventDefault(); // prevent page reload
    setAlertState(false); // reset alert
    setAlert({}); // clear alert message

    // Regex for email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Regex for password validation (min 8 chars, uppercase, lowercase, number)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check valid email
    if (!emailRegex.test(email)) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'The email is not valid'
      });
      return;
    }

    // Check all fields filled
    if (email === '' || password === '' || password2 === '') {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'All fields are required'
      });
      return;
    }

    // Check password strength
    if (!passwordRegex.test(password)) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'The password is not valid'
      });
      return;
    }

    // Check if passwords match
    if (password !== password2) {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'Passwords do not match'
      });
      return;
    }

    // Try to create user in Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlertState(true);
      setAlert({
        type: 'success',
        message: 'The account was created successfully'
      });
      navigate('/'); // redirect after success

    } catch (error) {
      setAlertState(true);
      console.error("Firebase error:", error);  // log actual error

      // Set appropriate error message for user
      let message;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'The email is already in use';
          break;
        case 'auth/invalid-email':
          message = 'The email is not valid or does not exist.';
          break;
        case 'auth/weak-password':
          message = 'Password too weak';
          break;
        default:
          message = `Unknown error: ${error.message}`;
          break;
      }

      setAlert({
        type: 'error',
        message: message
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Account</title> {/* Page title */}
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Create Account</Title> {/* Header title */}
          <div>
            <Button to="/login">Login</Button> {/* Link to login page */}
          </div>
        </HeaderContainer>
      </Header>

      {/* Registration form */}
      <Form onSubmit={registerUser}>
        <Svg /> {/* Top illustration */}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e)} // update state on input
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => handleChange(e)}
        />
        <ButtonContainer>
          <Button as="button" primary type="submit">Create Account</Button> {/* Submit button */}
        </ButtonContainer>
      </Form>

      {/* Alert component for error/success messages */}
      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        changeAlertState={setAlertState}
      />
    </>
  );
}

export default RegisterUsers;