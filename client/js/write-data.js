
var bookclubURL = 'http://localhost:5000';
const submitButton = document.getElementById("submit");



$('#submit').click(function(){
    var bookTitle = $("#bookTitle").val();
    var author = $("#author").val();
    var genre = $("#genre").val();
    var publisher = $("#publisher").val();
    var yearPublished = $("#yearPublished").val();
    var isbn = $("#isbn").val();

    var jsonString = {bookTitle:bookTitle, author:author, genre:genre, publisher:publisher, yearPublished:yearPublished, isbn:isbn};

    $.ajax({
        url: bookclubURL + "/write-record",
        type: "post",
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);
            if(data.msg === "SUCCESS"){
                alert("Data Saved");
            } else {
                console.log(data.msg);
            }
        },
        error: function(err){
            console.log(err);
        }
    });

    console.log("Book Title: " + bookTitle);
    console.log("Author: " + author);
    console.log("Genre: " + genre);
    console.log("Publisher: " + publisher);
    console.log("Year Published: " + yearPublished);
    console.log("ISBN: " + isbn);
});


$("#clear").click(function(){
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#publisher").val("");
    $("#yearPublished").val("");
    $("#isbn").val("");
});








