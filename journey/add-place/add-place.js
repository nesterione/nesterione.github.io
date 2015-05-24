'use strict';

var app = angular.module('myApp.addPlace', ['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-place', {
    templateUrl: 'add-place/add-place.html',
    controller: 'AddPlaceCtrl'
  });
}]);

app.controller('AddPlaceCtrl', function($scope, $http) {
    $scope.message = "";
    
    $scope.add = function() {
        //console.log($scope.place);
        $http.put( 'http://services.nesterenya.com/journey/places/add', $scope.place).
         success(function(data, status, headers, config) {
                   $scope.message = "Запись добавлена, можете добавить еще одну";
                $scope.place = undefined;
              });
        
        
       
        
    }
    
});
