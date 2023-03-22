const mongoose = require("mongoose")
const Document = require("../models/documentModel")

console.log(Document);

// Get all documents
const getDocuments = async(req, res)=>{
	const documents = await Document.find({}).sort({createdAt: -1})
	res.status(200).json(documents)
	
}

// Get one Document
const getDocument = async (req, res)=>{
	const {id} = req.params
	if(!mongoose.isValidObjectId(id)){
		return res.status(400).json({error:"no such document exists"})
	}

	const document = await Document.findById(id)

	if(!document){
		return res.status(400).json({ error: 'no such document exist' })
	}

	res.status(200).json(document)
}

// Delete one Document 
const deleteDocument = async(req, res)=>{
	const {id} = req.params
	if(!mongoose.isValidObjectId(id)){
		return res.status(400).json({ error: 'no such document exists' });
	}

	const document = await Document.findOneAndDelete(id)

	if(!document){
		return res.status(400).json({ error: 'no such document exists' });
	}

	res.status(200).json(document)

}

// Create a new Document
const createDocument = async(req, res) => {
	const {title, content} = req.body
	try{
		const document = await Document.create({title, content})
		res.status(200).json(document)
	}
	catch(error){
		res.status(400).json({error: error})
	}
}

// Edit a Document
const editDocument = async(req,res)=> {
	const {id} = req.params
	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ error: 'no such document exists' });
	}

	const document = await Document.findOneAndUpdate({_id:id}, {...req.body})
	if (!document) {
		return res.status(400).json({ error: 'no such document exists' });
	}
	res.status(200).json(document)
}



module.exports = {
	getDocument,
	getDocuments,
	deleteDocument,
	createDocument,
	editDocument,
};