angular.module('app.controllers', [])

    .controller('listController', function($scope) {

    })

    .controller('nearbyController', function($scope) {
        $scope.$on("$ionicView.loaded", function() {
            console.log("123");
            var x1, y1, x2, y2;
            var map = new BMap.Map("allmap1");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 18);
            map.enableScrollWheelZoom();                 // 启用滚轮放大缩小
            var geolocationControl = new BMap.GeolocationControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT,
                offset: new BMap.Size(15, 30),
                showAddressBar: false,
                enableAutoLocation: true
            });	// 左下角定位控件
            geolocationControl.addEventListener("locationSuccess", function(e){
                // 定位成功事件
                var address = e.addressComponent.province + e.addressComponent.city
                    + e.addressComponent.district + e.addressComponent.street
                    + e.addressComponent.streetNumber;
                map.setZoom(20);
                console.log("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError",function(e){
                // 定位失败事件
                console.log(e.message);
            });
            function updateBounds(e) {
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                x1 = bssw.lng; y1 = bssw.lat;
                x2 = bsne.lng; y2 = bsne.lat;
                console.log("(" + x1 + ", " + y1 + ") - (" + x2 + ", " + y2 + ")"  );
            }
            map.addControl(geolocationControl);
            map.addEventListener("moveend", updateBounds);
            map.addEventListener("zoomend", updateBounds);
            map.addEventListener("dragend", updateBounds);
            map.addEventListener("load", updateBounds);

            var point = new BMap.Point(116.400244,39.92556);
            map.centerAndZoom(point, 12);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中

            var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
            marker.setLabel(label);

            $(window).load(function() {
                $(".BMap_geolocationIcon").click();
            });
        });
    })



    .controller('historyController', function($scope) {

    })

    .controller('routeController', function($scope) {
        $scope.$on("$ionicView.loaded", function() {
            console.log("123");
            var x1, y1, x2, y2;
            var map = new BMap.Map("allmap2");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 18);
            map.enableScrollWheelZoom();                 // 启用滚轮放大缩小
            var geolocationControl = new BMap.GeolocationControl({
                anchor: BMAP_ANCHOR_BOTTOM_LEFT,
                offset: new BMap.Size(15, 30),
                showAddressBar: false,
                enableAutoLocation: true
            });	// 左下角定位控件
            geolocationControl.addEventListener("locationSuccess", function(e){
                // 定位成功事件
                var address = e.addressComponent.province + e.addressComponent.city
                    + e.addressComponent.district + e.addressComponent.street
                    + e.addressComponent.streetNumber;
                map.setZoom(20);
                console.log("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError",function(e){
                // 定位失败事件
                console.log(e.message);
            });
            function updateBounds(e) {
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                x1 = bssw.lng; y1 = bssw.lat;
                x2 = bsne.lng; y2 = bsne.lat;
                console.log("(" + x1 + ", " + y1 + ") - (" + x2 + ", " + y2 + ")"  );
            }
            map.addControl(geolocationControl);
            map.addEventListener("moveend", updateBounds);
            map.addEventListener("zoomend", updateBounds);
            map.addEventListener("dragend", updateBounds);
            map.addEventListener("load", updateBounds);

            var point = new BMap.Point(116.400244,39.92556);
            map.centerAndZoom(point, 12);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中

            var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
            marker.setLabel(label);

            $(window).load(function() {
                $(".BMap_geolocationIcon").click();
            });
        });
    })

    .controller('surveyController', function($scope) {

    })

    .controller('detailController', function($scope, $stateParams, $ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
        });
        var id = parseInt($stateParams.id, 10);
        $scope.id = id;
        console.log("id = " + id);
        $scope.$on("$ionicView.beforeLeave", function() {
            //$ionicHistory.clearHistory();
            //$ionicHistory.clearCache();
        });
    })

    .controller('signupController', function($scope, $ionicSideMenuDelegate) {
        $scope.$on("$ionicView.beforeLeave", function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });

    })

    .controller('loginController', function($scope, $ionicSideMenuDelegate) {
        $scope.$on("$ionicView.beforeLeave", function() {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function() {
            $ionicSideMenuDelegate.canDragContent(false);
        });
    })

    .controller('navBarController', function($scope, $state, $ionicPopover, $timeout) {
        $scope.uiState = $state;
        $scope.animation = 'slide-in-up';
        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/menu.html', {
            scope: $scope,
            animation: $scope.animation
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
    })
;
 