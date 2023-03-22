const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const documentRouter = require('./routes/documents');
const PORT = process.env.PORT;

const api = express();

// Parse incoming JSON data and implement route handler
api.use(express.json());

// Set CORS headers
api.use((req, res, next) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://markdown-api.onrender.com/',
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

api.use(documentRouter);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		api.listen(PORT, () => {
			console.log('Connection Online / Reloaded');
		});
	})
	.catch((error) => {
		console.log(error);
	});
