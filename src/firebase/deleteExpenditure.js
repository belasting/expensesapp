import { db } from './firebaseConfig'
import { deleteDoc, doc } from "firebase/firestore";

const deleteExpenditure = async (id) => {
  try {
    const expense = doc(db, "expenses", id);
    await deleteDoc(expense);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

export default deleteExpenditure;