'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);


app.controller('MainCntl', function($scope, $http) {
	
	/*$scope.links = [{
   name: "Ссылка1",
   description: "Описание ссылки 0",
   categories: ["без категории", "машинное обучение"],
   tags: [".NET",  "Ajax"]
 },
 {
   name: "Ссылка2",
   description: "Описание ссылки 1",
   categories: ["без категории"],
   tags: [ "ASP.NET", "Ajax"]
 }];*/
 
 $scope.init = function () {
    $http.get('links.json').
              success(function(data, status, headers, config) {
                   $scope.links = data;
              }).
              error(function(data, status, headers, config) {
                    alert("error data load, will be used test data");
			  });
};

});