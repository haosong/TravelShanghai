// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ionic-ratings', 'ngCookies', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .filter("trustHtml",function($sce){
        return function (input){
            return $sce.trustAsHtml(input);
        }
    })

.directive("ngFileSelect",function(){

    return {
        link: function($scope,el){

            el.bind("change", function(e){

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })

        }

    }
    
})
//     .config(['uiZeroclipConfigProvider', function(uiZeroclipConfigProvider) {
//
//     // config ZeroClipboard
//     uiZeroclipConfigProvider.setZcConf({
//         swfPath: './lib/zeroclipboard/dist/ZeroClipboard.swf'
//     });
// }])

;