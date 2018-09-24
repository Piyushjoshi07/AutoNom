var app = angular.module('autonom');

app.factory('AutonomService', function($http,$q) {
	
	return {
		getDealsbyServiceProvider: function(){
			req = {
					method: 'GET',
					url: 'https://jsonplaceholder.typicode.com/todos/1'
					}
			return $http(req).success(function(response) {
				return response.data;
			}); 
		}
    };
});