import * as fs from 'fs';
import { addExpense } from './addExpense.js';
import { generateReport } from './generateReport.js';

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