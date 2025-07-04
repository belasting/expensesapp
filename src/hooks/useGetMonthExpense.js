import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, orderBy, onSnapshot, where, query } from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "../context/AuthContext";

const useGetMonthExpense = () => {

  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {

    const startMonth = getUnixTime(startOfMonth(new Date()));
    const endMonth = getUnixTime(endOfMonth(new Date()));
    console.log(startMonth, endMonth);

    if (user) {
      const q = query(collection(db, "expenses"),
        where("date", ">=", startMonth),
        where("date", "<=", endMonth),
        where("uidUser", "==", user.uid),
        orderBy("date", "desc"));

      const unsuscribe = onSnapshot(q, (snapshot) => {
        setExpenses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }, (error) => {
        console.log(error);
      });

      return () => unsuscribe();
    }
  }, [user]);

  return { expenses };
}

export default useGetMonthExpense;