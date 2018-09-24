var app = angular.module('autonom', []);

app.controller('MainCtrl', function($scope,AutonomService) {
	
	let serviceProviderObj={
		serviceProvider: null,
		flowDate: null
	}
	$scope.serviceProviderObj = serviceProviderObj;
	
	$scope.ngSchedule = [];
	$scope.aggregatedData = [];
	$scope.nomination = [];
	
	// Step 1 submit we will make a ajax to server to get the required information to populate the tables
	$scope.getDealsbyServiceProvider = function(){
		AutonomService.getDealsbyServiceProvider().then(function(response){
			let _dummy = {
					"UIFetchData": [{

						"NGSchedule": [{
								"BuyorSell": "BUY",
								"DailyVolume": 1000,
								"DealID": 1111,
								"InstrumentType": "PHYS",
								"ExtCounterParty": "DIRECTENERGY-1",
								"OuttCounterParty": "WFLLC",
								"StartDate": "8/1/2018",
								"EndDate": "10/1/2018"
							},
							{
								"BuyorSell": "SELL",
								"DailyVolume": 1000,
								"DealID": 2222,
								"InstrumentType": "PHYS",
								"ExtCounterParty": "DIRECTENERGY-1",
								"OuttCounterParty": "WFLLC",
								"StartDate": "8/1/2018",
								"EndDate": "10/1/2018"
							},
							{
								"BuyorSell": "SELL",
								"DailyVolume": 1000,
								"DealID": 3333,
								"InstrumentType": "PHYS",
								"ExtCounterParty": "DIRECTENERGY-1",
								"OuttCounterParty": "WFLLC",
								"StartDate": "8/1/2018",
								"EndDate": "10/1/2018"
							},

							{
								"BuyorSell": "BUY",
								"DailyVolume": 1000,
								"DealID": 4444,
								"InstrumentType": "PHYS",
								"ExtCounterParty": "DIRECTENERGY-1",
								"OuttCounterParty": "WFLLC",
								"StartDate": "8/1/2018",
								"EndDate": "10/1/2018"
							}
						],

						"AggregatedData": [{
							"ExtCounterParty": "DIRECTENERGY-1",
							"OuttCounterParty": "WFLLC",
							"AggregatedVolBuy": 5000,
							"AggregatedVolSell": 5000,
							"NGSchedule": [{
									"BuyorSell": "BUY",
									"DailyVolume": 2000,
									"DealID": 8888,
									"InstrumentType": "PHYS",
									"ExtCounterParty": "DIRECTENERGY-1",
									"OuttCounterParty": "WFLLC",
									"StartDate": "8/1/2018",
									"EndDate": "10/1/2018"
								},
								{
									"BuyorSell": "Buy",
									"DailyVolume": 3000,
									"DealID": 7777,
									"InstrumentType": "PHYS",
									"ExtCounterParty": "DIRECTENERGY-1",
									"OuttCounterParty": "WFLLC",
									"StartDate": "8/1/2018",
									"EndDate": "10/1/2018"
								},
								{
									"BuyorSell": "SELL",
									"DailyVolume": 1000,
									"DealID": 7788,
									"InstrumentType": "PHYS",
									"ExtCounterParty": "DIRECTENERGY-1",
									"OuttCounterParty": "WFLLC",
									"StartDate": "8/1/2018",
									"EndDate": "10/1/2018"
								},
								{
									"BuyorSell": "SELL",
									"DailyVolume": 4000,
									"DealID": 7789,
									"InstrumentType": "PHYS",
									"ExtCounterParty": "DIRECTENERGY-1",
									"OuttCounterParty": "WFLLC",
									"StartDate": "8/1/2018",
									"EndDate": "10/1/2018"
								}
							]
						}]
					}]
				};
				
				$scope.ngSchedule = _dummy.UIFetchData[0].NGSchedule;
				$scope.aggregatedData = _dummy.UIFetchData[0].AggregatedData;
		});
	  
	}
	
	// Function to add NGSchedule in the third list.
	$scope.addNGSchedule = function(){
		let _list = $scope.ngSchedule;
		for(let i in _list){
			if(_list[i].isChecked){
				if($scope.nomination.indexOf(_list[i]) === -1) {
				  $scope.nomination.push(_list[i]);
				}	
				// remove the record from exsisting table.
				$scope.ngSchedule = $scope.ngSchedule.filter(function(el) { return el.DealID != _list[i].DealID; }); 
			}else{
				// remove from the list.
				$scope.nomination = $scope.nomination.filter(function(el) { return el.DealID != _list[i].DealID; }); 
			}
		}
	}
	
	// Function to add aggregatedData.NGSchedule in the third list.
	$scope.fullBook = function(){
		console.log("$scope.aggregatedData",$scope.aggregatedData);
		let _list = $scope.aggregatedData;
		for(let i in _list){
			let _selectedList = _list[i].NGSchedule;
			if(_list[i].isChecked){
				for(let j in _selectedList){
					if($scope.nomination.indexOf(_selectedList[j]) === -1) {
					  $scope.nomination.push(_selectedList[j]);
					}
				}
				// remove the record from exsisting table.
				$scope.aggregatedData = $scope.aggregatedData.filter(function(el) { 
						return (el.ExtCounterParty != _list[i].ExtCounterParty) && (el.OuttCounterParty != _list[i].OuttCounterParty); 
					}); 
			}else{
				for(let j in _selectedList){
					$scope.nomination = $scope.nomination.filter(function(el) { return el.DealID != _selectedList[j].DealID; }); 
				}
			}
			
		}
	}
	
  
});
