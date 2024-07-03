import React, { useState } from "react";
import "./expenses.css";
import { CiFilter, CiStickyNote, CiEdit, CiTrash } from "react-icons/ci";
import NewExpense from "./NewExpense";

const Expenses = () => {

  const [showNewExpense, setShowNewExpense] = useState(false);

  const handleToggleButton = () => {
    setShowNewExpense(prevShowNewExpense=> !prevShowNewExpense)
  }

  return (
    <div>
      {showNewExpense &&  <NewExpense/>}
      <div className="feature-header">
        <h1>Expenses</h1>
        <button className="add-btn" onClick={handleToggleButton}>+ New Expense</button>
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
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />{" "}
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 3, Column 1</td>
              <td>Row 3, Column 2</td>
              <td>Row 3, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 4, Column 1</td>
              <td>Row 4, Column 2</td>
              <td>Row 4, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />{" "}
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 5, Column 1</td>
              <td>Row 5, Column 2</td>
              <td>Row 5, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />{" "}
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 6, Column 1</td>
              <td>Row 6, Column 2</td>
              <td>Row 6, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 7, Column 1</td>
              <td>Row 7, Column 2</td>
              <td>Row 7, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
            </tr>
            <tr>
              <td>Row 8, Column 1</td>
              <td>Row 8, Column 2</td>
              <td>Row 8, Column 3</td>
              <td className="td-note">
                <CiStickyNote className="note-icon" />
              </td>
              <td className="td-action">
                <CiEdit className="edit-icon" />
                <CiTrash className="delete-icon" />
              </td>
            </tr>
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
