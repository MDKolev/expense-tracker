import React, { useState } from "react";
import "./newExpense.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase-config/firebase";


const NewExpense = ({onClose}) => {

  const [details, setDetails ] = useState("");
  const [amount, setAmount ] = useState(0);
  const [type, setType ] = useState(true);
  const [description, setDescription ] = useState("");

  const expensesCollectionRef = collection(db, "expenses");

  const handleAddExpense = async () => {
    try {
      await addDoc(expensesCollectionRef, {details,amount,type,description})
      alert("Expense added successfully!")
      onClose();
    } catch(err) {
      console.error(err);
      alert("An error has occured! Please, try again.")
    }
  }


  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="input-group">
            <label htmlFor="details">Details:</label>
            <input type="text" id="details" name="details" onChange={(e) => setDetails(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" name="amount" onChange={(e) => setAmount(Number(e.target.value))}/>
          </div>

          <div className="input-group">
            <label className="labels" htmlFor="">
              Type:
            </label>
            <div className="expense-or-income">
              <p>Income</p>
              <label className="type-switch">
                <input type="checkbox" checked={type} onChange={(e) => setType(e.target.checked)}/>
                <span className="type-slider round"></span>
              </label>
              <p>Expense</p>
            </div>
          </div>

          <div className="input-group description-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            <span>Note: Provide additional details here.</span>
          </div>
          <div className="button-container">
            <button className="add-button" onClick={handleAddExpense}>Add</button>
            <button className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default NewExpense;
