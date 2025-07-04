import React, { createContext, useContext, useEffect, useState } from 'react'
import useGetMonthExpense from '../hooks/useGetMonthExpense';

const TotalExpenseMonthContext = createContext();
const useTotalMonth = () => useContext(TotalExpenseMonthContext);

const TotalExpenseMonthProvider = ({ children }) => {

  const [total, setTotal] = useState(0);
  const { expenses } = useGetMonthExpense();

  useEffect(() => {
    let total = 0;
    expenses.forEach(({ amount }) => {
      total += amount;
    });
    setTotal(total);
  }, [expenses]);

  return (
    <TotalExpenseMonthContext.Provider value={{ total }}>
      {children}
    </TotalExpenseMonthContext.Provider>
  );
}

export { useTotalMonth, TotalExpenseMonthProvider };