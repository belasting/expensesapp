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
        'food': 0,
        'bills and payments': 0,
        'home': 0,
        'transportation': 0,
        'clothing': 0,
        'health and hygiene': 0,
        'shopping': 0,
        'fun': 0,
    });

    setExpensesByCategory(Object.keys(sumExpenses).map((element) => {
      return { category: element, amount: sumExpenses[element] }
    }));

  }, [expenses]);

  return expensesByCategory;
}

export default useGetExpensesMonthByCategory;