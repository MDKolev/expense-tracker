import React, { useEffect, useState } from "react";
import "./expenses.css";
import { CiFilter, CiStickyNote, CiEdit, CiTrash } from "react-icons/ci";
import NewExpense from "./NewExpense";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import EditExpense from "./EditExpense";
import Pagination from "../features/util/Pagination.jsx";

const Expenses = () => {
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [expensesList, setExpensesList] = useState([]);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expensesList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getExpensesList = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userExpensesCollectionRef = collection(
          db,
          `users/${user.uid}/expenses`
        );

        const expensesQuery = query(
          userExpensesCollectionRef,
          orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(expensesQuery);

        const expenses = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          date: doc.data().date.toDate().toLocaleString(),
        }));

        setExpensesList(expenses);
      } else {
        alert("User is not authenticated.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getExpensesList();
  }, []);

  const handleAddExpense = () => {
    setShowNewExpense((prevShowNewExpense) => !prevShowNewExpense);
  };

  const handleEditExpense = (id) => {
    setCurrentExpenseId(id);
    setShowEditExpense((prevShowEditExpense) => !prevShowEditExpense);
  };

  const handleDelete = async (id) => {
    const user = auth.currentUser;
    try {
      const deleteExpense = doc(db, `users/${user.uid}/expenses`, id);
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
            {currentItems.map((expense) => (
              <tr key={expense.id}>
                <td>
                  <p className="date">{expense?.date}</p>
                  {expense.details}
                </td>
                <td>{expense.type ? "Expense" : "Income"}</td>
                <td>
                  {expense.amount} {expense.currency}
                </td>
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={expensesList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Expenses;
