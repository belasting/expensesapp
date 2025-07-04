import React from 'react'
import { Header, Title } from '../elements/Header';
import { Helmet } from "react-helmet";
import BtnReturn from '../elements/BtnReturn';
import TotalBarSpent from './TotalBarSpent';
import useGetExpensesMonthByCategory from '../../hooks/useGetExpensesMonthByCategory';
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from '../elements/ElementsList';
import IconCategory from '../elements/IconCategory';
import convertToCurrency from '../../helpers/convertToCurrency';

const ExpenseByCategory = () => {

  // Get this month's expenses by category using custom hook
  const expensesByCategory = useGetExpensesMonthByCategory();

  return (
    <>
      <Helmet>
        <title>Expenses by Category</title> {/* Page title */}
      </Helmet>

      <Header>
        <BtnReturn /> {/* Back button */}
        <Title>Expenses by Category</Title> {/* Header title */}
      </Header>

      <ListaDeCategorias>
        {/* Loop through categories with their expenses */}
        {expensesByCategory.map((expense, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconCategory name={expense.category} /> {/* Category icon */}
                {expense.category} {/* Category name */}
              </Categoria>
              <Valor>{convertToCurrency(expense.amount)}</Valor> {/* Amount formatted */}
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

      <TotalBarSpent /> {/* Total expenses bar */}
    </>
  );
}

export default ExpenseByCategory;
