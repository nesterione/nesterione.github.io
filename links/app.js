'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'controllersM'
]);

var controllersM = angular.module('controllersM', []);


controllersM.controller('MainCntl', function($scope, $http, $route, $location, $routeParams) {
 
 function getFilter() {
	var str = $location.absUrl();
	var params = str.split("#");
	var vals = params[1].split("/");
	//alert(vals[0]+" | "+vals[1]+" | "+vals[2]);
	
	var returnValue = "";
	if(vals[1]==="tag") {
		returnValue = vals[2];
	}
	return returnValue;
 }
 
 //$scope.q1 = $routeParams.qqq;
 //$scope.q1 = $route.current.params;
 $scope.query = getFilter();//$location.absUrl();
 
 
 
 $scope.init = function () {
    //$scope.query = $routeParams.qqq
    
	$http.get('rlinks.json').
              success(function(data, status, headers, config) {
                   $scope.links = data;
				   debugger;
				   //alert($routeParams.qqq);
              }).
              error(function(data, status, headers, config) {
                    alert("error data load, will be used test data");
			  });
};

});