
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
            if(data.msg = "SUCCESS"){
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

    alert("Submit button was pressed" + "\n" + bookTitle + "\n" + author + "\n" + genre + "\n" + publisher + "\n" + yearPublished + "\n" + isbn);
});


$("#clear").click(function(){
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#publisher").val("");
    $("#yearPublished").val("");
    $("#isbn").val("");
});




/*submitButton.addEventListener("click", function() {
    const bookTitleBox = document.getElementById("bookTitle");
    const authorBox = document.getElementById("author");
    const genreBox = document.getElementById("genre");
    const publisherBox = document.getElementById("publisher");
    const yearPublishedBpx = document.getElementById("yearPublished");
    const isbnBox = document.getElementById("isbn");

    var first = bookTitleBox.value;
    var second = authorBox.value;
    var third = genreBox.value;
    var fourth = publisherBox.value;
    var fifth = yearPublishedBpx.value;
    var sixth = isbnBox.value;

    

    console.log("Book Title: " + first);
    console.log("Author: " + second);
    console.log("Genre: " + third);
    console.log("Publisher: " + fourth);
    console.log("Year Published: " + fifth);
    console.log("ISBN: " + sixth);


    alert("Submit button was pressed" + "\n" + first + "\n" + second + "\n" + third + "\n" + fourth + "\n" + fifth + "\n" + sixth);

    //To stop the natural HTML flow
    return false;
});*/