import React, { useState, useEffect } from "react";
import "./editExpense.css";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import { toast } from "sonner";

const EditExpense = ({ onClose, expenseId }) => {
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(true);
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const user = auth.currentUser;
        const docRef = doc(db, `users/${user.uid}/expenses`, expenseId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDetails(data.details || "");
          setAmount(data.amount || 0);
          setType(data.type || true);
          setCurrency(data.currency || "EUR");
          setDescription(data.description || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
        toast.error("An error occurred while fetching expense details.");
      }
    };

    if (expenseId) {
      fetchExpense();
    }
  }, [expenseId]);

  const handleEditExpense = async () => {
    const user = auth.currentUser;
    try {
      const docRef = doc(db, `users/${user.uid}/expenses`, expenseId);
      await updateDoc(docRef, {
        details,
        type,
        amount,
        currency,
        description,
      });
      toast.success("Expense edited successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred! Please, try again.");
    }
  };

  return (
    <div className="modal-container">
      <div id="modal" className="modal">
        <div className="modal-content">
          <div className="input-group">
            <label htmlFor="details">Details:</label>
            <input
              type="text"
              id="details"
              name="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select
              id="currency"
              name="currency"
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
            >
              <option value="EUR">EUR</option>
              <option value="BGN">BGN</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="input-group">
            <label className="labels" htmlFor="">
              Type:
            </label>
            <div className="expense-or-income">
              <p>Income</p>
              <label className="type-switch">
                <input
                  type="checkbox"
                  checked={type}
                  onChange={(e) => setType(e.target.checked)}
                />
                <span className="type-slider round"></span>
              </label>
              <p>Expense</p>
            </div>
          </div>

          <div className="input-group description-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span>Note: Provide additional details here.</span>
          </div>
          <div className="button-container">
            <button className="edit-button" onClick={handleEditExpense}>Edit</button>
            <button className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
