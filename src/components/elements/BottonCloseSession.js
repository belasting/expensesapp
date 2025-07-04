import React from 'react'
import { ReactComponent as IconCloseSession } from '../../images/log-out.svg';
import Button from './Button';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ButtonCloseSession = () => {

  const navigate = useNavigate();

  const closeSession = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button as="button" bgColor="#DA552F" onClick={closeSession}>
      <IconCloseSession />
    </Button>
  );
}

export default ButtonCloseSession;