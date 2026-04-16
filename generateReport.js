import * as fs from 'fs';

export function generateReport({ category }) {
  console.log('Generating report...');

  fs.readFile("expenses.json", "utf-8", function (err, data) {
    if (err) console.log('Error generating report:', err);

    const expenses = JSON.parse(data);

    if (category) {
      console.log(`Filtering by category: ${category}`);
      const filtered = expenses.filter(e => e.category === category);
      console.table(filtered);
    } else {
      console.table(expenses);
    }
  });
}