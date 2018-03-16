angular.module('example', ['rx'])

controller(
		'AppCtrl',
		function($scope, $http, rx) {
			function searchWikipedia(term) {
				// Our role can be observed (anyone can subscribe)
				return rx.Observable
						.fromPromise($http({
									url : "http://en.wikipedia.org/w/api.php?&amp;callback=JSON_CALLBACK",
									method : "jsonp",
									params : {

										action : "opensearch",
										search : term,
										format : "json"
									}

								}))

						// In this case we go back to the first value of the
						// research

						.map(function(response) {
							return response.data[1];
						});
			}

			// Variables are visible in the HTML

			$scope.results = [];
			// The click function is created and it is also an observable flow

			$scope.$createObservableFunction('click')

			// A flow is created from the ‘search’ variable

			.map(function() {
				return $scope.search;
			})
			// An operation is made ‘search Wikipedia’ with the last value of
			// ‘search'

			.subscribe(function(results) {
				$scope.results = results;
			});
		});
