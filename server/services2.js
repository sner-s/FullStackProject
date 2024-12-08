const { response } = require('express');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + '/files/data.txt');

//Define Database URL
const dbURL = "mongodb://127.0.0.1";

//Define the database server
const client = new MongoClient(dbURL);

var services = function(app){
    app.post('/write-record', function(req, response){
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

        var bookClubData = [];

        if(fs.existsSync(DB_FILE)){
            fs.readFile(DB_FILE, "utf8", function(err, data){
                if(err){
                    response.send(JSON.stringify({msg: err}));
                } else{
                    bookClubData = JSON.parse(data);

                    bookClubData.push(bookData);

                    fs.writeFile(DB_FILE, JSON.stringify(bookClubData), function(err){
                        if(err){
                            response.send(JSON.stringify({msg: err}));
                        } else {
                            response.send(JSON.stringify({msg: "SUCCESS"}));
                        }
                    })
                }
            });
        } else{
            bookClubData.push(bookData);

            console.log(JSON.stringify(bookClubData));
            console.log(DB_FILE);

            fs.writeFile(DB_FILE, JSON.stringify(bookClubData), function(err){
                if(err){
                    response.send(JSON.stringify({msg: err}));
                } else {
                    response.send(JSON.stringify({msg: "SUCCESS"}));
                }
            })
        }

    });


    app.get('/get-records', function(req, response) {
        if (fs.existsSync(DB_FILE)) {
            fs.readFile(DB_FILE, "utf8", function(err, data) {
                if (err) {
                    response.send(JSON.stringify({msg: err}));
                } else {
                    console.log("Data read from file:", data);
                    response.send(JSON.stringify({msg: "SUCCESS", data: JSON.parse(data)}));
                }
            });
        } else {
            response.send(JSON.stringify({msg: "SUCCESS", data: []}));
        }
    });


    app.delete('/delete-record', function (req, response) {

        const recordID = req.body.id;
        console.log("Deleting record with ID:", recordID);
    
        if (fs.existsSync(DB_FILE)) {
            fs.readFile(DB_FILE, "utf8", function (err, data) {
                if (err) {
                    response.send(JSON.stringify({ msg: err }));
                } else {
                    let bookClubData = JSON.parse(data);
                    bookClubData = bookClubData.filter((record) => record.id !== recordID);
    
                    fs.writeFile(DB_FILE, JSON.stringify(bookClubData), function (err) {
                        if (err) {
                            response.send(JSON.stringify({ msg: err }));
                        } else {
                            response.send(JSON.stringify({ msg: "SUCCESS" }));
                        }
                    });
                }
            });
        } else {
            response.send(JSON.stringify({ msg: "No records found!" }));
        }
    });
    
};




module.exports = services;