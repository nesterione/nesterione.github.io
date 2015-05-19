'use strict';

var app = angular.module('myApp.view2', ['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}]);

app.controller('View2Ctrl', function($scope) {
    
    $scope.image = {
      url: 'images/markers/castle32.png',        
      size: [32, 32], 
      origin: [0,0],
      anchor: [0, 32]
    };
    
    $scope.beaches = [
      ['Мирский замок', "53.451281, 26.473303",1],
      ['Несвижский замок', "53.222892, 26.691773",2],
      ['Брестская крепость', "52.083109, 23.658875", 3],
     ['Гольшанский замок', "54.251562, 26.020300", 4]
    ];
    
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
     
     $scope.toggleBounce = function() {
         debugger;
      if (this.getAnimation() != null) {
        this.setAnimation(null);
      } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
});


 

//.controller('parentParentController', function($scope) {
//    $scope.$on('mapInitialized', function(event, map) {
//        map.setCenter( .... )
//      
//    });
//  });