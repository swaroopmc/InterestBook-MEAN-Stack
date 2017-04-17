angular.module('interestApp', [ 'ngAnimate', 'ui.bootstrap' ]);
angular.module('interestApp').controller('interestCtrl',
		function($scope, $http) {
			$scope.oneAtATime = true;
			var interestAry = [];
			$scope.userInterest = function(interest) {
				interestAry = interest;
			}
			$scope.addInterest = function($event) {
				$http({
					method : "POST",
					url : '/interest',
					data : {
						"interestAry" : interestAry
					}
				}).success(function(data, status) {

					window.location.assign("/interest");

				}).error(function(data, status) {
				});
				interestAry = [];
			};
		});
function check() {
	var interest = [];
	if (document.getElementById("inside_out").checked == true) {
		interest.push('Inside Out');
	}
	if (document.getElementById("twilight").checked == true) {
		interest.push('Twilight');
	}
	if (document.getElementById("king_speech").checked == true) {
		interest.push('king Speech');
	}
	if (document.getElementById("nba").checked == true) {
		interest.push('NBA');
	}
	if (document.getElementById("nfl").checked == true) {
		interest.push('NFL');
	}
	if (document.getElementById("mlb").checked == true) {
		interest.push('MLB');
	}
	if (document.getElementById("harry_potter").checked == true) {
		interest.push('Harru Potter');
	}
	if (document.getElementById("lord_of_king").checked == true) {
		interest.push('Lord of King');
	}
	if (document.getElementById("gone_girl").checked == true) {
		interest.push('Gone Girl');
	}
	var scope = angular.element(document.getElementById("main")).scope();
	scope.$apply(function() {
		scope.userInterest(interest);
	});
}