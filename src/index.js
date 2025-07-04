import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Container from './components/elements/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/RegisterUsers';
import EditExpenses from './components/expenses/EditExpenses';
import Expenditure from './components/expenses/Expenditure';
import ExpenseByCategory from './components/expenses/ExpensesByCategory';
import ExpenseList from './components/expenses/ExpensesList';
import { Helmet } from "react-helmet";
import logo from './images/logo.png';
import Background from './components/elements/Background';
import { AuthProvider } from './context/AuthContext';
import RoutePrivate from './components/RoutePrivate';
import { TotalExpenseMonthProvider } from './context/TotalExpenseMonthContext';

WebFont.load({
  google: {
    families: ['Work Sans:300,400,500,600,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        {/*         <title>Expense Tracker</title> */}
        <link rel="icon" href={logo} />
      </Helmet>

      <AuthProvider>
        <TotalExpenseMonthProvider>
          <BrowserRouter>
            <Container>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/edit/:id" element={<RoutePrivate><EditExpenses /></RoutePrivate>} />
                <Route path="/expenditure" element={<RoutePrivate><Expenditure /></RoutePrivate>} />
                <Route path="/categories" element={<RoutePrivate><ExpenseByCategory /></RoutePrivate>} />
                <Route path="/expenses-list" element={<RoutePrivate><ExpenseList /></RoutePrivate>} />
                <Route path="/" element={<RoutePrivate><App /></RoutePrivate>} />
              </Routes>
            </Container>
          </BrowserRouter>
        </TotalExpenseMonthProvider>
      </AuthProvider>

      <Background />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Index />);