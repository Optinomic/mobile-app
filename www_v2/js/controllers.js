angular.module('optinomic.controllers', [])


// A simple controller that fetches a list of data from a service
    .controller('MainCtrl', function ($scope, JSON_up) {
        console.log ("START: MainCtrl");
        $scope.life_events = JSON_up.all();

    })


// A simple controller that fetches a list of data from a service
    .controller('EventIndexCtrl', function ($scope, JSON_up) {
        console.log ("START: EventIndexCtrl");


        $scope.onRefresh = function() {
            // a service returning data (services.js)
            $scope.life_events = JSON_up.all();
            console.log ("Updated: life_events: ",$scope.life_events);

            // Trigger refresh complete on the pull to refresh action
            $scope.$broadcast('scroll.refreshComplete');
        };
    })


// Display the survey
    .controller('EventDetailCtrl', function ($scope, $stateParams, $sce, JSON_up) {
        // Care-Team data (services.js)
        console.log ("$stateParams: ", $stateParams.eventId);
        $scope.myevent = JSON_up.get($stateParams.eventId);
        $scope.myevent.title = $scope.myevent.result.moduleName;
        $scope.myevent.surveyUrl = $sce.trustAsResourceUrl($scope.myevent.result.url);

        // should this survey loaded inside iframe?
        $scope.myevent.inIframe = false;
        if ($scope.myevent.result.url.substring(0,28) === 'http://survey.optinomix.org/') {
            $scope.myevent.inIframe = true;
        };


        console.log ("myevent: ", $scope.myevent);

        $scope.showIframe = function() {
            $scope.myevent.inIframe = true;
        }


    })


// A simple controller that shows a tapped item's data
.controller('CareTeamCtrl', function ($scope, $stateParams, JSON_up) {
    // Care-Team data (services.js)
    console.log ("$stateParams: ", $stateParams);
    $scope.care_team = JSON_up.get(0);
    console.log ("care_team: ", $scope.care_team);
});
