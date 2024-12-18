const {res}  = require('express');

const { MongoClient, ObjectId } = require('mongodb');

//Define Database URL
const dbURL = "mongodb://127.0.0.1";

//Define the database server
const client = new MongoClient(dbURL);

var services = function(app){
    app.post('/write-record', async function(req, res){
        var ID = "book" + Date.now();

        var bookData = {
            title:req.body.title, 
            author:req.body.author, 
            genre:req.body.genre, 
            publisher:req.body.publisher, 
            yearPublished:req.body.yearPublished, 
            isbn:req.body.isbn
        };

        var search = { title:req.body.title };

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

    app.get("/get-booksByAuthor", async function(req, res) {
        var search = (req.query.author === "") ? { } : {author: req.query.author};

        try{
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");

            const data = await coll.find(search).toArray();

            await conn.close();

            return res.send(JSON.stringify({ msg:"SUCCESS", books: data }));

        } catch (error){
            //await conn.close();
            return res.send(JSON.stringify({ msg:"Error" + error }));
        }
    });

    app.put('/update-record', async function(req, res) {
        var updateData = {
            $set: {
                title:req.body.title, 
                author:req.body.author, 
                genre:req.body.genre, 
                publisher:req.body.publisher, 
                yearPublished:req.body.yearPublished, 
                isbn:req.body.isbn
            }

         };
        
    
        try {
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");

            const search = { _id: ObjectId.createFromHexString(req.body.ID) };
    
            await coll.updateOne(search, updateData);

            await conn.close();
    
            return res.send(JSON.stringify({ msg: "SUCCESS" }));

        } catch (error) {
            console.error(error);
            return res.send(JSON.stringify({ msg: "Error: " + error }));
        }
    });

    app.delete('/delete-record', async function(req, res) {
        
        try{
            const conn = await client.connect();
            const db = conn.db("bookClub");
            const coll = db.collection("books");
            
            const search = { _id: ObjectId.createFromHexString(req.query.bookID) };
            console.log(search);

            await coll.deleteOne(search);

            await conn.close();

            return res.send(JSON.stringify({msg: "SUCCESS" }));

        } catch(error){
            
            console.log(error);
            return res.send(JSON.stringify({ msg:"Error" + error }));
        }

    });

};

module.exports = services;

