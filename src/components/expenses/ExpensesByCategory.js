import React from 'react'
import { Header, Title } from '../elements/Header';
import { Helmet } from "react-helmet";
import BtnReturn from '../elements/BtnReturn';
import ToalBarSpent from './TotalBarSpent';
import useGetExpensesMonthByCategory from '../../hooks/useGetExpensesMonthByCategory';
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from '../elements/ElementsList';
import IconCategory from '../elements/IconCategory';
import convertToCurrency from '../../helpers/convertToCurrency';

const ExpenseByCategory = () => {

  // Haal de uitgaven per categorie van deze maand op via custom hook
  const expensesByCategory = useGetExpensesMonthByCategory();

  return (
    <>
      <Helmet>
        <title>Expenses by Category</title> {/* Zet de pagina titel */}
      </Helmet>

      <Header>
        <BtnReturn /> {/* Terugknop */}
        <Title>Expenses by Category</Title> {/* Header titel */}
      </Header>

      <ListaDeCategorias>
        {/* Loop door de categorieën met hun uitgaven */}
        {expensesByCategory.map((expense, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconCategory name={expense.category} /> {/* Categorie icoon */}
                {expense.category} {/* Categorie naam */}
              </Categoria>
              <Valor>{convertToCurrency(expense.amount)}</Valor> {/* Bedrag netjes geformat */}
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

      <ToalBarSpent /> {/* Totaalbalk met uitgaven */}
    </>
  );
}

export default ExpenseByCategory;
