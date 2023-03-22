const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const documentRouter = require('./routes/documents')
const cors = require('cors');
const PORT = process.env.PORT

const api = express()

// Parse incoming JSON data and implement route handler
api.use(
	cors({
		origin: 'https://markdown-api.onrender.com/',
		methods: ['GET', 'POST', 'DELETE', 'PATCH'],
	}),
);
api.use(express.json())
api.use(documentRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		api.listen(PORT, () => {
			console.log('Connection Online / Reloaded');
		});
	})
	.catch((error) => {
		console.log(error);
	});

