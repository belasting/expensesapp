import React from 'react'
import { Header, Title } from '../elements/Header';
import { Helmet } from "react-helmet";
import BtnReturn from '../elements/BtnReturn'
import TotalBarSpent from './TotalBarSpent';
import useGetExpenses from '../../hooks/useGetExpenses';
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorButtones,
  ButtonAccion,
  ButtonCargarMas,
  ContenedorButtonCentral,
  ContenedorSubTitle,
  SubTitle,
} from '../elements/ElementsList';
import IconCategory from '../elements/IconCategory';
import convertToCurrency from '../../helpers/convertToCurrency';
import { ReactComponent as IconEdit } from '../../images/editar.svg';
import { ReactComponent as IconDelete } from '../../images/borrar.svg';
import { Link } from 'react-router-dom';
import Button from '../elements/Button';
import { format, fromUnixTime } from 'date-fns';
import deleteExpenditure from '../../firebase/deleteExpenditure';

const ExpenseList = () => {

  // Custom hook to load expenses and to load more if available
  const [expenses, getMoreExpenses, ThereAreMoreExpensesToLoad] = useGetExpenses();

  // Format date from unix timestamp to dd/MM/yyyy
  const formatDate = ({ date }) => {
    if (date) {
      return format(fromUnixTime(date), 'dd/MM/yyyy');
    } else {
      return '';
    }
  }

  // Checks if current expense date is same as previous (for grouping by date)
  const dateIsSame = (index, expenses, expense) => {
    if (index !== 0) {
      const currentDate = formatDate(expense);
      const previousDate = formatDate(expenses[index - 1]);
      return currentDate === previousDate;
    }
  }

  return (
    <>
      <Helmet>
        <title>Expenses List</title> {/* Page title */}
      </Helmet>

      <Header>
        <BtnReturn /> {/* Back button */}
        <Title>Expenses List</Title> {/* Header title */}
      </Header>

      <Lista>
        {expenses.map((expense, index) => (
          <div key={index}>
            {/* Show date only if different from previous expense date */}
            {!dateIsSame(index, expenses, expense) && <Fecha>{formatDate(expense)}</Fecha>}
            <ElementoLista key={expense.id}>
              <Categoria>
                <IconCategory name={expense.category} /> {/* Category icon */}
                {expense.category}
              </Categoria>

              <Descripcion>
                {expense.description} {/* Expense description */}
              </Descripcion>

              <Valor>
                {convertToCurrency(expense.amount)} {/* Amount formatted */}
              </Valor>

              <ContenedorButtones>
                <ButtonAccion to={`/edit/${expense.id}`} as={Link}>
                  <IconEdit /> {/* Edit icon/link */}
                </ButtonAccion>
                <ButtonAccion onClick={() => deleteExpenditure(expense.id)} as="button">
                  <IconDelete /> {/* Delete button */}
                </ButtonAccion>
              </ContenedorButtones>
            </ElementoLista>
          </div>
        ))}

        {/* Button to load more expenses, if available */}
        {ThereAreMoreExpensesToLoad && (
          <ContenedorButtonCentral>
            <ButtonCargarMas onClick={() => getMoreExpenses()}>
              Load More
            </ButtonCargarMas>
          </ContenedorButtonCentral>
        )}

        {/* Show message with link if no expenses */}
        {expenses.length === 0 && (
          <ContenedorSubTitle>
            <SubTitle>
              You don't have any expenses yet
            </SubTitle>
            <Button to="/add-expense">
              Add Expense
            </Button>
          </ContenedorSubTitle>
        )}
      </Lista>

      <TotalBarSpent /> {/* Total expenses bar */}
    </>
  );
}

export default ExpenseList;
