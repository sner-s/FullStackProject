var bookclubURL = 'http://localhost:5000';

var books = [];
var activeBook = 0;

var app = angular.module('browseDataApp', []);

app.controller('browseDataCtrl', function($scope, $http){

    $scope.get_records = function(){
        $http({
            //Send request to the server
            method: 'get',
            url: bookclubURL + "/get-records"
        }).then(function (response){
            //Successfully connected to the server
            if(response.data.msg === "SUCCESS"){
                books = response.data.data;
                console.log(books);
                $scope.obj = books[activeBook];
                $scope.showHide();
            } else{
                console.log(response.data.msg);
            }
        }), function(error){
            console.log(error);
        }
    } //end $scope.get_records

    $scope.get_records();

    $scope.changeData = function(direction){
        activeBook += direction;
        if (activeBook < 0) activeBook = 0; 
        if (activeBook >= books.length) activeBook = books.length - 1;
        $scope.obj = books[activeBook];
        $scope.showHide();
    }

    $scope.showHide = function(){
        $scope.hidePrev = (activeBook == 0);
        $scope.hideNext = (activeBook == books.length - 1);
    }

}); //end controller