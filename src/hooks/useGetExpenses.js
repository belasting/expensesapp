import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';
import { collection, where, onSnapshot, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const useGetExpenses = () => {

  const [getExpenses, setExpenses] = useState([1, 2, 3]);
  const { user } = useAuth();
  const [lastExpense, setLastExpense] = useState(null);
  const [ThereAreMoreExpensesToLoad, setThereAreMoreExpensesToLoad] = useState(false);

  const getMoreExpenses = () => {
    console.log('getMoreExpenses');
    const q = query(collection(db, 'expenses'), where('uidUser', '==', user.uid), orderBy('date', 'desc'), limit(10), startAfter(lastExpense));

    onSnapshot(q, (querySnapshot) => {
      const docs = [];

      if (querySnapshot.docs.length > 0) {
        setLastExpense(querySnapshot.docs[querySnapshot.docs.length - 1]);

        querySnapshot.forEach(doc => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setExpenses([...getExpenses, ...docs]);

      } else {
        setThereAreMoreExpensesToLoad(false);
      }
    });
  }

  useEffect(() => {

    const q = query(collection(db, 'expenses'), where('uidUser', '==', user.uid), orderBy('date', 'desc'), limit(10));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];

      if (querySnapshot.docs.length > 0) {
        setLastExpense(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setThereAreMoreExpensesToLoad(true);
      } else {
        setThereAreMoreExpensesToLoad(false);
      }

      querySnapshot.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(docs);
    });
    return unsuscribe;
  }, [user]);

  return [getExpenses, getMoreExpenses, ThereAreMoreExpensesToLoad];
}

export default useGetExpenses;