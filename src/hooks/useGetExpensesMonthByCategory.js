import { useEffect, useState } from 'react'
import useGetMonthExpense from './useGetMonthExpense'

const useGetExpensesMonthByCategory = () => {

  const [expensesByCategory, setExpensesByCategory] = useState([]);
  const { expenses } = useGetMonthExpense();

  useEffect(() => {

    const sumExpenses = expenses.reduce((resultObject, currentObject) => {

      const { category, amount } = currentObject;

      if (!resultObject[category]) {
        resultObject[category] = 0;
      }

      resultObject[category] += amount;
      return resultObject;
    }, {
      'comida': 0,
      'cuentas y pagos': 0,
      'hogar': 0,
      'transporte': 0,
      'ropa': 0,
      'salud e higiene': 0,
      'compras': 0,
      'diversion': 0,
    });

    setExpensesByCategory(Object.keys(sumExpenses).map((element) => {
      return { category: element, amount: sumExpenses[element] }
    }));

  }, [expenses]);

  return expensesByCategory;
}

export default useGetExpensesMonthByCategory;