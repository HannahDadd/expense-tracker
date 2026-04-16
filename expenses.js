import * as fs from 'fs';

const args = process.argv.slice(2);

// get command and paramters passed from cli args
function parseArgs(argsArray) {
  const result = {
    command: null,
    options: {}
  };

  if (argsArray.length === 0) return result;

  result.command = argsArray[0];

  for (let i = 1; i < argsArray.length; i++) {
    const arg = argsArray[i];

    // paramters are expected in the form --key value
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argsArray[i + 1];

      result.options[key] = value;
      i++; // skip next since it's the value
    }
  }

  return result;
}

const { command, options } = parseArgs(args);

function addExpense({ amount, category, note }) {

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
  let expensesjson = fs.readFileSync("users.json","utf-8");
  let expenses = JSON.parse(expensesjson);
  expenses.push(expense);
  fs.writeFileSync("users.json", JSON.stringify(expenses), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function generateReport({ category }) {
  console.log('Generating report...');

  if (category) {
    console.log(`Filtering by category: ${category}`);
  }

  // TODO: load + aggregate data
}

switch (command) {
  case 'add':
    addExpense(options);
    break;

  case 'report':
    generateReport(options);
    break;

  default:
    console.log(`
Usage:
  node expenses.js add --amount 42.50 --category groceries --note "Weekly shop"
  node expenses.js report [--category groceries]
`);
}