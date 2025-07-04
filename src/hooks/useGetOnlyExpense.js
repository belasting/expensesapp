import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const useGetOnlyExpense = (id) => {

  const navigate = useNavigate();
  const [expense, setExpense] = useState();

  useEffect(() => {

    const getExpense = async () => {
      try {
        const docRef = doc(db, 'expenses', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setExpense({
            id: docSnap.id,
            ...docSnap.data()
          });
          //console.log('Document data:', docSnap.data());

        } else {
          console.log('No such document!');
          navigate('/expenses-list');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    }

    getExpense();

  }, [id, navigate]);

  return { expense };
}

export default useGetOnlyExpense;