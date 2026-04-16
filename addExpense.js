import * as fs from 'fs';

export function addExpense({ amount, category, note }) {

  // create expense
  const expense = {
    id: crypto.randomUUID().slice(0, 8),
    amount: parseFloat(amount ?? 0),
    category: category ?? "uncategorized",
    note: note ?? "UNKNOWN",
    date: new Date().toISOString()
  };

  // append expense to file
  console.log('Adding expense:', expense);
  let expensesjson = fs.readFileSync("expenses.json","utf-8");
  let expenses = JSON.parse(expensesjson);
  
  if (Object.keys(expenses).length === 0) {
    expenses = [];
  }

  expenses.push(expense);
  fs.writeFile("expenses.json", JSON.stringify(expenses), function (err) {
    if (err) console.log('Error adding expense:', expense);
    console.log('Saved!');
  });
}