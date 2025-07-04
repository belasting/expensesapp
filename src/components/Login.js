import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Button from './elements/Button'; // Button -> Button
import { ButtonContainer, Form, Input } from './elements/ElementsOfForm'; // ContenedorButton -> ButtonContainer, Form -> Form
import { HeaderContainer, Header, Title } from './elements/Header'; // HeaderContainer -> HeaderContainer, Title -> Title
import { ReactComponent as SvgLogin } from '../images/login.svg';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Alert from './elements/Alert';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.25rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});

  // Handle input changes for email and password
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  // Handle form submit and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertState(false);
    setAlert({});

    // Check all fields are filled
    if (email === '' || password === '') {
      setAlertState(true);
      setAlert({
        type: 'error',
        message: 'All fields are required'
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertState(true);
      setAlert({
        type: 'success',
        message: 'Logged in successfully'
      });
      navigate('/'); // redirect after login

    } catch (error) {
      setAlertState(true);

      let message;
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email';
          break;
        case 'auth/invalid-email':
          message = 'The email is invalid or does not exist';
          break;
        case 'auth/wrong-password':
          message = 'Invalid password';
          break;
        default:
          message = 'There was an error logging in';
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
        <title>Login</title>
      </Helmet>

      <Header>
        <HeaderContainer>
          <Title>Login</Title>
          <div>
            <Button to="/register">Register</Button>
          </div>
        </HeaderContainer>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button as="button" primary type="submit">Login</Button>
        </ButtonContainer>
      </Form>

      <Alert
        type={alert.type}
        message={alert.message}
        alertState={alertState}
        changeAlertState={setAlertState}
      />
    </>
  );
}

export default Login;