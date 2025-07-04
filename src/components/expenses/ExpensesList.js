import React from 'react'
import { Header, Title } from '../elements/Header';
import { Helmet } from "react-helmet";
import BtnReturn from '../elements/BtnReturn'
import ToalBarSpent from './TotalBarSpent';
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

  // Custom hook om uitgaven te laden, en om meer uitgaven te laden als er meer zijn
  const [expenses, getMoreExpenses, ThereAreMoreExpensesToLoad] = useGetExpenses();
  //const { user } = useAuth(); // als je gebruikersdata wil gebruiken

  // Format de datum van een uitgave van unix timestamp naar dd/MM/yyyy
  const formatDate = ({ date }) => {
    if (date) {
      return format(fromUnixTime(date), 'dd/MM/yyyy');
    } else {
      return '';
    }
  }

  // Checkt of de datum van de huidige uitgave gelijk is aan die van de vorige (voor grouping op datum)
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
        <title>Expenses List</title> {/* Pagina titel */}
      </Helmet>

      <Header>
        <BtnReturn /> {/* Terug knop */}
        <Title>Expenses List</Title> {/* Header titel */}
      </Header>

      <Lista>
        {expenses.map((expense, index) => (
          <div key={index}>
            {/* Alleen datum tonen als het anders is dan de vorige uitgave */}
            {!dateIsSame(index, expenses, expense) && <Fecha>{formatDate(expense)}</Fecha>}
            <ElementoLista key={expense.id}>
              <Categoria>
                <IconCategory name={expense.category} /> {/* Categorie icoon */}
                {expense.category}
              </Categoria>

              <Descripcion>
                {expense.description} {/* Beschrijving uitgave */}
              </Descripcion>

              <Valor>
                {convertToCurrency(expense.amount)} {/* Bedrag netjes geformat */}
              </Valor>

              <ContenedorButtones>
                <ButtonAccion to={`/edit/${expense.id}`} as={Link}>
                  <IconEdit /> {/* Edit icoon/link */}
                </ButtonAccion>
                <ButtonAccion onClick={() => deleteExpenditure(expense.id)} as="button">
                  <IconDelete /> {/* Delete knop */}
                </ButtonAccion>
              </ContenedorButtones>
            </ElementoLista>
          </div>
        ))}

        {/* Knop om meer uitgaven te laden, als er nog zijn */}
        {ThereAreMoreExpensesToLoad && (
          <ContenedorButtonCentral>
            <ButtonCargarMas onClick={() => getMoreExpenses()}>
              Load More
            </ButtonCargarMas>
          </ContenedorButtonCentral>
        )}

        {/* Als er geen uitgaven zijn, laat een boodschap zien met link om toe te voegen */}
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

      <ToalBarSpent /> {/* Totaal balk met uitgaven */}
    </>
  );
}

export default ExpenseList;