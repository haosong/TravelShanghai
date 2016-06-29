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
        $("#nearbyButton").on('click', function(event){
            event.preventDefault();
            console.log("123");
            $("#nearbyButton").unbind("click");
            console.log("234");
        });
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


            var searchInfoWindow3 = new BMapLib.SearchInfoWindow(map, "<a href='http://www.baidu.com'>asda</a>", {
                title: "信息框3<a href='http://www.baidu.com'>asda</a>", //标题
                width: 290, //宽度
                height: 40, //高度
                panel : "panel", //检索结果面板
                enableAutoPan : true, //自动平移
                searchTypes :[
                ]
            });
            function openInfoWindow3() {
                searchInfoWindow3.open(new BMap.Point(116.404, 39.915));
            }

            openInfoWindow3();

            $(window).load(function () {
                $(".BMap_geolocationIcon").click();
            });
        });
    })

    .controller('historyController', function ($scope) {

    })

    .controller('routeController', function ($scope) {
        $scope.id = "1231354";
        var num = 0;
        var marker;
        var attractions;
        var array = new Array();
        var map;
        var attractionId = -1;

        $scope.cancel = function() {
            $("#temp").css("display","none");
        };
        $scope.$on("$ionicView.loaded", function () {
            console.log("123");
            var x1, y1, x2, y2;
            map = new BMap.Map("allmap2");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(121.480233, 31.236313), 12);
            map.enableScrollWheelZoom();                 // 启用滚轮放大缩小
            initAttractions();

            document.getElementById("routeSearch").onclick = function(){
                var start = document.getElementById("routeStart").value;
                var end = document.getElementById("routeEnd").value;
                var options = {
                    renderOptions:{map: map, autoViewport: true},
                    onSearchComplete: function(results){
                        if (driving.getStatus() == BMAP_STATUS_SUCCESS){
                            // 获取第一条方案
                            var plan = results.getPlan(0);
                            // 获取方案的驾车线路
                            var route = plan.getRoute(0);
                            // 获取每个关键步骤,并输出到页面
                            var s = [];
                            for(var j = 0;j < plan.getNumRoutes(); j++){
                                var route = plan.getRoute(j);
                                console.log(plan.getNumRoutes());
                                for (var i = 0; i < route.getNumSteps(); i++){
                                    var step = route.getStep(i);
                                    s.push((i + 1) + ". " + step.getDescription());
                                    console.log(step.getPosition().lng + " " + step.getPosition().lat);
                                    addAttractionToArray(step.getPosition().lng, step.getPosition().lat);
                                }
                            }
                            addMarkerToMap();
                        }
                    }
                };
                var driving = new BMap.DrivingRoute(map, options);
                driving.search("复旦大学", "世纪公园");
                //driving.search(start, end);
            }
        });

        function initAttractions(){
            attractions = [
                {
                    "id": 1,
                    "lng": 121.560242,
                    "lat": 31.216313,
                    "name": "田添星1号基地",
                    "information": "欢迎来到田添星1号基地。",
                    "type": "上海近代公园"
                },
                {
                    "id": 2,
                    "lng": 121.560242,
                    "lat": 31.226313,
                    "name": "田添星2号基地",
                    "information": "欢迎来到田添星2号基地。",
                    "type": "上海近代公园"
                },
                {
                    "id": 3,
                    "lng": 121.560242,
                    "lat": 31.236313,
                    "name": "田添星3号基地",
                    "information": "欢迎来到田添星3号基地。",
                    "type": "上海近代公园"
                },
                {
                    "id": 4,
                    "lng": 121.560242,
                    "lat": 31.246313,
                    "name": "田添星4号基地",
                    "information": "欢迎来到田添星4号基地。",
                    "type": "上海工业基地"
                },
                {
                    "id": 5,
                    "lng": 121.560242,
                    "lat": 31.256313,
                    "name": "田添星5号基地",
                    "information": "欢迎来到田添星5号基地。",
                    "type": "上海工业基地"
                }
            ];
        }
        function addAttractionToArray(lng, lat){
            var l = attractions.length;
            for (var i = 0; i < l; i++){
                var attractionlng = attractions[i].lng;
                var attractionlat = attractions[i].lat;

                var x = Math.abs(lng - attractionlng);
                var y = Math.abs(lat - attractionlat);

                //console.log(Math.sqrt(x*x + y*y));
                if (Math.sqrt(x*x + y*y) < 1){
                    //将合适的合适景点添加到数组中
                    var ll = array.length;
                    var ff = 0;
                    for (var ii = 0; ii < ll; ii++){
                        if (array[ii].id == attractions[i].id){
                            ff = 1;
                            break;
                        }
                    }
                    if (ff == 0){
                        var obj = {
                            "id": attractions[i].id,
                            "lng": attractions[i].lng,
                            "lat": attractions[i].lat,
                            "name": attractions[i].name,
                            "information": attractions[i].information,
                            "type": attractions[i].type
                        }
                        array.push(obj);
                    }
                }
            }
        }
        function addMarkerToMap(){
            console.log(array);
            var l = array.length;
            for (var i = 0; i < l; i++){
                var point = new BMap.Point(array[i].lng, array[i].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                addClickHandler(marker, array[i].id, array[i].name);
            }
            function addClickHandler(marker, id, name){
                marker.addEventListener("click",function(e){
                    openInfo(e, id, name);
                    $scope.id = id;
                    $("#temp").css("display","block");
                    console.log(id);
                });
            }
            function openInfo(e, id, name){
                attractionId = id;
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var content = "";
                var opts = {
                    width : 50,     // 信息窗口宽度
                    height: 25,     // 信息窗口高度
                    title : "ID - Name" , // 信息窗口标题
                    enableMessage:false//设置允许信息窗发送短息
                };
                var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                map.openInfoWindow(infoWindow, point); //开启信息窗口
                map.closeInfoWindow(infoWindow);
                infoWindow.addEventListener("close", function(){
                    $("#temp").css("display","none");
                });
            }
        }

        $scope.clickHref = function() {
            console.log("...");
            // window.location.href="http://email.163.com/";
        }
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
        $scope.response = {
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
            "rating_percentage_1": 10,
            "rating_percentage_2": 20,
            "rating_percentage_3": 30,
            "rating_percentage_4": 15,
            "rating_percentage_5": 25,
            "rating5": "100",
            "rating4": "80",
            "rating3": "60",
            "rating2": "20",
            "rating1": "10",
            "type": "上海工业遗址",
            "comment": [
                {
                    "user": "user-a",
                    "comment": "这是user-a的评论"
                },
                {
                    "user": "user-b",
                    "comment": "这是user-b的评论"
                },
                {
                    "user": "user-c",
                    "comment": "这是user-c的评论"
                },
                {
                    "user": "user-d",
                    "comment": "这是user-d的评论"
                }
            ]
        };
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
        $scope.rating = "";
        $scope.content = "";
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
            $scope.rating = rating;
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
                    var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/" + type + ".png";
                    var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33,27));
                    var marker = new BMap.Marker(new BMap.Point(lng, lat),{icon:myIcon});
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
                var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/" + type + ".png";
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33,27));
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
 