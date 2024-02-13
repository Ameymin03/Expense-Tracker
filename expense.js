function handleFormSubmit(event) {
    const expense=document.getElementById('expense-form');
    form.addEventListener("click",function(event){
    event.preventDefault();
  
   
    const amountInput = document.getElementById('amount');
    const expenseInput = document.getElementById('expense');
    const categoryInput = document.getElementById('category');
  
    const amount = Number(amountInput.value);
    const expense = expenseInput.value.trim();
    const category = categoryInput.value;
  
    if (!amount || typeof amount !== 'number') {
      alert('Amount must be a valid number.');
      return;
    }
  
    if (!expense) {
      alert('Please enter a description for the expense.');
      return;
    }
  
    if (!category) {
      alert('Please select a category for the expense.');
      return;
    }
  
   
    const expenseDetails = {
      amount: amount,
      expense: expense,
      category: category
    };
  
   
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    existingExpenses.push(expenseDetails);
    localStorage.setItem('expenses', JSON.stringify(existingExpenses));
  
   
    amountInput.value = '';
    expenseInput.value = '';
    categoryInput.value = '';
  
    
    updateExpenseList(existingExpenses);
  
   
    alert('Expense added successfully!');
  }
  
  function removeExpense(index) {
   
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  
   
    if (confirm('Are you sure you want to delete this expense?')) {
      existingExpenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(existingExpenses));
      updateExpenseList(existingExpenses);
    }
  }
  
  function editExpense(index) {
   
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const expenseToEdit = existingExpenses[index];
  
   
    const amountInput = document.getElementById('amount');
    const expenseInput = document.getElementById('expense');
    const categoryInput = document.getElementById('category');
  
    amountInput.value = expenseToEdit.amount;
    expenseInput.value = expenseToEdit.expense;
    categoryInput.value = expenseToEdit.category;
  
    
    localStorage.setItem('editIndex', index);
  }
  
  function updateExpenseList(expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
  
   
    expenses.forEach((expense, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = `Amount: ${expense.amount}, Description: ${expense.expense}, Category: ${expense.category}`;
  
      const editButton = document.createElement('button');
      editButton.classList.add('btn', 'btn-sm', 'btn-info', 'me-2');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editExpense(index));
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => removeExpense(index));
  
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      expenseList.appendChild(listItem);
    });
  });
  
  
  const form = document.getElementById('expense-form');
  form.addEventListener('submit', handleFormSubmit);
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    updateExpenseList(existingExpenses);
  });
}