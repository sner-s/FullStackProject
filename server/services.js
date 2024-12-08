const { res } = require('express');

const { MongoClient, ObjectID } = require('mongodb');

//Define Database URL
const dbURL = "mongodb://127.0.0.1";

//Define the database server
const client = new MongoClient(dbURL);

var services = function(app){
    app.post('/write-record', async function(req, res){
        var id = "book" + Date.now();

        var bookData = {
            id: id,
            bookTitle:req.body.bookTitle, 
            author:req.body.author, 
            genre:req.body.genre, 
            publisher:req.body.publisher, 
            yearPublished:req.body.yearPublished, 
            isbn:req.body.isbn
        };

        var search = { bookTitle:req.body.bookTitle };

        try {
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");

            const book = await coll.find(search).toArray();
            
            if (book.length > 0){
                await conn.close();
                return res.send(JSON.stringify({ msg:"Book already exists!" }));
            } else {
                await coll.insertOne(bookData);
                await conn.close();
                return res.send(JSON.stringify({ msg:"SUCCESS" }));
            }

        } catch(error){
            await conn.close();
            return res.send(JSON.stringify({ msg:"Error" + error }));
        }

    });


    app.get('/get-records', async function(req, res) {
        try {
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");

            const data = await coll.find().toArray();

            await conn.close();

            return res.send(JSON.stringify({ msg:"SUCCESS", books: data }));

        } catch(error){
            await conn.close();
            return res.send(JSON.stringify({ msg:"Error" + error }));
        }
    });


    app.delete('/delete-record', async function (req, res) {

        const recordID = req.body.id;

        try {
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");

            const result = await coll.deleteOne({ id: recordID });

            await conn.close();

            if (result.deletedCount === 0) {
                return res.send(JSON.stringify({ msg: "Record not found!" }));
            }
            return res.send(JSON.stringify({ msg: "SUCCESS" }));
        } catch (error) {
            console.error("Error deleting record:", error);
            return res.send(JSON.stringify({ msg: "Error: " + error }));
        }
    });
    
};




module.exports = services;