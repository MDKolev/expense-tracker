import React, { useEffect, useState } from "react";
import "./expenses.css";
import { CiFilter, CiStickyNote, CiEdit, CiTrash } from "react-icons/ci";
import NewExpense from "./NewExpense";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config/firebase";

const Expenses = () => {
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [expensesList, setExpensesList] = useState([]);

  const expensesCollectionRef = collection(db, "expenses");

  useEffect(() => {
    const getExpensesList = async () => {
      try {
        const data = await getDocs(expensesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setExpensesList(filteredData)
      } catch (err) {
        console.error(err);
      }
    };

    getExpensesList();
  }, []);

  const handleToggleButton = () => {
    setShowNewExpense((prevShowNewExpense) => !prevShowNewExpense);
  };

  return (
    <div>
      {showNewExpense && <NewExpense onClose={handleToggleButton}/>}
      <div className="feature-header">
        <h1>Expenses</h1>
        <button className="add-btn" onClick={handleToggleButton}>
          + New Expense
        </button>
        <button className="filter-btn">
          <CiFilter />
        </button>
      </div>
      <div className="expense-info">
        <table className="table">
          <thead className="thead">
            <tr className="table-row">
              <th>Details</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          
            {expensesList.map((expense) => (
              

              <tr key={expense.id}>
                <td>
                  <p className="date">{expense?.date?.toDate().toString()}</p>
              
                  {expense.details}
                </td>
                <td>{expense.type ? "Expense" : "Income"}</td>
                <td>{expense.amount}</td>
                <td className="td-note">
                <CiStickyNote className="note-icon" /></td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button>1</button>
      </div>
    </div>
  );
};

export default Expenses;
