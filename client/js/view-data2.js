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