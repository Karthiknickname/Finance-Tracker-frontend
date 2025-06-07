import React from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerpopup';

import { useState } from 'react';
import toast from 'react-hot-toast';
const AddExpenseForm = ({onAddExpense}) => {
const [income, setIncome] = useState({

    category: '',
    amount: '',
    date: '',
    icon: '',
});
const handleChange=(key, value)=>setIncome({...income, [key]: value});
  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(icon) => handleChange('icon', icon)}
        />

            <Input
            label="Category"
            type="text"
            placeholder="Enter category"
            value={income.category}
            onChange={(e) => handleChange('category', e.target.value)}  
            />

            <Input
            label="Amount"
            type="number"
            placeholder="Enter amount"
            value={income.amount}
            onChange={(e) => handleChange('amount', e.target.value)}  
            />

            <Input
            label="Date"
            type="date"
            placeholder=""
            value={income.date}
            onChange={(e) => handleChange('date', e.target.value)}  
            />

        <div className='flex justify-end mt-6'>
                <button
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(income)}
                    type='button'
                    >  Add Expense </button>
            </div>
    </div>
  )
}

export default AddExpenseForm