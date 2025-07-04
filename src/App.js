import React from 'react'
import { Helmet } from "react-helmet";
import { Header, Title, HeaderContainer, ButtonsContainer } from './components/elements/Header';
import Button from './components/elements/Button';
import ButtonCloseSession from './components/elements/BottonCloseSession';
import FormExpenditure from './components/expenses/FormExpenditure';
import ToalBarSpent from './components/expenses/TotalBarSpent';
import firebaseApp from './firebase/firebaseConfig';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Add Expenditure</title>
      </Helmet>

<Header>
  <HeaderContainer>
    <Title>Add Expenditure</Title>
    <ButtonsContainer>
      <Button to="/categories">Categories</Button>
      <Button to="/expenses-list">Expenses List</Button>
      <ButtonCloseSession />
    </ButtonsContainer>
  </HeaderContainer>
</Header>

      <FormExpenditure />
      <ToalBarSpent />
    </>
  );
}

export default App;