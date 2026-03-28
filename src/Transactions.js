import React, { useEffect, useState } from "react";

const CATEGORY_BADGE = {
  Food: "badge-food",
  Transport: "badge-transport",
  Entertainment: "badge-entertainment",
  Utilities: "badge-utilities",
};

function getBadgeClass(category) {
  if (!category) return "badge-default";
  const key = Object.keys(CATEGORY_BADGE).find((k) =>
    category.toLowerCase().includes(k.toLowerCase())
  );
  return key ? CATEGORY_BADGE[key] : "badge-default";
}

function Transactions({ refresh }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://bank-statement-categorizer-yk16.onrender.com/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [refresh]);

  const total = transactions.reduce((s, t) => s + (t.amount || 0), 0);
  const debits = transactions.filter((t) => t.amount < 0);
  const totalDebit = debits.reduce((s, t) => s + Math.abs(t.amount || 0), 0);

  const fmt = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(n);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon blue">📊</div>
        <div>
          <div className="card-title">Transactions</div>
          <div className="card-desc">{transactions.length} records</div>
        </div>
      </div>

      {/* Stats */}
      {transactions.length > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value gold">{transactions.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value" style={{ color: "var(--red)", fontSize: 16 }}>
              {fmt(totalDebit)}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Net Balance</div>
            <div
              className={`stat-value`}
              style={{ color: total >= 0 ? "var(--green)" : "var(--red)", fontSize: 16 }}
            >
              {fmt(Math.abs(total))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="loading-dots">
          <span /><span /><span />
        </div>
      ) : transactions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏦</span>
          No transactions yet. Upload a bank statement to get started.
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
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
                  <td className="td-date">{t.transactionDate}</td>
                  <td className="td-desc">{t.description}</td>
                  <td className={`td-amount ${t.amount < 0 ? "amount-debit" : "amount-credit"}`}>
                    {t.amount < 0 ? "−" : "+"} {fmt(Math.abs(t.amount))}
                  </td>
                  <td className="td-category">
                    <span className={`badge ${getBadgeClass(t.category)}`}>
                      {t.category || "Other"}
                    </span>
                  </td>
                  <td className="td-merchant">{t.merchant || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transactions;