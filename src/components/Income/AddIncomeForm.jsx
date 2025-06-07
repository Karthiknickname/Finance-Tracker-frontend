import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerpopup';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  });

  const [amountError, setAmountError] = useState('');

  const handleChange = (key, value) => {
    if (key === 'amount') {
      if (!/^\d*\.?\d*$/.test(value)) {
        setAmountError('Amount must be a number');
      } else {
        setAmountError('');
      }
    }

    setIncome((prevIncome) => ({
      ...prevIncome,
      [key]: value || '',
    }));
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        type="text"
        label="Income Source"
        placeholder="Freelance, Salary, Rent etc..."
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        type="amount" // keep as text for better manual validation
        label="Income Amount"
        placeholder="Enter income amount"
        error={amountError} // show error if you support it in <Input />
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        type="date"
        label="Date"
        placeholder="Enter date"
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={() => onAddIncome(income)}
          className="add-btn add-btn-fill"
          disabled={amountError} // disable if invalid
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
