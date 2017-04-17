angular.module('friendApp', [ 'ngAnimate', 'ui.bootstrap' ]);
angular.module('friendApp').controller('friendCtrl', function($scope, $http) {
	$scope.invalid_friend = true;
	$scope.search_friend = true;
	$scope.requestListWarning = false;
	$scope.friendListName = "Friends";
	$scope.search = function($event) {
		$http({
			method : "POST",
			url : '/searchFriend',
			data : {
				"friendName" : $scope.friendName
			}
		}).success(function(data, status) {
			$scope.search_friend = false;
			$scope.searchList = data;
		}).error(function(data, status) {
		});
	};
	$scope.sendRequest = function($username) {
		console.log($username);
		$http({
			method : "POST",
			url : '/sendRequest',
			data : {
				"username" : $username.username,
				"friendName": $username.firstname+ " "+$username.lastname
			}
		}).success(function(data, status) {
			if (data.code == "200") {
				$scope.search_friend = true;
			}
		}).error(function(data, status) {
		});
	};
	$scope.addFriend = function($friendName) {
		$http({
			method : "POST",
			url : '/addFriend',
			data : {
				"friendName" : $friendName.name,
				"friendUsername":$friendName.username
			}
		}).success(function(data, status) {
			if (data.code == "200") {
				window.location.assign("/friend");
			}
		}).error(function(data, status) {
		});
	};
	$http({
		method : "POST",
		url : '/friend'
	}).success(function(data, status) {
		if(data.code == "400"){
			$scope.friendListName = "You Don't Have Friend Yet";
			$scope.requestListWarning = true;
		}
		if (data.value.friendList.length == 0) {
			$scope.friendListName = "You Don't Have Friend Yet";
		}

		if (data.value.requestList.length == 0) {
			$scope.requestListWarning = true;
		}
		$scope.friendList = data.value.friendList;
		$scope.requestList = data.value.requestList;

	}).error(function(data, status) {
	});

});
