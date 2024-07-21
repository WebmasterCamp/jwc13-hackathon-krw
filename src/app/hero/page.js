"use client";

import { useState, useEffect } from "react";
import creditcard from "@/app/hero/Creditcard1.png";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import Image from "next/image";

const recommendCard = (amount, creditCards) => {
  const suitableCards = creditCards.filter(
    (card) => card.creditLimit >= amount
  );

  if (suitableCards.length === 0) {
    return "No card has enough credit limit to make this purchase.";
  }

  const recommendedCard = suitableCards.reduce((bestCard, currentCard) => {
    const getDateNumber = (cycle) => parseInt(cycle.split(" ")[0], 10);
    const today = new Date().getDate();

    const bestCardBillingCycle = getDateNumber(bestCard.billingCycle);
    const currentCardBillingCycle = getDateNumber(currentCard.billingCycle);

    const bestCardDaysLeft = (bestCardBillingCycle - today + 30) % 30;
    const currentCardDaysLeft = (currentCardBillingCycle - today + 30) % 30;

    return currentCardDaysLeft < bestCardDaysLeft ? currentCard : bestCard;
  });

  return `You should use ${recommendedCard.cardName} for this purchase.`;
};

const App = () => {
  const [salary, setSalary] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [availableMoney, setAvailableMoney] = useState(0);
  const [percentage, setPercentage] = useState(20);
  const [maxDebt, setMaxDebt] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setAvailableMoney(salary - totalExpenses);
  }, [salary, expenses]);

  useEffect(() => {
    setMaxDebt((salary * percentage) / 100);
  }, [salary, percentage]);

  const handleRecommendation = () => {
    const recommendation = recommendCard(purchaseAmount, creditCardData);
    setRecommendation(recommendation);
  };

  const handleAddExpense = () => {
    if (expenseDescription && expenseAmount > 0) {
      setExpenses([
        ...expenses,
        { description: expenseDescription, amount: Number(expenseAmount) },
      ]);
      setExpenseDescription("");
      setExpenseAmount(0);
    }
  };

  const handleRemoveExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const calculateBestCard = () => {
    const purchase = new Date(purchaseDate);
    const dayOfPurchase = purchase.getDate();

    const closingDay1 = 25; 
    const closingDay2 = 20; 

    let daysUntilClosing1 = closingDay1 - dayOfPurchase;
    let daysUntilClosing2 = closingDay2 - dayOfPurchase;


    if (daysUntilClosing1 < 0) {
      daysUntilClosing1 += new Date(
        purchase.getFullYear(),
        purchase.getMonth() + 1,
        0
      ).getDate(); 
    }

    if (daysUntilClosing2 < 0) {
      daysUntilClosing2 += new Date(
        purchase.getFullYear(),
        purchase.getMonth() + 1,
        0
      ).getDate(); 
    }

    if (daysUntilClosing1 < daysUntilClosing2) {
      setRecommendation(
        "You should use the card with a closing date on the 25th."
      );
    } else {
      setRecommendation(
        "You should use the card with a closing date on the 20th."
      );
    }
  };

  return (
    <div>
      <nav class="bg-teal-500 shadow-md p-8 flex justify-between items-center">
        <div class="text-4xl text-white font-bold">Credit Buddy</div>
        <ul class="flex space-x-6">
          <li class="nav-item">
            <a href="/" class="text-white text-lg">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="/calculate" class="text-white text-lg">
              Calculate
            </a>
          </li>
          <li class="nav-item">
            <a href="/about" class="text-white text-lg">
              About us
            </a>
          </li>
          <li class="nav-item">
            <a href="/policy" class="text-white text-lg">
              Policy
            </a>
          </li>
        </ul>
        <div class="text-white text-lg">Login</div>
      </nav>
      <div className="bg-[#575757] text-white">
        <div className="flex gap-[8px] p-5">
          <Image
            src="/app/hero/Creditcard1.png"
            width={200}
            height={200}
            alt="Credit Card"
          />
          <Image
            src="/hero/Creditcard1.png"
            width={200}
            height={200}
            alt="Credit Card"
          />
        </div>
        <div class="border-t-4 border-yellow-500 p-4 w-4/5 mx-auto flex justify-center items-center">
          {" "}
        </div>
        <div className="bg-[#575757] p-6 rounded-lg shadow-lg w-4/5 mx-auto mt-10 text-white">
        <Typography variant="h5" gutterBottom className="mt-10 mb-4 text-xl">
            User info
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="เงินเดือน"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              fullWidth
              margin="normal"
              className="bg-white rounded-lg "
            />
            <TextField
              label="Percentage for Max Debt"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              fullWidth
              margin="normal"
              className="bg-white rounded-lg"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRecommendation}
              className="mt-6"
            >
              Get Recommendation
            </Button>
          </Box>

          <Typography variant="h5" gutterBottom className="mt-10 mb-4 text-xl">
            Expenses
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Expense Description"
              type="text"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
              fullWidth
              margin="normal"
              className="bg-white rounded-lg"
            />
            <TextField
              label="Expense Amount"
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(Number(e.target.value))}
              fullWidth
              margin="normal"
              className="bg-white rounded-lg"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddExpense}
              className="mt-6"
            >
              Add Expense
            </Button>
          </Box>
          <List className="mt-6">
            {expenses.map((expense, index) => (
              <ListItem
                key={index}
                className="flex justify-between bg-gray-800 rounded-lg p-4 mb-2"
              >
                <ListItemText
                  primary={`${expense.description}: ${expense.amount}`}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveExpense(index)}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" gutterBottom className="mt-10 mb-2 text-xl">
            Available Money
          </Typography>
          <Typography className="mb-6">{availableMoney}</Typography>

          <Typography variant="h5" gutterBottom className="mb-2 text-xl">
            Max Debt ({percentage}% of Salary)
          </Typography>
          <Typography className="mb-6">{maxDebt}</Typography>

          <Typography variant="h5" gutterBottom className="mb-2 text-xl">
            Purchase Recommendation
          </Typography>
          <Typography className="mb-6">{recommendation}</Typography>

          <Typography variant="h5" gutterBottom className="mt-10 mb-4 text-xl">
            Card Recommendation by Date
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Purchase Date"
              type="text"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              fullWidth
              margin="normal"
              className="bg-white rounded-lg"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={calculateBestCard}
              className="mt-6"
            >
              Calculate Best Card
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default App;
