const express = require('express')
const router = express.Router()
const {
	getDocuments,
	getDocument,
	deleteDocument,
	createDocument,
	editDocument
} = require("../controllers/documentController")

// Routes
router.get('/', getDocuments)

router.get("/:id", getDocument)

router.delete("/:id", deleteDocument)

router.post("/", createDocument)

router.patch("/:id", editDocument)

module.exports = router