var bookclubURL = 'http://localhost:5000';

main();

function main() {
    fetchRecords();
}

function showTable(data){
    console.log("Data received for table:", data);
    var htmlString = "";

    for(var i = 0; i < data.length; i++){
        htmlString += "<tr>";
            htmlString += "<td>" + data[i]._id + "</td>";
            htmlString += "<td>" + data[i].bookTitle + "</td>";
            htmlString += "<td>" + data[i].author + "</td>";
            htmlString += "<td>" + data[i].genre + "</td>";
            htmlString += "<td>" + data[i].publisher + "</td>";
            htmlString += "<td>" + data[i].yearPublished + "</td>";
            htmlString += "<td>" + data[i].isbn + "</td>";
            htmlString += `<td><button class="delete-btn" data-id="${data[i]._id}">Delete</button></td>`;
        htmlString += "</tr>";
    }

    $("#libraryTable").html(htmlString);
    activateDeleteListeners();
}

// Function to submit data to the server
function fetchRecords() {
    $.ajax({
        url: bookclubURL + "/get-records", 
        type: "GET",
        success: function(response) {
            var responseData = JSON.parse(response);
            console.log(responseData.books);
            if (responseData.msg == "SUCCESS") {
                showTable(responseData.books);
            } else {
                console.log(responseData.msg); 
            }
        },
        error: function(response) {
            console.log(response); 
        }
    });
}



function activateDeleteListeners() {
    $(".delete-btn").click(function () {
        var deleteID = this.getAttribute("data-id");
        console.log("Deleting ID:", deleteID);
        deleteRecord(deleteID);
    });
}

function deleteRecord(deleteID) {
    console.log("Deleting ID:", deleteID);
    $.ajax({
        url: bookclubURL + "/delete-record", 
        type: "DELETE",
        data: JSON.stringify({ _id: deleteID }), 
        contentType: "application/json",
        success: function (response) {
            var responseData = JSON.parse(response);
            if (responseData.msg == "SUCCESS") {
                fetchRecords();
            } else {
                console.log(responseData.msg);
            }
        },
        error: function (err) {
            
            console.log(err);
        }
    });
}

/*var data = [
    {
        bookTitle: "Assassins Blade",
        author: "Sarah J Maas",
        genre: "Fantasy",
        publisher: "Bloomsbury",
        yearPublished: "2014",
        isbn: "978-1-63973-1084"
    },
    {
        bookTitle: "Throne of Glass",
        author: "Sarah J Maas",
        genre: "Fantasy",
        publisher: "Bloomsbury",
        yearPublished: "2012",
        isbn: "978-1-63973-0940"
    },
    {
        bookTitle: "Crown of Midnight",
        author: "Sarah J Maas",
        genre: "Fantasy",
        publisher: "Bloomsbury",
        yearPublished: "2013",
        isbn: "978-1-63973-096"
    },
    {
        bookTitle: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        publisher: "Entangled Publishing",
        yearPublished: "2023",
        isbn: "978-1-64937-4042"
    },
    {
        bookTitle: "Iron Flame",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        publisher: "Entangled Publishing",
        yearPublished: "2023",
        isbn: "978-1-64937-4172"
    }
];


jsonObject = data;*/
