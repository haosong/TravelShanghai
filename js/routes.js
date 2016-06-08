angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'templates/mainTab.html',
                abstract: true
            })

            .state('view', {
                url: '/view',
                templateUrl: 'templates/viewTab.html',
                abstract: true
            })

            .state('main.list', {
                url: '/list',
                views: {
                    'tab1': {
                        templateUrl: 'templates/list.html',
                        controller: 'listController'
                    }
                }
            })

            .state('main.nearby', {
                url: '/nearby',
                views: {
                    'tab2': {
                        templateUrl: 'templates/nearby.html',
                        controller: 'nearbyController'
                    }
                }
            })

            .state('main.history', {
                url: '/history',
                views: {
                    'tab3': {
                        templateUrl: 'templates/history.html',
                        controller: 'historyController'
                    }
                }
            })

            .state('main.route', {
                url: '/route',
                views: {
                    'tab4': {
                        templateUrl: 'templates/route.html',
                        controller: 'routeController'
                    }
                }
            })

            .state('survey', {
                url: '/survey',
                templateUrl: 'templates/survey.html',
                controller: 'surveyController'
            })

            .state('main.detail', {
                url: '/detail/:id',
                views: {
                    'tab5': {
                        templateUrl: 'templates/view.html',
                        controller: 'detailController'
                    }
                }
            })

            .state('view.detail', {
                url: '/detail/:id',
                views: {
                    'tab8': {
                        templateUrl: 'templates/view.html',
                        controller: 'detailController'
                    }
                }
            })

            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'signupController'
            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })

        $urlRouterProvider.otherwise('view/detail/10')


    });