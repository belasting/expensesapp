import { db } from './firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";

const editExpenditure = async ({ id, description, amount, category, date }) => {
  try {
    const docRef = doc(db, 'expenses', id);
    await updateDoc(docRef, {
      description,
      amount: Number(amount),
      category,
      date
    });
  } catch (error) {
    console.log(error);
  }
}

export default editExpenditure;