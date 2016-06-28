angular.module('app.controllers', [])

    .controller('listController', function ($scope) {
        $scope.data = [
            {
                "type": "上海工业遗址1",
                "attractions": [
                    {
                        "id": "1",
                        "lng": "116.133",
                        "lat": "36.384",
                        "bounds": [
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            },
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            }
                        ],
                        "name": "1933老场坊1-1",
                        "information": "这是景观的基本信息",
                        "introduction": "这是关于景观的详细介绍",
                        "rating": 4.4,
                        "footprint": 6,
                        "favor": 18,
                        "wish": 5,
                        "rating5": "100",
                        "rating4": "80",
                        "rating3": "60",
                        "rating2": "20",
                        "rating1": "10",
                        "type": "上海工业遗址"
                    },
                    {
                        "id": "2",
                        "lng": "116.133",
                        "lat": "36.384",
                        "bounds": [
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            },
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            }
                        ],
                        "name": "1933老场坊1-2",
                        "information": "这是景观的基本信息",
                        "introduction": "这是关于景观的详细介绍",
                        "rating": 4.2,
                        "footprint": 20,
                        "favor": 10,
                        "wish": 15,
                        "rating5": "100",
                        "rating4": "80",
                        "rating3": "60",
                        "rating2": "20",
                        "rating1": "10",
                        "type": "上海工业遗址"
                    }
                ]
            },
            {
                "type": "上海工业遗址2",
                "attractions": [
                    {
                        "id": "2",
                        "lng": "116.133",
                        "lat": "36.384",
                        "bounds": [
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            },
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            }
                        ],
                        "name": "1933老场坊2-1",
                        "information": "这是景观的基本信息",
                        "introduction": "这是关于景观的详细介绍",
                        "rating": 4.4,
                        "footprint": 6,
                        "favor": 18,
                        "wish": 5,
                        "rating5": "100",
                        "rating4": "80",
                        "rating3": "60",
                        "rating2": "20",
                        "rating1": "10",
                        "type": "上海工业遗址"
                    },
                    {
                        "id": "2",
                        "lng": "116.133",
                        "lat": "36.384",
                        "bounds": [
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            },
                            {
                                "lng": "xx.xx",
                                "lat": "xx.xx"
                            }
                        ],
                        "name": "1933老场坊2-2",
                        "information": "这是景观的基本信息",
                        "introduction": "这是关于景观的详细介绍",
                        "rating": 4.2,
                        "footprint": 20,
                        "favor": 10,
                        "wish": 15,
                        "rating5": "100",
                        "rating4": "80",
                        "rating3": "60",
                        "rating2": "20",
                        "rating1": "10",
                        "type": "上海工业遗址"
                    }
                ]
            }
        ];
        $scope.tab = 0;
        $scope.select = function (setTab) {
          $scope.tab = setTab;  
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    })

    .controller('nearbyController', function ($scope) {
        $scope.$on("$ionicView.loaded", function () {
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
            geolocationControl.addEventListener("locationSuccess", function (e) {
                // 定位成功事件
                var address = e.addressComponent.province + e.addressComponent.city
                    + e.addressComponent.district + e.addressComponent.street
                    + e.addressComponent.streetNumber;
                map.setZoom(20);
                console.log("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError", function (e) {
                // 定位失败事件
                console.log(e.message);
            });
            function updateBounds(e) {
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                x1 = bssw.lng;
                y1 = bssw.lat;
                x2 = bsne.lng;
                y2 = bsne.lat;
                console.log("(" + x1 + ", " + y1 + ") - (" + x2 + ", " + y2 + ")");
            }

            map.addControl(geolocationControl);
            map.addEventListener("moveend", updateBounds);
            map.addEventListener("zoomend", updateBounds);
            map.addEventListener("dragend", updateBounds);
            map.addEventListener("load", updateBounds);

            var point = new BMap.Point(116.400244, 39.92556);
            map.centerAndZoom(point, 12);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中

            var label = new BMap.Label("我是文字标注哦", {offset: new BMap.Size(20, -10)});
            marker.setLabel(label);

            $(window).load(function () {
                $(".BMap_geolocationIcon").click();
            });
        });
    })

    .controller('historyController', function ($scope) {

    })

    .controller('routeController', function ($scope) {
        $scope.$on("$ionicView.loaded", function () {
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
            geolocationControl.addEventListener("locationSuccess", function (e) {
                // 定位成功事件
                var address = e.addressComponent.province + e.addressComponent.city
                    + e.addressComponent.district + e.addressComponent.street
                    + e.addressComponent.streetNumber;
                map.setZoom(20);
                console.log("当前定位地址为：" + address);
            });
            geolocationControl.addEventListener("locationError", function (e) {
                // 定位失败事件
                console.log(e.message);
            });
            function updateBounds(e) {
                var bs = map.getBounds();   //获取可视区域
                var bssw = bs.getSouthWest();   //可视区域左下角
                var bsne = bs.getNorthEast();   //可视区域右上角
                x1 = bssw.lng;
                y1 = bssw.lat;
                x2 = bsne.lng;
                y2 = bsne.lat;
                console.log("(" + x1 + ", " + y1 + ") - (" + x2 + ", " + y2 + ")");
            }

            map.addControl(geolocationControl);
            map.addEventListener("moveend", updateBounds);
            map.addEventListener("zoomend", updateBounds);
            map.addEventListener("dragend", updateBounds);
            map.addEventListener("load", updateBounds);

            var point = new BMap.Point(116.400244, 39.92556);
            map.centerAndZoom(point, 12);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中

            var label = new BMap.Label("我是文字标注哦", {offset: new BMap.Size(20, -10)});
            marker.setLabel(label);

            $(window).load(function () {
                $(".BMap_geolocationIcon").click();
            });
        });
    })

    .controller('surveyController', function ($scope) {

    })

    .controller('viewTabController', function ($scope, $stateParams, $state) {
        $scope.tabClicked = function (page) {
            var id = parseInt($stateParams.id, 10);
            $scope.viewid = id;
            console.log(id);
            if (page == 2) {
                $state.transitionTo('view.comment', {
                    id: id
                });
            } else if (page == 4) {
                $state.transitionTo('view.upload', {
                    id: id
                });
            }
        };
    })

    .controller('detailController', function ($scope, $stateParams, $ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
        });
        $scope.$on("$ionicView.loaded", function(){
            var map = new BMap.Map("allMap3");
            //map.centerAndZoom(new BMap.Point(121.558562, 31.221671), 18);
            map.enableScrollWheelZoom();

            addMarker(id);
            addPloygon(id);

            function addMarker(id){
                var point = new BMap.Point(121.558562, 31.221671);
                map.centerAndZoom(point, 15);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            }
            function addPloygon(id){
                var polygon = new BMap.Polygon([
                    new BMap.Point(121.548514, 31.218869),
                    new BMap.Point(121.548712, 31.218467),
                    new BMap.Point(121.554506, 31.216892),
                    new BMap.Point(121.555925, 31.2168),
                    new BMap.Point(121.557416, 31.217139),
                    new BMap.Point(121.566058, 31.219641),
                    new BMap.Point(121.567711, 31.219872),
                    new BMap.Point(121.567917, 31.22032),
                    new BMap.Point(121.566022, 31.228604),
                    new BMap.Point(121.563049, 31.227554),
                    new BMap.Point(121.560156, 31.226504),
                    new BMap.Point(121.555018, 31.224999),
                    new BMap.Point(121.552485, 31.22364),
                    new BMap.Point(121.55058, 31.222065),
                    new BMap.Point(121.549502, 31.22066),
                    new BMap.Point(121.548532, 31.218915)
                ], {strokeColor:"#f50704",fillColor:"", strokeWeight:3, strokeOpacity:0,fillOpacity:0,});
                map.addOverlay(polygon);
            }
        });
        var id = parseInt($stateParams.id, 10);
        $scope.id = id;
        console.log("id = " + id);
        $scope.ratingsObject = {
            iconOn: 'ion-heart',
            iconOff: 'ion-heart-broken',
            //iconOn: 'ion-android-star',
            //iconOff: 'ion-android-star-outline',
            iconOnColor: 'rgb(237, 45, 45)',//'rgb(56, 126, 245)',  //Optional
            iconOffColor:  'rgb(122, 122, 122)',    //Optional
            rating:  3, //Optional
            minRating:1,    //Optional
            readOnly: false, //Optional
            callback: function(rating) {    //Mandatory
                $scope.ratingsCallback(rating);
            }
        };
        $scope.$on("$ionicView.beforeLeave", function () {
            //$ionicHistory.removeBackView();
            //$ionicHistory.clearHistory();
            //$ionicHistory.clearCache();
        });
    })

    .controller('uploadController', function ($scope, $stateParams, $ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
        });
        $scope.ratingsObject = {
            iconOn: 'ion-heart',
            iconOff: 'ion-heart-broken',
            //iconOn: 'ion-android-star',
            //iconOff: 'ion-android-star-outline',
            iconOnColor: 'rgb(237, 45, 45)',//'rgb(56, 126, 245)',  //Optional
            iconOffColor:  'rgb(122, 122, 122)',    //Optional
            rating:  3, //Optional
            minRating:1,    //Optional
            readOnly: true, //Optional
            callback: function(rating) {    //Mandatory
                $scope.ratingsCallback(rating);
            }
        };
        $scope.ratingsCallback = function(rating) {
            console.log('Selected rating is : ', rating);
        };

        var id = parseInt($stateParams.id, 10);
        $scope.id = id;
        console.log("id = " + id);
        $scope.$on("$ionicView.beforeLeave", function () {
            //$ionicHistory.removeBackView();
            //$ionicHistory.clearHistory();
            //$ionicHistory.clearCache();
        });
    })

    .controller('commentController', function ($scope, $stateParams, $ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
        });
        var id = parseInt($stateParams.id, 10);
        $scope.id = id;
        console.log("id = " + id);
        $scope.$on("$ionicView.loaded", function () {
            var map = new BMap.Map("allMap4");
            var point = new BMap.Point(121.558562, 31.221671);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom();

            addPloygon(id);
            initMarkers(id);

            var arr = {};
            var number = 0;

            function addPloygon(id){
                var polygon = new BMap.Polygon([
                    new BMap.Point(121.548514, 31.218869),
                    new BMap.Point(121.548712, 31.218467),
                    new BMap.Point(121.554506, 31.216892),
                    new BMap.Point(121.555925, 31.2168),
                    new BMap.Point(121.557416, 31.217139),
                    new BMap.Point(121.566058, 31.219641),
                    new BMap.Point(121.567711, 31.219872),
                    new BMap.Point(121.567917, 31.22032),
                    new BMap.Point(121.566022, 31.228604),
                    new BMap.Point(121.563049, 31.227554),
                    new BMap.Point(121.560156, 31.226504),
                    new BMap.Point(121.555018, 31.224999),
                    new BMap.Point(121.552485, 31.22364),
                    new BMap.Point(121.55058, 31.222065),
                    new BMap.Point(121.549502, 31.22066),
                    new BMap.Point(121.548532, 31.218915)
                ], {strokeColor:"#f50704",fillColor:"", strokeWeight:3, strokeOpacity:0,fillOpacity:0,});
                map.addOverlay(polygon);
            }
            function initMarkers(id){
                var message = "[{'type':3,'lng':121.565584,'lat':31.22606,'text':''}," +
                    "{'type':4,'lng':121.55537,'lat':31.224179,'text':''}," +
                    "{'type':2,'lng':121.564398,'lat':31.22316,'text':''}," +
                    "{'type':15,'lng':121.553182,'lat':31.219163,'text':'12345678'}]";
                var array = eval("(" + message + ")");
                var l = array.length;

                for (var i = 0; i < l; i++){
                    var lng = array[i].lng;
                    var lat = array[i].lat;
                    var type = array[i].type;

                    var marker = new BMap.Marker(new BMap.Point(lng, lat));
                    map.addOverlay(marker);
                    marker.disableDragging();
                    if (type == 15 || type == 16){
                        var label = new BMap.Label(array[i].text,{offset:new BMap.Size(20,-10)});
                        marker.setLabel(label);
                    }
                }
            }

            document.getElementById("addActicityMarker1").onclick = function (){
                addMarker(1);
            }
            document.getElementById("addActicityMarker2").onclick = function (){
                addMarker(2);
            }
            document.getElementById("addActicityMarker3").onclick = function (){
                addMarker(3);
            }
            document.getElementById("addActicityMarker4").onclick = function (){
                addMarker(4);
            }
            document.getElementById("addActicityMarker5").onclick = function (){
                addMarker(5);
            }
            document.getElementById("addActicityMarker6").onclick = function (){
                addMarker(6);
            }
            document.getElementById("addActicityMarker7").onclick = function (){
                addMarker(7);
            }
            document.getElementById("addActicityMarker8").onclick = function (){
                addMarker(8);
            }
            document.getElementById("addActicityMarker9").onclick = function (){
                addMarker(9);
            }
            document.getElementById("addActicityMarker10").onclick = function (){
                addMarker(10);
            }
            document.getElementById("addActicityMarker11").onclick = function (){
                addMarker(11);
            }
            document.getElementById("addActicityMarker12").onclick = function (){
                addMarker(12);
            }
            document.getElementById("addActicityMarker13").onclick = function (){
                addMarker(13);
            }
            document.getElementById("addActicityMarker14").onclick = function (){
                addMarker(14);
            }
            document.getElementById("addActicityMarker15").onclick = function (){
                addMarker(15);
            }
            document.getElementById("addActicityMarker16").onclick = function (){
                addMarker(16);
            }

            function addMarker(type){
                console.log("addMarker"+type);
                // marker = new BMap.Marker(point);
                var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
                var marker = new BMap.Marker(point,{icon:myIcon});
                map.addOverlay(marker);
                marker.enableDragging();

                var text = "";
                if (type == 15){
                    text = document.getElementById("commentTypeInput1").value;
                    document.getElementById("commentTypeInput1").value = "";
                    var label = new BMap.Label(text,{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                }
                if (type == 16){
                    text = document.getElementById("commentTypeInput2").value;
                    document.getElementById("commentTypeInput2").value = "";
                    var label = new BMap.Label(text,{offset:new BMap.Size(20,-10)});
                    marker.setLabel(label);
                }

                marker.addEventListener("dragend", function(){
                    marker.disableDragging();
                    var obj = {
                        "type": type,
                        "lng": marker.getPosition().lng,
                        "lat": marker.getPosition().lat,
                        "text": text
                    };
                    arr["Item" + number] = obj;
                    number++;
                    console.log(number);
                });
            }

            document.getElementById("saveCommentAndReturn").onclick = function(){
                console.log("Save add marker.");
                arr["number"] = number;
                arr["id"] = id;
                console.log(arr);
                console.log(JSON.stringify(arr));
            }
        });
        $scope.$on("$ionicView.beforeLeave", function () {
            //$ionicHistory.removeBackView();
            //$ionicHistory.clearHistory();
            //$ionicHistory.clearCache();
        });
    })

    .controller('signupController', function ($scope, $ionicSideMenuDelegate) {
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });

    })

    .controller('loginController', function ($scope, $ionicSideMenuDelegate) {
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });
    })

    .controller('navBarController', function ($scope, $state, $ionicPopover, $timeout) {
        $scope.uiState = $state;
        $scope.animation = 'slide-in-up';
        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/menu.html', {
            scope: $scope,
            animation: $scope.animation
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });
    })
;
 