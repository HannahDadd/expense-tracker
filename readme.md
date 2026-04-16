# Capstone 1 - CLI Expense Tracker

Build a command-line expense tracker that stores transactions in an NDJSON file and prints summary reports to the terminal.

---

## What you're building

A CLI tool you run like this:

```bash
node expenses.js add --amount 42.50 --category groceries --note "Weekly shop"
node expenses.js add --amount 9.99 --category entertainment --note "Streaming subscription"
node expenses.js report
node expenses.js report --category groceries
```

Transactions are appended to a local `expenses.ndjson` file (one JSON object per line). The `report` command reads the file back and prints totals, grouped by category.

---

## Requirements

### Data storage

- Each transaction is a JSON object: `{ id, amount, category, note, date }`.
- `id` is a short random string (e.g. `crypto.randomUUID().slice(0, 8)`).
- `date` is an ISO timestamp added automatically.
- Transactions are appended with `appendFile` - never rewrite the whole file.
- On first run, create the data directory with `mkdir({ recursive: true })`.

### CLI interface

- Parse `process.argv` to extract the sub-command (`add` / `report`) and flags.
- Write a `parseArgs(argv)` function that returns a structured options object. Use default parameters for missing flags.

### Report generation

- Read the NDJSON file, parse each line, and use `.filter()`, `.map()`, and `.reduce()` to compute:
  - Total spend across all categories.
  - Spend per category.
  - Optionally filter to a single category via `--category`.
- Format output with template literals aligned in columns.

### Budget alerts (closures)

- Write a `createBudgetChecker(limits)` factory that takes an object like `{ groceries: 200, entertainment: 50 }`.
- It returns a function `check(category, total)` that closes over the limits and returns a warning string if the total exceeds the budget.
- Call the checker during report generation.

### Error handling

- Wrap file reads in `try`/`catch`. If the expenses file doesn't exist yet, report "No expenses recorded" instead of crashing.
- Validate that `--amount` is a positive number. Return a clear error message for bad input.
- Use `===` for comparisons; be aware of `parseFloat` returning `NaN`.

### Code organisation

- Split into at least three modules: `cli.js` (argument parsing), `store.js` (file I/O), `report.js` (aggregation logic).
- Use a facade `index.js` that wires the modules together.
- Each module exports only what other modules need.

---

## Modules practiced

| Module | How it's used |
|---|---|
| 1 - Modern JS | `const`/`let`, template literals, ESM imports, `process.argv` |
| 2 - Functions | `.filter()`, `.map()`, `.reduce()` for report aggregation |
| 3 - Closures | Budget checker factory closing over limit thresholds |
| 4 - Gotchas | `parseFloat` / `NaN` validation, `===` vs `==`, falsy checks |
| 5 - Objects | Transaction objects, structured options, `Map` for category grouping |
| 6 - Async | `async`/`await` for all file operations, `try`/`catch` |
| 7 - Node tools | `fs/promises`, `path.join`, `__dirname` via `import.meta.url` |
| 8 - Code org | Multi-module structure, facade pattern, explicit exports |

---

## Stretch goals

- Add a `delete --id <id>` command that rewrites the file without the matching line.
- Add a `--since` / `--until` date filter to the report command.
- Write unit tests for `parseArgs` and the budget checker with Vitest.
