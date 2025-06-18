import React from 'react';
import './Pages css/PrintBill.css';

const PrintBill = () => {
  const billData = {
    customer: 'Mahesh Industries',
    address: 'Rajkot, Gujarat',
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Curtain Roller Chain - Silver', qty: 10, rate: 35 },
      { name: 'Curtain Roller Chain - Gold', qty: 5, rate: 38.5 },
    ],
  };

  const total = billData.items.reduce((acc, item) => acc + item.qty * item.rate, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-bill-container">
      <div className="bill-header">
        <h1>ANB Industries</h1>
        <p>SURVEY NO 252, CAPTAIN GATE, SHAPAR-VERAVAL, RAJKOT</p>
        <p>Date: {billData.date}</p>
      </div>

      <div className="bill-customer">
        <p><strong>Customer:</strong> {billData.customer}</p>
        <p><strong>Address:</strong> {billData.address}</p>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {billData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{(item.qty * item.rate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-total">
        <h3>Grand Total: ₹{total.toFixed(2)}</h3>
      </div>

      <button className="print-btn" onClick={handlePrint}>Print Bill</button>
    </div>
  );
};

export default PrintBill;
