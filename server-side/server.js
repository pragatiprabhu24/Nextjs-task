// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Sample user data (for demonstration purposes)
const userData = {
    id: 1,
    name: 'John Doe',
    balance: 50000,
    income: 25000,
    expense: 15000,
    transactions: [
        { id: 1, description: 'Groceries', amount: 50, category: 'Food', date: '2024-01-15' },
        { id: 2, description: 'Gasoline', amount: 40, category: 'Transportation', date: '2024-01-18' },
    ]
};

// Middleware
app.use(bodyParser.json());

// Routes
// Fetching the user's financial overview
app.get('/financial-overview', (req, res) => {
    res.json({
        id: userData.id,
        name: userData.name,
        balance: userData.balance,
        income: userData.income,
        expense: userData.expense
    });
});

// Fetching transaction history
app.get('/transaction-history', (req, res) => {
    res.json(userData.transactions);
});

// Posting a new transaction
app.post('/new-transaction', (req, res) => {
    const { amount, description, category, date } = req.body;
    
    if (!amount || !description) {
        return res.status(400).json({ error: 'Amount and description are required' });
    }
    
    const newTransaction = {
        id: userData.transactions.length + 1,
        amount: parseFloat(amount),
        description: description,
        category: category,
        date: date
    };

    // Update user's balance
    userData.balance += newTransaction.amount;

    // Add transaction to history
    userData.transactions.push(newTransaction);

    res.status(201).json(newTransaction);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
