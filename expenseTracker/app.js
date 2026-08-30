

const fs = require("fs");
const readline = require("readline");

const file = "expenses.json";


if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]");
}

function getExpenses() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}


function saveExpenses(expenses) {
  fs.writeFileSync(file, JSON.stringify(expenses, null, 2));
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}


async function addExpense() {
  const description = await ask("Description: ");
  const amount = Number(await ask("Amount: "));

  if (!description) {
    console.log("Description is required.");
    return;
  }

  if (amount <= 0 || isNaN(amount)) {
    console.log("Amount must be greater than 0.");
    return;
  }

  const expenses = getExpenses();

  const expense = {
    id: expenses.length + 1,
    date: new Date().toISOString().split("T")[0],
    description: description,
    amount: amount
  };

  expenses.push(expense);

  saveExpenses(expenses);

  console.log(`Expense added successfully (ID: ${expense.id})`);
}


function listExpenses() {
  const expenses = getExpenses();

  if (expenses.length === 0) {
    console.log("No expenses found.");
    return;
  }

  console.log("\nID   Date         Description   Amount");

  expenses.forEach((expense) => {
    console.log(
      `${expense.id}    ${expense.date}   ${expense.description}   $${expense.amount}`
    );
  });
}


function summary() {
  const expenses = getExpenses();

  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;
  });

  console.log(`Total expenses: $${total}`);
}


async function deleteExpense() {
  const id = Number(await ask("Enter expense ID: "));

  const expenses = getExpenses();

  const newExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  if (expenses.length === newExpenses.length) {
    console.log("Expense not found.");
    return;
  }

  saveExpenses(newExpenses);

  console.log("Expense deleted successfully.");
}


async function updateExpense() {
  const id = Number(await ask("Enter expense ID: "));

  const expenses = getExpenses();

  const expense = expenses.find(
    (expense) => expense.id === id
  );

  if (!expense) {
    console.log("Expense not found.");
    return;
  }

  const description = await ask("New description: ");
  const amount = Number(await ask("New amount: "));

  if (description) {
    expense.description = description;
  }

  if (amount > 0) {
    expense.amount = amount;
  }

  saveExpenses(expenses);

  console.log("Expense updated successfully.");
}


async function start() {
  console.log("\nExpense Tracker");
  console.log("commands: \n 1. add \n 2.list \n 3.update \n 4.delete \n 5.summary \n 6.exit");

  while (true) {
    const command = await ask("\n> ");

    if (command === "add") {
      await addExpense();
    } 
    else if (command === "list") {
      listExpenses();
    } 
    else if (command === "summary") {
      summary();
    } 
    else if (command === "delete") {
      await deleteExpense();
    } 
    else if (command === "update") {
      await updateExpense();
    } 
    else if (command === "exit") {
      console.log("Goodbye!");
      rl.close();
      break;
    } 
    else {
      console.log("Unknown command.");
      console.log("commands: \n 1. add \n 2.list \n 3.update \n 4.delete \n 5.summary \n 6.exit");
    }
  }
}

start();