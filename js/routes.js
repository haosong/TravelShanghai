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
                url: '/view/:id',
                cache: false,
                templateUrl: 'templates/viewTab.html',
                controller: 'viewTabController',
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

            .state('view.detail', {
                url: '/detail',
                cache: false,
                views: {
                    'tab8': {
                        templateUrl: 'templates/detail.html',
                        controller: 'detailController'
                    }
                }
            })

            .state('view.comment', {
                url: '/comment',
                views: {
                    'tab9': {
                        templateUrl: 'templates/comment.html',
                        controller: 'commentController'
                    }
                }
            })

            .state('view.upload', {
                url: '/upload',
                views: {
                    'tab11': {
                        templateUrl: 'templates/upload.html',
                        controller: 'uploadController'
                    }
                }
            })

            .state('footprint', {
                url: '/footprint',
                templateUrl: 'templates/footprint.html',
                controller: 'footprintController'
            })

            .state('wish', {
                url: '/wish',
                templateUrl: 'templates/wish.html',
                controller: 'wishController'
            })

            .state('favor', {
                url: '/favor',
                templateUrl: 'templates/favor.html',
                controller: 'favorController'
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

            .state('index', {
                url: '/index',
                templateUrl: 'templates/index.html',
                controller: 'indexController'
            })

        $urlRouterProvider.otherwise('index')


    });