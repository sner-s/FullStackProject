var data = [
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


jsonObject = data;

main();

function main() {
    console.log(jsonObject);
    console.log(jsonObject.length);

    showTable();

}

function showTable(){
    var htmlString = "";

    for(var i = 0; i < jsonObject.length; i++){
        htmlString += "<tr>";
            htmlString += "<td>" + jsonObject[i].bookTitle + "</td>";
            htmlString += "<td>" + jsonObject[i].author + "</td>";
            htmlString += "<td>" + jsonObject[i].genre + "</td>";
            htmlString += "<td>" + jsonObject[i].publisher + "</td>";
            htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
            htmlString += "<td>" + jsonObject[i].isbn + "</td>";
        htmlString += "</tr>";
    }

    $("#libraryTable").html(htmlString);
}
