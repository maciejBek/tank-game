import express from 'express';
import config from '../config';
import {MongoClient, ObjectID} from 'mongodb';
import assert from 'assert';

let mdb;

MongoClient.connect(config.mongodbUri, (err,db)=>{

	assert.equal(null,err);
	mdb = db;

});


//set router using express moudle.
const router = express.Router();

router.get('/ranking', (req,res)=>{

	let rankings = {};
	let index =1;
	mdb.collection('ranks').find({})
		.each((err,ranking)=>{
			assert.equal(null,err);
			if(!ranking){
				res.send(rankings);
				return;
			}
			rankings[index++] = ranking;

		});

});


router.post('/ranking', (req,res)=>{

	const score = req.body.newScore;
	const newName = req.body.newName;
	mdb.collection('ranks').insertOne({name: newName, score: score}).then(result=> 
		mdb.collection('ranks').find({}).sort({score:-1}).toArray((err,docs)=>{
			assert.equal(null,err);
			console.log(docs);
			res.send({rankings:docs,
						_id: result.insertedId});

		})
		
	).catch(error=>{
			console.log(error);
			res.status(404).send("bad request");
	});


});








export default router;