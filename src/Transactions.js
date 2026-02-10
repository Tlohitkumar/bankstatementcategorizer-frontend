import React, { useEffect, useState } from "react";

function Transactions({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = () => {
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => alert("Failed to load transactions"));
  };

  useEffect(() => {
    loadTransactions();
  }, [refresh]);

  return (
    <div>
      <h3>Transactions</h3>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Merchant</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.transactionDate}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.merchant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
