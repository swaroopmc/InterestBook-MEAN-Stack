angular.module('interestbookApp', [ 'ngAnimate', 'ui.bootstrap' ]);
angular.module('interestbookApp').controller('interestbookCtrl',
		function($scope, $http) {
			$scope.invalid_login = true;
			$scope.invalid_signup = true;
			$scope.login = function() {
				$http({
					method : "POST",
					url : '/login',
					data : {
						"username" : $scope.username,
						"password" : $scope.password
					}
				}).success(function(data) {
					if (data.code == "200") {
						window.location.assign("/homepage");
					} else {
						$scope.invalid_login = false;

					}
				}).error(function(error) {
				});
			};
			$scope.signup = function() {
				$http({
					method : "POST",
					url : '/signup',
					data : {
						"firstname" : $scope.firstname,
						"lastname" : $scope.lastname,
						"username" : $scope.reg_username,
						"password" : $scope.reg_password
					}
				}).success(function(data) {
					if (data.code == "200") {
						window.location.assign("/userInfo");
					} else {
						$scope.invalid_signup = false;

					}
				}).error(function(error) {
				});
			};

		});