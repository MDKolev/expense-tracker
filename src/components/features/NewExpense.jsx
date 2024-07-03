import React from "react";
import "./newExpense.css";

const NewExpense = () => {
  return (
    <div class="modal-container">
      <div id="modal" class="modal">
        <div class="modal-content">
          <div class="input-group">
            <label for="example1">Details:</label>
            <input type="text" id="example1" name="example1" />
          </div>
          <div class="input-group">
            <label for="example2">Amount:</label>
            <input type="number" id="example2" name="example2" />
          </div>

          <div className="input-group">
            <label className="labels" htmlFor="">
              Type:
            </label>
            <div className="expense-or-income">
              <p>Expense</p>
              <label class="switch1">
                <input type="checkbox" />
                <span class="slider1 round"></span>
              </label>
              <p>Income</p>
            </div>
          </div>

          <div class="input-group description-group">
            <label for="description">Description:</label>
            <textarea id="description" name="description"></textarea>
            <span>Note: Provide additional details here.</span>
          </div>
          <div className="button-container">
            <button className="add-button">Add</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default NewExpense;
