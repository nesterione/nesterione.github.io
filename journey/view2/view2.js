'use strict';

var app = angular.module('myApp.view2', ['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}]);

app.controller('View2Ctrl', function($scope, $http) {
    
    $scope.image = {
      url: 'images/markers/castle32.png',        
      size: [32, 32], 
      origin: [0,0],
      anchor: [0, 32]
    };
    
//    $scope.beaches = [
//      ['Мирский замок', "53.451281, 26.473303",1],
//      ['Несвижский замок', "53.222892, 26.691773",2],
//      ['Брестская крепость', "52.083109, 23.658875", 3],
//      ['Гольшанский замок', "54.251562, 26.020300", 4],
//      ['Дворец Румянцевых-Паскевичей', "52.422152, 31.016734",5]
//    ];
    
    $scope.places = [];
    
    $scope.$on('$viewContentLoaded', function() {
        $http.get('services.nesterenya.com/journey/places/all').
              success(function(data, status, headers, config) {
                   $scope.places = data;
              }).
              error(function(data, status, headers, config) {
                    alert("error data load, will be used test data");
                    $scope.places = [{"id":1,"position":"53.451281, 26.473303","title":"Мирский замок"},{"id":2,"position":"53.222892, 26.691773","title":"Несвижский замок"},{"id":3,"position":"52.083109, 23.658875","title":"Брестская крепость"},{"id":4,"position":"54.251562, 26.020300","title":"Гольшанский замок"},{"id":5,"position":"52.422152, 31.016734","title":"Дворец Румянцевых-Паскевичей"},{"id":6,"position":"53.677282, 23.822971","title":"Старый замок Гродно"}];
              });
    });
    
    $scope.count = 0;
     $scope.cli = function () {
         // alert("fd");
         $scope.count+=1;
    }
     
     $scope.togleMarker = function(mid) {
         //alert(mid);

                for (var key in $scope.map.markers) {
                    var mk = $scope.map.markers[key];
                    if(mk.mid===mid) {
                        $scope.map.markers[key].setAnimation(google.maps.Animation.BOUNCE);
                    } else {
                        $scope.map.markers[key].setAnimation(null);
                    }
                };

     }
     
     $scope.getAll = function() {
        /* $http.get('http://localhost:8080/api/journey/places/all').
              success(function(data, status, headers, config) {
                    alert(data);
              }).
              error(function(data, status, headers, config) {
                    alert("error");
              });*/
     }
     
     $scope.toggleBounce = function() {
          if (this.getAnimation() != null) {
            this.setAnimation(null);
          } else {
            this.setAnimation(google.maps.Animation.BOUNCE);
          }
    }
});
