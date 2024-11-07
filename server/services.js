const { response } = require('express');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname + '/files/data.txt');

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
            //Read in current database
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
    
};

module.exports = services;