import React, { useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { API_PATHS } from '../../utils/apiPaths';
import  axiosInstance  from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import toast from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import axios from 'axios';

const Expense = () => {
  useUserAuth();
const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(
    {
      show: false,
      data:null,
    }
  );
const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);
//Get All Expense Data
 const fetchExpenseDetails = async () => {

    if (loading) return;
    setLoading(true);
    try {
      // Simulating an API call to fetch income data
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
        console.log("Expense data fetched successfully:", response.data);
      }
    } catch (error) {
      console.log("Something went wrong while fetching expense data:", error);
    }finally {
      setLoading(false);
    }
   };
  
  const handledAddExpense=async(expense)=>{
     const source = typeof expense.source === 'string' ? income.source.trim() : '';
    const {category,amount,date,icon}=expense;
    if(!category.trim()){
      toast.error("category is required.");
      return; 
    } 

    if(!amount||isNaN(amount)||Number(amount)<=0){
      toast.error("Amount should be a valid number greater than 0.")
      return;
    }

    if(! date){
      toast.error("Date is required.")
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
      category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully!!");
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error adding Expense:",
        error.response?.data?.message|| error.message
      );
    }
  };

  const deleteExpense=async(id)=>{
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!!");
      fetchExpenseDetails();
    }catch(error){
      console.error(
        "Error deleting expense:",
       error.response?.data?.message|| error.message
      );
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const handleDownloadExpenseDetails = async () => {
      try{
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
          {
            responseType: 'blob', // Important for downloading files
          }
        );

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expense_details.xlsx'); // Set the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object
      }catch(error){
        console.error("Error downloading expense details:", error);
        toast.error("Failed to download expense details. Please try again.");
      }

  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
  <DashboardLayout activeMenu="Expense">
  <div className='my-5 mx-auto'>
  <div className='grid grid-cols-1 gap-6'>
  <div className=''>

    <ExpenseOverview
    transactions={expenseData}
    onExpenseIncome={()=> setOpenAddExpenseModal(true)}
    />
  </div>

  <ExpenseList
   transactions={expenseData}
   onDelete={(id) =>{ setOpenDeleteAlert({ show: true, data: id });
  }
}
onDownload={handleDownloadExpenseDetails}
  />
</div>


<Modal 
isOpen={openAddExpenseModal}
onClose={() => setOpenAddExpenseModal(false)}
title="Add Expense">

  <AddExpenseForm
    onAddExpense={handledAddExpense} />
</Modal>


<Modal isOpen={openDeleteAlert.show}
 onClose={() => setOpenDeleteAlert({ show: false, data: null })}  
title="Delete Expense">

  <DeleteAlert 
  content="Are you sure you want to delete this expense transaction?"
  onDelete={() => deleteExpense(openDeleteAlert.data)}
  />
  </Modal>
</div>
</DashboardLayout>


  )
}

export default Expense