angular.module('optinomic.controllers', [])


// A simple controller that fetches a list of data from a service
    .controller('MainCtrl', function ($scope, $http, app_settings, JSON_up) {
        console.log("START: MainCtrl");


        //Load Settings from services.js
        $scope.settings = app_settings;
        console.log ("$scope.settings", $scope.settings);


        


        $scope.life_events = JSON_up.all();
        console.log("$scope.life_events ", $scope.life_events);
 

        $scope.onRefresh = function () {
            // a service returning data (services.js)
            
            $scope.life_events = [];
            if ($scope.settings.fake_data) {
                $scope.life_events_fake = JSON_up.all();
                $scope.life_events = $scope.life_events_fake;
                console.log("Updated: fake - life_events: ", $scope.life_events);
            } else {
                $scope.getJSONfromTherapyServer('763e6eed10399cee');
                console.log("Updated: real - life_events: ", $scope.life_events);
            };


            // Trigger refresh complete on the pull to refresh action
            $scope.$broadcast('scroll.refreshComplete');
        };


  
        $scope.getJSONfromTherapyServer = function (myHash) {
            console.log("START: getJSONfromTherapyServer");
            $scope.life_events = [];    

            var url = "http://json2jsonp.com/?url=http://survey.optinomix.org/fetchresults/" + myHash + "_up&callback=JSON_CALLBACK";
 
            $http.get(url)
                .success(function(data){
                    // TODO: This is working but seems ugly to me. 
                    // Need to have JSONP to not have 'Access-Control-Allow-Origin' Problems. Done by json2jsonp.com
                    // Remove 'JSON_CALLBACK([' crap and convert string to Object.
                    therapy_server_json = data;
                    therapy_server_json = therapy_server_json.replace("JSON_CALLBACK([","[");
                    therapy_server_json = therapy_server_json.substring(0, (therapy_server_json.length - 1));
                    therapy_server_json = JSON.parse(therapy_server_json);


                    $scope.life_events = therapy_server_json;


                    //Toast - success.
                    window.plugins.toast.show('successfully updated!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
                      
                    console.log('getJSONfromTherapyServer: survey.optinomix.org over json2jsonp = ', $scope.life_events);
                })
        }


        $scope.onRefresh();

    })


// A simple controller that fetches a list of data from a service
    .controller('EventIndexCtrl', function ($scope, JSON_up) {
        //console.log ("START: EventIndexCtrl");


    })


// Display the survey
    .controller('EventDetailCtrl', function ($scope, $stateParams, $sce, JSON_up) {
        // Care-Team data (services.js)
        console.log("$stateParams: ", $stateParams.eventId);
        $scope.myevent = JSON_up.get($stateParams.eventId);
        $scope.myevent.title = $scope.myevent.result.moduleName;
        $scope.myevent.surveyUrl = $sce.trustAsResourceUrl($scope.myevent.result.url);

        // should this survey loaded inside iframe?
        $scope.myevent.inIframe = false;
        if ($scope.myevent.result.url.substring(0, 28) === 'http://survey.optinomix.org/') {
            $scope.myevent.inIframe = true;
        };


        console.log("myevent: ", $scope.myevent);

        $scope.showIframe = function () {
            $scope.myevent.inIframe = true;
        }


    })


// A simple controller that shows a tapped item's data
    .controller('CareTeamCtrl', function ($scope, $stateParams, JSON_up) {
        // Care-Team data (services.js)
        console.log("$stateParams: ", $stateParams);
        $scope.care_team = JSON_up.get(0);
        console.log("care_team: ", $scope.care_team);
    })

// A simple controller that shows a tapped item's data
    .controller('TeamMemberCtrl', function ($scope, $stateParams, JSON_up) {
        console.log("START: TeamMemberCtrl");
        console.log("$stateParams.memberId: ", $stateParams.memberId);
        $scope.care_team = JSON_up.get(0);
        console.log("care_team: ", $scope.care_team);
        $scope.team_member = $scope.care_team.result.careteam[$stateParams.memberId]
        $scope.team_member.title = $scope.team_member.lastName + ' ' + $scope.team_member.firstName
        console.log("team_member: ", $scope.team_member);

    })



    // Infro
    .controller('IntroCtrl', function($scope, $state) {

      $scope.slideIndex = 0;  
      $scope.slideTitle = 'Welcome';  


      // Called to navigate to the main app
      var startApp = function() {

        console.log('startApp');

        $state.go('tab.events-index');
 

        // Set a flag that we finished the tutorial
        window.localStorage['didTutorial'] = true;
        console.log('startApp = ', window.localStorage['didTutorial']); 
      };



      if(window.localStorage['didTutorial'] === "true") {
        console.log('Skip intro');
        startApp();
      };


      // Move to the next slide
      $scope.appStart = function() {
        startApp();
      };


      // Move to the next slide
      $scope.next = function() {
        $scope.$broadcast('slideBox.nextSlide');
      };

      // Move to the next slide
      $scope.prev = function() {
        $scope.$broadcast('slideBox.prevSlide');
      };

      // Called each time the slide changes
      $scope.slideChanged = function(index) {
        console.log ("slideChanged index", index )
        $scope.slideIndex = index;

        if (index == 1) {
            $scope.slideTitle = 'track your life-events';  
        };
        if (index == 2) {
            $scope.slideTitle = 'Help / Ideas';  
        }
        console.log ("slideChanged slideTitle", $scope.slideTitle )

      }


})

