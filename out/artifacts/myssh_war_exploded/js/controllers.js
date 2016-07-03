angular.module('app.controllers', ['ngCookies'])

    .controller('menuController', function ($scope, $rootScope,$http, $cookies) {
        $scope.popoverAttractions = [];
        $http.get("attraction.do?action=getAttractions&x1=" + 0 + "&y1=" + 0 + "&x2=" + 180 + "&y2=" + 90 + "&sort=none&type=all")
            .success(function (response) {
                $scope.popoverAttractions = response;
                console.log($scope.popoverAttractions);
            });
        $scope.tab = 0;
        $scope.select = function (setTab) {
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    })

    .controller('listController', function ($scope, $rootScope,$http, $cookies, $state) {
        $rootScope.userid = $cookies.get("userId");
        $rootScope.userName = unescape($cookies.get("userName"));
        $rootScope.userHead = unescape($cookies.get("userHead"));
        $scope.data = [];
        var allAttractionArray = [];
        var allAttractionNameArray = [];
        $http.get("attraction.do?action=getAttractions&x1=" + 0 + "&y1=" + 0 + "&x2=" + 180 + "&y2=" + 90 + "&sort=none&type=all")
            .success(function (response) {
                console.log(response);
                $rootScope.popoverAttractions = response;
                $scope.data = response;
            });
        $http.get("attraction.do?action=getAttractionsName&x1=0&x2=180&y1=0&y2=90")
            .success(function (response) {
                allAttractionArray = response;
                allAttractionNameArray = [];
                for (var i = 0; i < response.length; i++) {
                    allAttractionNameArray.push(response[i].name);
                }
                var autoComplete = new AutoComplete('list_search', 'list_autocomplete', allAttractionNameArray);
                document.getElementById("list_search").onkeyup = function () {
                    autoComplete.start(event);
                };
            });
        /*$scope.data = [
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
        ];*/
        $scope.tab = 0;
        $scope.select = function (setTab) {
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.list";
            console.log("123");
            $cookies.put("backState","main.list");
        });
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.list";
        });
        $scope.search = function (searchValue1) {
            var searchValue = document.getElementById("list_search").value;
            console.log(searchValue);
            for (var i = 0; i < allAttractionArray.length; i++) {
                console.log(allAttractionArray[i].name);
                if (searchValue == allAttractionArray[i].name) {
                    $http.get("attraction.do?action=addSearch&attractionName="+searchValue)
                        .success(function (response) {
                            console.log(response);
                        });
                    $state.transitionTo('view.detail', {
                        id: allAttractionArray[i].id
                    });
                }
            }
        };
    })

    .controller('nearbyController', function ($scope, $rootScope, $http,$cookies) {
        $scope.showList = false;
        $scope.selectAtrraction = [];
        var attractionsType = [];
        var types = [false, false];
        var map;
        var id;
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.nearby";
            $cookies.put("backState","main.nearby");
        });
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.nearby";
            console.log("123");
            var x1, y1, x2, y2;
            map = new BMap.Map("allmap1");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(121.480233, 31.236313), 11);
            map.enableScrollWheelZoom();// 启用滚轮放大缩小
            initAttractions();

            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(8, 100),
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
            });
            map.addControl(navigationControl);
            // 添加定位控件
            var geolocationControl = new BMap.GeolocationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(8, 60)
            });
            geolocationControl.addEventListener("locationSuccess", function(e){
                // 定位成功事件
                console.log(e);
                map.clearOverlays();
                var address = '';
                address += e.addressComponent.province;
                address += e.addressComponent.city;
                address += e.addressComponent.district;
                address += e.addressComponent.street;
                address += e.addressComponent.streetNumber;
                startPoint = new BMap.Point(e.point.lng, e.point.lat);
                console.log(start);
            });
            geolocationControl.addEventListener("locationError",function(e){
                // 定位失败事件
                alert(e.message);
            });
            map.addControl(geolocationControl);
        });
        $scope.search = function () {
            console.log("search");
            var value = document.getElementById("nearbySearch").value;
            var local = new BMap.LocalSearch(map, {
                renderOptions: {map: map}
            });
            local.search(value);
        };
        $scope.changeType = function (type) {
            types[type] = !types[type];
            $scope.showList = types[0] || types[1];
            if (types[type] == true) {
                map.clearOverlays();
                $scope.selectAtrraction = [];
                showType(type);
                if (types[1 - type] == true) {
                    showType(1 - type);
                }
            } else {
                map.clearOverlays();
                $scope.selectAtrraction = [];
                if (types[1 - type] == true) {
                    showType(1 - type);
                }
            }
        };
        $scope.jumpTodetail = function () {
            console.log("jumpToDetail");
            document.getElementById("attractionCard").style.display = "none";
            location.href = "index.html#/view/" + id + "/detail";
        };
        $scope.cancelToJump = function () {
            console.log("cancelDetail");
            document.getElementById("attractionCard").style.display = "none";
        };

        function initAttractions() {
            $http.get("attraction.do?action=getAttractions&x1=" + 0 + "&y1=" + 0 + "&x2=" + 180 + "&y2=" + 90 + "&sort=null&type=all")
                .success(function (response) {
                    console.log(response);
                    attractionsType = response;
                    $scope.attractionsType = response;

                });
        }
        function showType(type) {
            var l = attractionsType[type].attractions.length;
            for (var i = 0; i < l; i++) {
                $scope.selectAtrraction.push(attractionsType[type].attractions[i]);
                var point = new BMap.Point(attractionsType[type].attractions[i].lng, attractionsType[type].attractions[i].lat);
                var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/bmarker" + type + ".png";
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33, 27));
                var marker = new BMap.Marker(point, {icon: myIcon});
                map.centerAndZoom(point, 11);
                map.addOverlay(marker);
                addClickHandler(attractionsType[type].attractions[i].id, attractionsType[type].attractions[i].name, attractionsType[type].attractions[i].rating, attractionsType[type].attractions[i].information, marker);
            }
            function addClickHandler(attractionid, title, rating, information, marker) {
                marker.addEventListener("click", function (e) {
                    id = attractionid;
                    openInfo(title, rating, information, e);
                    setAttractionCard(title, rating, information);
                    document.getElementById("attractionCard").style.display = "block";
                });
            }

            function openInfo(title, rating, information, e) {
                var opts = {
                    width: 250,     // 信息窗口宽度
                    height: 80,     // 信息窗口高度
                    title: title, // 信息窗口标题
                    enableMessage: true//设置允许信息窗发送短息
                };
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var content = rating + "<br>" + information;
                var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
                map.openInfoWindow(infoWindow, point); //开启信息窗口
                map.closeInfoWindow(infoWindow);
            }
        }

        function setAttractionCard(name, score, information) {
            document.getElementById("nearbyAttractionName").innerHTML = name;
            document.getElementById("nearbyAttractionScore").innerHTML = "评分：" + score.toFixed(2);
        }
    })

    .controller('historyController', function ($scope, $rootScope, $http, $state,$cookies) {
        var allAttractionNameArray = [];
        var allAttractionArray = [];
        $scope.$on("$ionicView.beforeEnter", function () {
            $http.get("attraction.do?action=getSearch&limit=4")
                .success(function (response) {
                    $scope.history = response;
                });
            $http.get("attraction.do?action=getAttractionsName&x1=0&x2=180&y1=0&y2=90")
                .success(function (response) {
                    allAttractionArray = response;
                    allAttractionNameArray = [];
                    for (var i = 0; i < response.length; i++) {
                        allAttractionNameArray.push(response[i].name);
                    }
                    var autoComplete = new AutoComplete('search', 'autocomplete', allAttractionNameArray);
                    document.getElementById("search").onkeyup = function () {
                        autoComplete.start(event);
                    };
                });
        });
        /*var allAttractionArray = ['b0', 'b12', 'b22', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b2', 'abd', 'ab',
         'acd', 'accd', 'b1', 'cd', 'ccd', 'cbcv', 'cxf', '复旦大学', '张江大学', '世纪公园', '中山公园'];*/
        $scope.search = function (searchValue1) {
            var searchValue = document.getElementById("search").value;
            console.log(searchValue);

            for (var i = 0; i < allAttractionArray.length; i++) {

                console.log(allAttractionArray[i].name);
                if (searchValue == allAttractionArray[i].name) {
                    $http.get("attraction.do?action=addSearch&attractionName="+searchValue)
                        .success(function (response) {
                            console.log(response);

                        });
                    $state.transitionTo('view.detail', {
                        id: allAttractionArray[i].id
                    });
                }
            }
        };
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.history";
        });
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.history";
            $cookies.put("backState","main.history");
        });
    })

    /*.controller('routeController', function ($scope, $rootScope) {
//添加百度地图调用信息
        function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("allmap123");
        map.centerAndZoom("上海",12);                   // 初始化地图,设置城市和地图级别。

        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
                ,"location" : map
            });

        var geolocationControl = new BMap.GeolocationControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            offset: new BMap.Size(8, 35),
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

        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);


        console.log(ac);

        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            console.log(e);
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

            setPlace();
        });

        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }
    })*/
    .controller('routeController', function ($scope, $rootScope, $http,$cookies) {
        $scope.id = "1231354";
        $scope.routeAttraction = {};
        var num = 0;
        var marker;
        var attractions;
        var array = new Array();
        var map;
        var attractionId = -1;

        function G(id) {
            return document.getElementById(id);
        }
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId",
                "location" : map
            });
        var ac_2 = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId_2",
                "location" : map
            });

        console.log(ac);

        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            console.log(e);
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });
        ac_2.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            console.log(e);
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel_2").innerHTML = str;
        });

        var myValue;
        /*ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

            setPlace();
        });
        ac_2.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel_2").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            setPlace();
        });*/

        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

        $scope.showDetail = true;
        $scope.cancel = function () {
            console.log("display: none");
            //$scope.showDetail = false;
            document.getElementById("temp").style.display = "none";
        };
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.route";
            $cookies.put("backState","main.route");
        });
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.route";
            console.log("123");
            var x1, y1, x2, y2;
            map = new BMap.Map("allmap2");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(121.480233, 31.236313), 12);
            map.enableScrollWheelZoom();                 // 启用滚轮放大缩小
            initAttractions();

            document.getElementById("routeSearch").onclick = function () {
                map.clearOverlays();
                var start = document.getElementById("suggestId").value;
                var end = document.getElementById("suggestId_2").value;
                var options = {
                    renderOptions: {map: map, autoViewport: true, selectFirstResult: true},
                    onSearchComplete: function (results) {
                        if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                            // 获取第一条方案
                            var plan = results.getPlan(0);
                            // 获取方案的驾车线路
                            var route = plan.getRoute(0);
                            // 获取每个关键步骤,并输出到页面
                            var s = [];
                            for (var j = 0; j < plan.getNumRoutes(); j++) {
                                var route = plan.getRoute(j);
                                console.log(plan.getNumRoutes());
                                for (var i = 0; i < route.getNumSteps(); i++) {
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
                driving.search(start, end);
                //driving.search(start, end);
            }
        });

        function initAttractions() {

            $http.get("attraction.do?action=route&x1=" + 0 + "&y1=" + 0 + "&x2=" + 180 + "&y2=" + 90)
                .success(function (response) {
                    console.log(response);
                    attractions = response;
                });

            // attractions = [
            //     {
            //         "id": 1,
            //         "lng": 121.560242,
            //         "lat": 31.216313,
            //         "name": "田添星1号基地",
            //         "information": "欢迎来到田添星1号基地。",
            //         "rating": 4.5,
            //         "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
            //         "type": "上海近代公园"
            //     },
            //     {
            //         "id": 2,
            //         "lng": 121.560242,
            //         "lat": 31.226313,
            //         "name": "田添星2号基地",
            //         "information": "欢迎来到田添星2号基地。",
            //         "rating": 4.5,
            //         "imageURL": "http://photocdn.sohu.com/20160629/Img456799876.jpg",
            //         "type": "上海近代公园"
            //     },
            //     {
            //         "id": 3,
            //         "lng": 121.560242,
            //         "lat": 31.236313,
            //         "name": "田添星3号基地",
            //         "information": "欢迎来到田添星3号基地。",
            //         "rating": 4.5,
            //         "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
            //         "type": "上海近代公园"
            //     },
            //     {
            //         "id": 4,
            //         "lng": 121.560242,
            //         "lat": 31.246313,
            //         "name": "田添星4号基地",
            //         "information": "欢迎来到田添星4号基地。",
            //         "rating": 4.5,
            //         "imageURL": "http://photocdn.sohu.com/20160629/Img456799876.jpg",
            //         "type": "上海工业基地"
            //     },
            //     {
            //         "id": 5,
            //         "lng": 121.560242,
            //         "lat": 31.256313,
            //         "name": "田添星5号基地",
            //         "information": "欢迎来到田添星5号基地。",
            //         "rating": 4.5,
            //         "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
            //         "type": "上海工业基地"
            //     }
            // ];
        }

        function addAttractionToArray(lng, lat) {
            var l = attractions.length;
            for (var i = 0; i < l; i++) {
                var attractionlng = attractions[i].lng;
                var attractionlat = attractions[i].lat;

                var x = Math.abs(lng - attractionlng);
                var y = Math.abs(lat - attractionlat);

                //console.log(Math.sqrt(x*x + y*y))
                if (Math.sqrt(x * x + y * y) < 0.04) {
                    //将合适的合适景点添加到数组中
                    var ll = array.length;
                    var ff = 0;
                    for (var ii = 0; ii < ll; ii++) {
                        if (array[ii].id == attractions[i].id) {
                            ff = 1;
                            break;
                        }
                    }
                    if (ff == 0) {
                        var obj = {
                            "id": attractions[i].id,
                            "lng": attractions[i].lng,
                            "lat": attractions[i].lat,
                            "name": attractions[i].name,
                            "information": attractions[i].information,
                            "rating": attractions[i].rating,
                            "imageURL": attractions[i].imageURL,
                            "type": attractions[i].type
                        }
                        array.push(obj);
                    }
                }
            }
        }

        function addMarkerToMap() {
            //console.log(array);
            var l = array.length;
            for (var i = 0; i < l; i++) {
                var point = new BMap.Point(array[i].lng, array[i].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                addClickHandler(marker, array[i].id, array[i].name, array[i].rating, 'img/' + array[i].id + '.png');
            }
            function addClickHandler(marker, id, name, score, imageURL) {
                marker.addEventListener("click", function (e) {
                    openInfo(e, id, name);

                    // for (var i = 0; i < array.l; i++) {
                    //     if (array[i].id = id) {
                    //         $scope.routeAttraction = array[i];
                    //         console.log(array[i]);
                    //     }
                    // }

                    console.log(id + "\n" + name + "\n" + score + "\n" + imageURL);
                    setMessageCard(id, name, score, imageURL);
                    document.getElementById("temp").style.display = "block";
                    console.log(array);
                });
            }

            function openInfo(e, id, name) {
                attractionId = id;
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                var content = "";
                var opts = {
                    width: 300,     // 信息窗口宽度
                    height: 300,     // 信息窗口高度
                    title: "ID - Name", // 信息窗口标题
                    enableMessage: false//设置允许信息窗发送短息
                };
                var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
                map.openInfoWindow(infoWindow, point); //开启信息窗口
                map.closeInfoWindow(infoWindow);
                // infoWindow.addEventListener("close", function () {
                //     $scope.showDetail = false;
                //     document.getElementById("temp").style.display = "block";
                // });
            }

            function setMessageCard(id, name, score, imageURL) {
                document.getElementById("attractionName").innerHTML = name;
                document.getElementById("attractionScore").innerHTML = "评分：" + score.toFixed(2);
                document.getElementById("attractionImage").src = imageURL;
                document.getElementById("pageJump").onclick = function () {
                    console.log("pageJump");
                    location.href = "index.html#/view/" + id + "/detail";
                }
            }
        }

        $scope.clickHref = function () {
            console.log("...");
            // window.location.href="http://email.163.com/";
        }
    })

    .controller('surveyController', function ($scope, $ionicSideMenuDelegate, $state, $stateParams) {
        $scope.submit = function () {
            $state.transitionTo('view.comment', {
                id: parseInt($stateParams.id, 10)
            });
        };
        $scope.cancel = function () {
            $state.transitionTo('view.comment', {
                id: parseInt($stateParams.id, 10)
            });
        };
    })

    .controller('viewTabController', function ($scope, $stateParams, $state,$rootScope,$cookies) {
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
            } else if (page == 3) {
                $state.transitionTo('view.come', {
                    id: id
                });
            }
        };
        $scope.myGoBack = function () {
            console.log("!23");
            $state.go($cookies.get("backState"));
            //$state.go($rootScope.name);
        };
    })

    .controller('detailController', function ($scope, $stateParams, $ionicHistory, $state,$http, $sce) {
        $scope.response = {};
        $scope.id = 0;
        $scope.id = 0;
        $scope.display3D = false;
        var map;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
            var id = parseInt($stateParams.id, 10);
            $scope.id = id;
            console.log("id = " + id);
            $http.get("attraction.do?action=getAttraction&attractionId="+parseInt($stateParams.id, 10))
                .success(function (response) {
                    map = new BMap.Map("" + $scope.id);
                    console.log(map);
                    console.log("map = " + $scope.id);
                    //map.centerAndZoom(new BMap.Point(121.558562, 31.221671), 18);
                    map.reset();
                    map.enableScrollWheelZoom();

                    console.log(response);
                    $scope.response = response;

                    addMarker($scope.response);
                    addPloygon($scope.response);
                });
            $http.get("attraction.do?action=getRating&attractionId="+parseInt($stateParams.id, 10))
                .success(function (response) {
                    $scope.comments = response;
                });
        });

        $scope.$on('$ionicView.enter', function () {
            $scope.show3D = function (jsonURL) {
                console.log(jsonURL);
                $scope.display3D = true;
                console.log("123");
                document.getElementById("3d").innerHTML="";
                var container, stats;
            var camera, scene, projector, renderer;
            var mesh, mixer;
            init();
            animate();
            function init() {
                camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.y = 300;
                camera.target = new THREE.Vector3(0, 150, 0);
                scene = new THREE.Scene();
                //
                var light = new THREE.DirectionalLight(0xefefff, 1.5);
                light.position.set(1, 1, 1).normalize();
                scene.add(light);
                var light = new THREE.DirectionalLight(0xffefef, 1.5);
                light.position.set(-1, -1, -1).normalize();
                scene.add(light);
                var loader = new THREE.JSONLoader();
                loader.load(jsonURL, function (geometry) {
                    mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                        vertexColors: THREE.FaceColors,
                        morphTargets: true
                    }));
                    mesh.scale.set(1.5, 1.5, 1.5);
                    scene.add(mesh);
                    mixer = new THREE.AnimationMixer(mesh);
                    var clip = THREE.AnimationClip.CreateFromMorphTargetSequence('gallop', geometry.morphTargets, 30);
                    mixer.clipAction(clip).setDuration(1).play();
                });
                //
                renderer = new THREE.WebGLRenderer();
                renderer.setClearColor(0xf0f0f0);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerWidth);
                document.getElementById('3d').appendChild(renderer.domElement);
                //
                window.addEventListener('resize', onWindowResize, false);
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            //
            function animate() {
                requestAnimationFrame(animate);
                render();
            }

            var radius = 600;
            var theta = 0;
            var prevTime = Date.now();

            function render() {
                theta += 0.5;
                camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
                camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
                camera.lookAt(camera.target);
                if (mixer) {
                    var time = Date.now();
                    mixer.update(( time - prevTime ) * 0.001);
                    prevTime = time;
                }
                renderer.render(scene, camera);
            }
        }
        });
        function addMarker(response) {
            var point = new BMap.Point(response.lng, response.lat);
            map.centerAndZoom(point, 15);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }

        function addPloygon(response) {
            var points = new Array();
            var l = response.bounds.length;
            for (var i = 0; i < l; i++){
                var pointi = new BMap.Point(response.bounds[i].lng, response.bounds[i].lat);
                points.push(pointi);
            }

            console.log(points);
            var polygon = new BMap.Polygon(points,
                {strokeColor: "#f50704", fillColor: "", strokeWeight: 3, strokeOpacity: 0, fillOpacity: 0,});
            map.addOverlay(polygon);
        }

        $scope.add = function add(type) {
            $http.get("attraction.do?action=add"+ type + "&attractionId=" + parseInt($stateParams.id, 10))
                .success(function (response) {
                    if(response.status == 0) {
                        $scope.isWarning = false;
                        $scope.isSucess = true;
                        $scope.warning = "添加成功!";
                    }
                    else {
                        $scope.isWarning = true;
                        $scope.isSucess = false;
                        $scope.warning = "请勿重复添加!";
                    }
                });
        };
        $scope.ratingsObject = {
            iconOn: 'ion-heart',
            iconOff: 'ion-heart-broken',
            //iconOn: 'ion-android-star',
            //iconOff: 'ion-android-star-outline',
            iconOnColor: 'rgb(237, 45, 45)',//'rgb(56, 126, 245)',  //Optional
            iconOffColor: 'rgb(122, 122, 122)',    //Optional
            rating: 3, //Optional
            minRating: 1,    //Optional
            readOnly: false, //Optional
            callback: function (rating) {    //Mandatory
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
        $scope.rating = 3;
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
            iconOffColor: 'rgb(122, 122, 122)',    //Optional
            rating: 3, //Optional
            minRating: 1,    //Optional
            readOnly: true, //Optional
            callback: function (rating) {    //Mandatory
                $scope.ratingsCallback(rating);
            }
        };
        $scope.ratingsCallback = function (rating) {
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

    .controller('commentController', function ($scope, $stateParams, $ionicHistory, $http, $state) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
        });

        $scope.goSurvey = function() {
            $state.transitionTo('survey', {
                id: id
            });
        };
        var id = parseInt($stateParams.id, 10);
        $scope.id = id;
        console.log("id = " + id);
        var map;
        var attractionPoint;

        var arr = new Array();
        var number = 0;
        $scope.$on("$ionicView.loaded", function () {
            map = new BMap.Map("allMap4");
            var point = new BMap.Point(121.558562, 31.221671);
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom();

            addPloygon(id);
            initMarkers(id);

            function addPloygon(id) {
                $http.get("attraction.do?action=getAttraction&attractionId=" + id)
                    .success(function (response) {
                        drawPolygon(response);
                    });

                function drawPolygon(message) {
                    var l = message.bounds.length;
                    var pointArr = new Array();
                    for (var i = 0; i < l; i++) {
                        var pointi = new BMap.Point(message.bounds[i].lng, message.bounds[i].lat);
                        pointArr.push(pointi);
                    }
                    var lng = message.lng;
                    var lat = message.lat;
                    attractionPoint = new BMap.Point(lng, lat);
                    map.centerAndZoom(attractionPoint, 15);
                    console.log(pointArr);

                    var polygon = new BMap.Polygon(pointArr, {
                        strokeColor: "#f50704",
                        fillColor: "",
                        strokeWeight: 3,
                        strokeOpacity: 0,
                        fillOpacity: 0,
                    });
                    map.addOverlay(polygon);
                }

            }

            function initMarkers(id) {
                $http.get("attraction.do?action=getMarker&attractionId=" + id)
                    .success(function (response) {
                        console.log(response);
                        getMarkerMessage(response);
                    });

                function getMarkerMessage(message) {
                    var array = message;
                    var l = array.length;

                    for (var i = 0; i < l; i++) {
                        var lng = array[i].lng;
                        var lat = array[i].lat;
                        var type = array[i].type;
                        var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/" + type + ".png";
                        var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33, 27));
                        var marker = new BMap.Marker(new BMap.Point(lng, lat), {icon: myIcon});
                        map.addOverlay(marker);
                        marker.disableDragging();
                        if (type == 15 || type == 16) {
                            var label = new BMap.Label(array[i].text, {offset: new BMap.Size(20, -10)});
                            marker.setLabel(label);
                        }
                    }
                }
            }

            //提交
            document.getElementById("saveCommentAndReturn").onclick = function () {
                //attraction.do?action=addMarker&attractionId=1&lat=1.1,2.2&lng=1.2,2.3&type=11,7&label=体育馆,
                var attractionId = id;
                var lat = "";
                var lng = "";
                var type = "";
                var label = "";
                for (var i = 0; i < number; i++) {
                    lat = lat + "," + arr[i].lat;
                    lng = lng + "," + arr[i].lng;
                    label = label + "," + arr[i].text;
                    type = type + "," + arr[i].type;
                }
                number = 0;
                arr.length = 0;
                $http.get("attraction.do?action=addMarker&attractionId=" + attractionId + "&lat=" + lat + "&lng=" + lng + "&type=" + type + "&label=" + label)
                    .success(function (response) {
                        console.log(response);
                    });
            }
        });

        $scope.addMarker = function addMarker(type) {
            console.log("addMarker" + type);
            // marker = new BMap.Marker(point);
            var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/" + type + ".png";
            var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33, 27));
            var marker = new BMap.Marker(attractionPoint, {icon: myIcon});
            map.addOverlay(marker);
            marker.enableDragging();

            var text = "";
            if (type == 15) {
                text = document.getElementById("commentTypeInput1").value;
                document.getElementById("commentTypeInput1").value = "";
                var label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label);
            }
            if (type == 16) {
                text = document.getElementById("commentTypeInput2").value;
                document.getElementById("commentTypeInput2").value = "";
                var label = new BMap.Label(text, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label);
            }

            marker.addEventListener("dragend", function () {
                marker.disableDragging();
                var obj = {
                    "type": type,
                    "lng": marker.getPosition().lng,
                    "lat": marker.getPosition().lat,
                    "text": text
                };
                arr.push(obj);
                number++;
                console.log(number);
            });
        };

        $scope.$on("$ionicView.beforeLeave", function () {
            //$ionicHistory.removeBackView();
            //$ionicHistory.clearHistory();
            //$ionicHistory.clearCache();
        });
    })

    .controller('indexController', function ($scope, $ionicSideMenuDelegate) {
        //var userName = $cookieStore.get("userName");
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });
    })

    .controller('signupController', function ($scope, $ionicSideMenuDelegate,$state) {
        var default_img = "images/add.png";

        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });

        function change(){
            console.log("change");
        }
        $scope.change = function(){
            console.log("scope change");
        }

        $scope.$on("$ionicView.loaded", function () {
            urlPrepare();

            console.log(document.getElementById("mask-file1"));
            document.getElementById("mask-file1").onclick = function(){
                document.getElementById("image1").click();
            }

            $("#image1").change(function(e){
                var file = document.getElementById("image1");
                if(file.files &&file.files[0]){
                    document.getElementById("mask-file1").firstChild.src = window.URL.createObjectURL(file.files[0]);
                }
            });
            $("#mask-file1 img").load(function(){
                refreshImgRegion();
            });
            refreshImgRegion();
            document.getElementById("upload_target").load(function(){
                var responseData = this.contentDocument.body.textContent ||
                    this.contentWindow.document.body.textContent;

                alert(responseData);

                if (responseData == "Success!"){
                    alert("Success.");
                    $state.go('main.list');

                }
                else if (responseData == "Failed!") {
                    $state.go('main.list');

                    //document.getElementById("password-result").innerHTML = "用户名已存在！";
                    var alertPopup  = $ionicPopup.alert({
                        title: '抱歉',
                        template: "用户名已存在！"
                    });
                    alertPopup.then(function(res) {
                    });
                }
                else {
                    $state.go('main.list');

                    //document.getElementById("password-result").innerHTML = "网络错误！";
                    var alertPopup  = $ionicPopup.alert({
                        title: '抱歉',
                        template: "网络错误！"
                    });
                    alertPopup.then(function(res) {
                    });
                }
            });
        });

        $scope.signUp = function () {
            console.log("signup");
            var account = document.getElementById("signup-account").value;
            var username = document.getElementById("signup-username").value;
            var password = document.getElementById("signup-password").value;
            var password2 = document.getElementById("signup-password2").value;

            if (username == "" || password == "" || password2 == ""){
                document.getElementById("password-result").innerHTML = "用户名或密码不能为空！";
                return ;
            }
            if (password != password2){
                document.getElementById("password-result").innerHTML = "两次输入的密码不相同！";
                return ;
            }

            var image = document.getElementById("image1").value;
            document.getElementById("signup-form-account").value = account;
            document.getElementById("signup-form-username").value = username;
            document.getElementById("signup-form-password").value = password;
            if(image == undefined || image == ""){
                document.getElementById("signup-form-userimage").value = default_img;
            } else {
                document.getElementById("signup-form-userimage").value = "";
            }

            console.log("account: " + document.getElementById("signup-form-account").value);
            console.log("username: " + document.getElementById("signup-form-username").value);
            console.log("password: " + document.getElementById("signup-form-password").value);
            console.log("imageURL: " + document.getElementById("signup-form-userimage").value);
            document.getElementById("signup-form").submit();
            // $state.go('main.list');

        };

        function urlPrepare(){
            document.getElementById("mask-file1").firstChild.src = default_img;
        }

        function refreshImgRegion(){
            var divHeight = document.getElementById("img-container").height();
            var img1 = document.getElementById("mask-subfile1");
            var inImg = $("div#img-container div img");

            img1.css("margin-top", (divHeight - img1.height())/2+"px");
            img1.css("margin-bottom", (divHeight - img1.height())/2+"px");
            inImg.css("padding-top", (divHeight - inImg.height())/2+"px");
            inImg.css("padding-bottom", (divHeight - inImg.height())/2+"px");
        }
    })

    .controller("comeController", function ($scope, $stateParams, $rootScope, $http){
        var map;
        var start;
        var startPoint;
        var endPoint;
        $scope.attractionLocation = {};

        function G(id) {
            return document.getElementById(id);
        }
        var ac = new BMap.Autocomplete({
            "input" : "comeInput",
            "location" : map
        });
        console.log(ac);

        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            console.log(e);
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("comeSearchResult").innerHTML = str;
        });

        var myValue;

        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

        $scope.showDetail = true;

        $scope.$on("$ionicView.loaded", function () {
            $http.get("attraction.do?action=getAttraction&attractionId=" + parseInt($stateParams.id, 10))
                .success(function (response) {
                    console.log(response);
                    $scope.attractionLocation = response;
                    console.log("123");
                    var x1, y1, x2, y2;
                    map = new BMap.Map("allmap223");
                    console.log(map);// 创建Map实例
                    map.centerAndZoom(new BMap.Point(121.480233, 31.236313), 12);
                    map.enableScrollWheelZoom();                 // 启用滚轮放大缩小

                    startPoint = new BMap.Point(121.606074, 31.197568);
                    endPoint = new BMap.Point($scope.attractionLocation.lng, $scope.attractionLocation.lat);
                    var navigationControl = new BMap.NavigationControl({
                        // 靠左上角位置
                        anchor: BMAP_ANCHOR_TOP_LEFT,
                        // LARGE类型
                        type: BMAP_NAVIGATION_CONTROL_LARGE,
                        // 启用显示定位
                        enableGeolocation: true
                    });
                    map.addControl(navigationControl);
                    // 添加定位控件
                    var geolocationControl = new BMap.GeolocationControl();
                    geolocationControl.addEventListener("locationSuccess", function(e){
                        // 定位成功事件
                        console.log(e);
                        map.clearOverlays();
                        var address = '';
                        address += e.addressComponent.province;
                        address += e.addressComponent.city;
                        address += e.addressComponent.district;
                        address += e.addressComponent.street;
                        address += e.addressComponent.streetNumber;
                        startPoint = new BMap.Point(e.point.lng, e.point.lat);
                        console.log(start);
                    });
                    geolocationControl.addEventListener("locationError",function(e){
                        // 定位失败事件
                        alert(e.message);
                    });
                    map.addControl(geolocationControl);
                });


            //var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
            //driving.search(startPoint, endPoint);



        });

        document.getElementById("comeSearch").onclick = function(){
            var start = document.getElementById("comeInput").value;


            if (start != ""){
                var myGeo = new BMap.Geocoder();
                document.getElementById("comeInput").value = "";
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(start, function(point){
                    if (point) {
                        console.log(point);
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));

                        map.clearOverlays();
                        var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
                        driving.search(point, endPoint);
                    }else{
                        alert("您选择地址没有解析到结果!");
                    }
                }, "北京市");
            } else {
                var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
                driving.search(startPoint, endPoint);
            }
        }
    })

    .controller('loginController', function ($scope, $ionicSideMenuDelegate, $ionicPopup) {
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.afterEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
        });

        $scope.$on("$ionicView.loaded", function(){
            var username;
            var zoneImage;
            var qqImage;
            var oOpts = {
                btnId: "qq-login"
            }
            var cbloginFun = function(oInfo, oOpts){
                console.log(oInfo);
                alert("QQ登陆成功。");

                username = oInfo.nickname;
                zoneImage = oInfo.figureurl_2;
                qqImage = oInfo.figureurl_qq_2;

                saveUserMessage(username, zoneImage, qqImage);
                console.log(username + " " + zoneImage + " " + qqImage);
            }
            QC.Login(oOpts, cbloginFun);
        });

        $scope.logIn = function logIn(){
            var username = document.getElementById("login-username").value;
            var password = document.getElementById("login-password").value;
            console.log(username);
            if (username == "" || password == ""){
                document.getElementById("login-result").innerHTML = "用户名或密码不能为空！";
                return ;
            }
            var xmlhttp;
            if (window.XMLHttpRequest){
                xmlhttp = new XMLHttpRequest();
            }else{
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("POST", "/user.do?action=login", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("account="+username+"&password="+password);
            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    var responseContent = xmlhttp.responseText;
                    if (responseContent.indexOf("\"status\":\"0\"")) {
                        location.href = "index.html#/main/list";
                    } else {
                        //document.getElementById("login-result").innerHTML = "用户名或密码错误！";
                        var alertPopup  = $ionicPopup.alert({
                            title: '抱歉',
                            template: "用户名或密码错误！"
                        });
                        alertPopup.then(function(res) {
                        });
                    }
                }else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
                    var alertPopup  = $ionicPopup.alert({
                        title: '抱歉',
                        template: "网络错误！"
                    });
                    alertPopup.then(function(res) {
                    });
                }
            }
        }
        $scope.qq = function() {

        }
    })

    .controller('navBarController', function ($scope, $state, $ionicPopover, $ionicSideMenuDelegate, $timeout, $http, $rootScope) {
        $scope.uiState = $state;
        $scope.animation = 'slide-in-up';
        // .fromTemplateUrl() method
        $scope.quit = function () {
            $ionicSideMenuDelegate.toggleLeft();
            $state.go('index');
        };
        $ionicPopover.fromTemplateUrl('templates/menu.html', {
            scope: $scope,
            animation: $scope.animation
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            // $http.get("attraction.do?action=getAttractions&x1=" + 0 + "&y1=" + 0 + "&x2=" + 180 + "&y2=" + 90 + "&sort=none&type=all")
            //     .success(function (response) {
            //         console.log(response);
            //         $scope.data = response;
            //         $rootScope.popoverAttractions = response;
            //     });
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

    .controller('footprintController', function ($scope, $rootScope, $state, $ionicSideMenuDelegate, $http) {
        $scope.data = [{'id':1,'name':'复旦大学'},{'id':2,'name':'张江大学'},{'id':3,'name':'浙江大学'},{'id':4,'name':'北京大学'}];
        var deleteAttraction = [];
        $http.get("attraction.do?action=getFootprint")
            .success(function (response) {
                console.log(response);
                $scope.data = response;
            });
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.beforeEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
            $ionicSideMenuDelegate.toggleLeft();
        });
        $scope.back = function() {
            $state.go($rootScope.name);
        };
        $scope.delete = function(item) {
            var deleteId = $scope.data[item].id;
            $http.get("attraction.do?action=deleteFootprint&attractionId=" + deleteId)
                .success(function (response) {
                });
            $scope.data.splice(item,1);
            //console.log($scope.data);
        }
    })

    .controller('wishController', function ($scope, $rootScope, $state, $ionicSideMenuDelegate, $http) {
        $scope.data = [{'id':1,'name':'复旦大学'},{'id':2,'name':'张江大学'},{'id':3,'name':'浙江大学'},{'id':4,'name':'北京大学'}];
        var deleteAttraction = [];
        $http.get("attraction.do?action=getWish")
            .success(function (response) {
                console.log(response);
                $scope.data = response;
            });
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.beforeEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
            $ionicSideMenuDelegate.toggleLeft();
        });
        $scope.back = function() {
            $state.go($rootScope.name);
        };
        $scope.delete = function(item) {
            var deleteId = $scope.data[item].id;
            $http.get("attraction.do?action=deleteWish&attractionId=" + deleteId)
                .success(function (response) {
                });
            $scope.data.splice(item,1);
            //console.log($scope.data);
        }
    })

    .controller('favorController', function ($scope, $rootScope, $state, $ionicSideMenuDelegate, $http) {
        $scope.data = [{'id':1,'name':'复旦大学'},{'id':2,'name':'张江大学'},{'id':3,'name':'浙江大学'},{'id':4,'name':'北京大学'}];
        var deleteAttraction = [];
        $http.get("attraction.do?action=getFavor")
            .success(function (response) {
                console.log(response);
                $scope.data = response;
            });
        $scope.$on("$ionicView.beforeLeave", function () {
            $ionicSideMenuDelegate.canDragContent(true);
        });
        $scope.$on("$ionicView.beforeEnter", function () {
            $ionicSideMenuDelegate.canDragContent(false);
            $ionicSideMenuDelegate.toggleLeft();
        });
        $scope.back = function() {
            $state.go($rootScope.name);
        };
        $scope.delete = function(item) {
            var deleteId = $scope.data[item].id;
            $http.get("attraction.do?action=deleteFavor&attractionId=" + deleteId)
                .success(function (response) {
                });
            $scope.data.splice(item,1);
            //console.log($scope.data);
        }
    });
 