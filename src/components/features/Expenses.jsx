import React, { useEffect, useState } from "react";
import "./expenses.css";
import { CiFilter, CiStickyNote, CiEdit, CiTrash } from "react-icons/ci";
import NewExpense from "./NewExpense";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase";
import EditExpense from "./EditExpense";

const Expenses = () => {
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [expensesList, setExpensesList] = useState([]);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  const expensesCollectionRef = collection(db, "expenses");

  const getExpensesList = async () => {
    try {
      const data = await getDocs(expensesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setExpensesList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getExpensesList();
  });

  const handleAddExpense = () => {
    setShowNewExpense((prevShowNewExpense) => !prevShowNewExpense);
  };

  const handleEditExpense = (id) => {
    setCurrentExpenseId(id);
    setShowEditExpense((prevShowEditExpense) => !prevShowEditExpense);
  };

  const handleDelete = async (id) => {
    try {
      const deleteExpense = doc(db, "expenses", id);
      await deleteDoc(deleteExpense);
      setExpensesList(expensesList.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showNewExpense && (
        <NewExpense onClose={handleAddExpense} onAdd={getExpensesList} />
      )}
      {showEditExpense && (
        <EditExpense
          onClose={handleEditExpense}
          onAdd={getExpensesList}
          expenseId={currentExpenseId}
        />
      )}

      <div className="feature-header">
        <h1>Expenses</h1>
        <button className="add-btn" onClick={handleAddExpense}>
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
                  <CiStickyNote className="note-icon" />
                  <div className="note">{expense.description}</div>
                </td>

                <td className="td-action">
                  <CiEdit
                    className="edit-icon"
                    onClick={() => handleEditExpense(expense.id)}
                  />
                  <CiTrash
                    className="delete-icon"
                    onClick={() => handleDelete(expense.id)}
                  />
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
