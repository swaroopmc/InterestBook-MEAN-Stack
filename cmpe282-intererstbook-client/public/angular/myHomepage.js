angular.module('homepageApp', [ 'ngAnimate', 'ui.bootstrap' ]);
angular.module('homepageApp').controller('homepageCtrl', function($scope, $http) {
	$scope.addNews = function(allInfo){
		$scope.addNews = function(){
			$http({
				method : "POST",
				url : '/addNews',
				data : {
					"news" : $scope.news
				}
			}).success(function(data, status) {

				window.location.assign("/homepage");

			}).error(function(data, status) {
			});
		}
	}
	$http({
		method : "POST",
		url : '/homepage'
	}).success(function(data, status) {
		$scope.interestList = data.interest;
		$scope.newsList = data.news;
	}).error(function(data, status) {
	});

});
