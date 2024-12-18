var bookclubURL = 'http://localhost:5000';

var app = angular.module("bookclubApp", []);

app.controller("viewCtrl", function($scope, $http){
    $scope.books = [];

    // Fetch all book records
    $scope.get_records = function(){
        $http({
            method: 'get',
            url: bookclubURL + "/get-records" 
        }).then(function (response){
            if(response.data.msg === "SUCCESS"){
                $scope.books = response.data.books;
                $scope.authors = getAuthors(response.data.books);
                console.log($scope.authors);  
                $scope.selectedAuthor = $scope.authors[0];
            } else{
                console.log(response.data.msg);
            }
        }, function(error){
            console.log(error);
        });
    };

    // Fetch books by selected author
    $scope.redrawTable = function(){
        var author = $scope.selectedAuthor.value;

        $http({
            method: 'get',
            url: "/get-booksByAuthor", 
            params: {author: author}
        }).then(function (response){
            if(response.data.msg === "SUCCESS"){
                $scope.books = response.data.books;
            } else{
                console.log(response.data.msg);
            }
        }, function(error){
            console.log(error);
        });
    };

    
    $scope.editBook = function(bookIndex){
        $scope.title = $scope.books[bookIndex].title;
        $scope.author = $scope.books[bookIndex].author;
        $scope.genre = $scope.books[bookIndex].genre;
        $scope.publisher = $scope.books[bookIndex].publisher;
        $scope.yearPublished = $scope.books[bookIndex].yearPublished;
        $scope.isbn = $scope.books[bookIndex].isbn;
        $scope.bookID = $scope.books[bookIndex]['_id'];

        $scope.hideTable = true;
        $scope.hideForm = false;
    };

    // Cancel update and show the table again
    $scope.cancelUpdate = function(){
        $scope.hideTable = false;
        $scope.hideForm = true;
    };

    // Update the book information
    $scope.updateBook = function(){
        console.log(req.body);
        if($scope.title === "" || $scope.author === "" || $scope.genre === "" || $scope.publisher === "" || $scope.yearPublished === "" || $scope.isbn === ""){
            $scope.addResults = "Title, author, genre, publisher, year published, and isbn are required";
            return;
        }

        $http({
            method: 'put',
            url: bookclubURL + "/update-record",
            data: {
                ID: $scope.bookID,
                title: $scope.title,
                author: $scope.author,
                genre: $scope.genre,
                publisher: $scope.publisher,
                yearPublished: $scope.yearPublished,
                isbn: $scope.isbn
            }
        }).then(function (response){
            if(response.data.msg === "SUCCESS"){
                $scope.cancelUpdate();
                $scope.redrawTable();
                console.log(response.data.msg);
                $scope.title = "";
                $scope.author = "";
                $scope.genre = "";
                $scope.publisher = "";
                $scope.yearPublished = "";
                $scope.isbn = "";
            } else{
                $scope.addResults = response.data.msg;
            }
        }, function(error){
            console.log(error);
        });
    };

    // Delete a book
    $scope.deleteBook = function(id){
        console.log(id);

        $http({
            method: 'delete',
            url: "/delete-record",
            params: {bookID: id}
        }).then(function (response){
            if(response.data.msg === "SUCCESS"){
                $scope.redrawTable();
            } else{
                console.log(response.data.msg);
            }
        }, function(error){
            console.log(error);
        });
    };

    // Initial call to populate books
    $scope.get_records();

});


function getAuthors(bookTableData){
    var authorExists;

    var authorArray = [{value: "", display: "ALL"}];

    for (i = 0; i < bookTableData.length; i++) {
        authorExists = authorArray.find(function(element){
            return element.value === bookTableData[i].author;
        });

        if (authorExists){
            continue;
        } else {
            authorArray.push({value: bookTableData[i].author, display: bookTableData[i].author});
        }
    }

    return authorArray;
}
