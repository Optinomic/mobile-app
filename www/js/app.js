// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('optinomic', ['ionic', 'optinomic-logo', 'optinomic.services', 'optinomic.controllers', 'chieffancypants.loadingBar'])


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // intro
            .state('intro', {
                url: '/',
                templateUrl: 'templates/intro.html',
                controller: 'IntroCtrl'
            })
            
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // the pet tab has its own child nav-view and history
            .state('tab.events-index', {
                url: '/events',
                views: {
                    'events-tab': {
                        templateUrl: 'templates/life-events-index.html',
                        controller: 'EventIndexCtrl'
                    }
                }
            })

            .state('tab.event-detail', {
                url: '/event/:eventId',
                views: {
                    'events-tab': {
                        templateUrl: 'templates/survey.html',
                        controller: 'EventDetailCtrl'
                    }
                }
            })

            .state('tab.team', {
                url: '/team',
                views: {
                    'team-tab': {
                        templateUrl: 'templates/team-index.html',
                        controller: 'CareTeamCtrl'
                    }
                }
            })

            .state('tab.team-member', {
                url: '/team/:memberId',
                views: {
                    'team-tab': {
                        templateUrl: 'templates/team-member.html',
                        controller: 'TeamMemberCtrl'
                    }
                }
            })


            .state('tab.about', {
                url: '/settings',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/settings.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    });

