angular.module('app.controllers', [])

    .controller('listController', function ($scope, $rootScope) {
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
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.list";
        });
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.list";
        });
    })

    .controller('nearbyController', function ($scope, $rootScope) {
        $scope.showList = false;
        $scope.selectAtrraction = [];
        var attractionsType = [];
        var types = [false, false];
        var map;
        var id;
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.nearby";
        });
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.nearby";
            console.log("123");
            var x1, y1, x2, y2;
            map = new BMap.Map("allmap1");
            console.log(map);// 创建Map实例
            map.centerAndZoom(new BMap.Point(121.480233, 31.236313), 12);
            map.enableScrollWheelZoom();// 启用滚轮放大缩小
            initAttractions();
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
            attractionsType = [
                {
                    "type": "上海工业遗址1",
                    "attractions": [
                        {
                            "id": "1",
                            "lng": "121.470233",
                            "lat": "31.236313",
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
                            "lng": "121.470233",
                            "lat": "31.246313",
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
                            "lng": "121.480233",
                            "lat": "31.236313",
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
                            "lng": "121.480233",
                            "lat": "31.246313",
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
            $scope.attractionsType = attractionsType;
        }

        function showType(type) {
            var l = attractionsType[type].attractions.length;
            for (var i = 0; i < l; i++) {
                $scope.selectAtrraction.push(attractionsType[type].attractions[i]);
                var point = new BMap.Point(attractionsType[type].attractions[i].lng, attractionsType[type].attractions[i].lat);
                var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/bmarker" + type + ".png";
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33, 27));
                var marker = new BMap.Marker(point, {icon: myIcon});
                map.centerAndZoom(point, 12);
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
            document.getElementById("nearbyAttractionScore").innerHTML = "评分：" + score;
            document.getElementById("nearbyAttractionInformation").innerHTML = information;
        }
    })

    .controller('historyController', function ($scope, $rootScope) {
        $scope.$on("$ionicView.loaded", function () {
            $rootScope.name = "main.history";
        });
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.history";
        });
        var allAttractionArray = ['b0', 'b12', 'b22', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b2', 'abd', 'ab',
            'acd', 'accd', 'b1', 'cd', 'ccd', 'cbcv', 'cxf', '复旦大学', '张江大学', '世纪公园', '中山公园'];
        var autoComplete = new AutoComplete('search', 'autocomplete', allAttractionArray);
        document.getElementById("search").onkeyup = function () {
            autoComplete.start(event);
        }
    })

    .controller('routeController', function ($scope, $rootScope) {
        $scope.id = "1231354";
        var num = 0;
        var marker;
        var attractions;
        var array = new Array();
        var map;
        var attractionId = -1;
        $scope.showDetail = true;
        $scope.cancel = function () {
            console.log("display: none");
            //$scope.showDetail = false;
            document.getElementById("temp").style.display = "none";
        };
        $scope.$on("$ionicView.enter", function () {
            $rootScope.name = "main.route";
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
                var start = document.getElementById("routeStart").value;
                var end = document.getElementById("routeEnd").value;
                var options = {
                    renderOptions: {map: map, autoViewport: true},
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
                driving.search("复旦大学", "世纪公园");
                //driving.search(start, end);
            }
        });

        function initAttractions() {
            attractions = [
                {
                    "id": 1,
                    "lng": 121.560242,
                    "lat": 31.216313,
                    "name": "田添星1号基地",
                    "information": "欢迎来到田添星1号基地。",
                    "score": 4.5,
                    "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
                    "type": "上海近代公园"
                },
                {
                    "id": 2,
                    "lng": 121.560242,
                    "lat": 31.226313,
                    "name": "田添星2号基地",
                    "information": "欢迎来到田添星2号基地。",
                    "score": 4.5,
                    "imageURL": "http://photocdn.sohu.com/20160629/Img456799876.jpg",
                    "type": "上海近代公园"
                },
                {
                    "id": 3,
                    "lng": 121.560242,
                    "lat": 31.236313,
                    "name": "田添星3号基地",
                    "information": "欢迎来到田添星3号基地。",
                    "score": 4.5,
                    "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
                    "type": "上海近代公园"
                },
                {
                    "id": 4,
                    "lng": 121.560242,
                    "lat": 31.246313,
                    "name": "田添星4号基地",
                    "information": "欢迎来到田添星4号基地。",
                    "score": 4.5,
                    "imageURL": "http://photocdn.sohu.com/20160629/Img456799876.jpg",
                    "type": "上海工业基地"
                },
                {
                    "id": 5,
                    "lng": 121.560242,
                    "lat": 31.256313,
                    "name": "田添星5号基地",
                    "information": "欢迎来到田添星5号基地。",
                    "score": 4.5,
                    "imageURL": "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
                    "type": "上海工业基地"
                }
            ];
        }

        function addAttractionToArray(lng, lat) {
            var l = attractions.length;
            for (var i = 0; i < l; i++) {
                var attractionlng = attractions[i].lng;
                var attractionlat = attractions[i].lat;

                var x = Math.abs(lng - attractionlng);
                var y = Math.abs(lat - attractionlat);

                //console.log(Math.sqrt(x*x + y*y));
                if (Math.sqrt(x * x + y * y) < 1) {
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
                            "score": attractions[i].score,
                            "imageURL": attractions[i].imageURL,
                            "type": attractions[i].type
                        }
                        array.push(obj);
                    }
                }
            }
        }

        function addMarkerToMap() {
            console.log(array);
            var l = array.length;
            for (var i = 0; i < l; i++) {
                var point = new BMap.Point(array[i].lng, array[i].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                addClickHandler(marker, array[i].id, array[i].name, array[i].score, array[i].imageURL);
            }
            function addClickHandler(marker, id, name, score, imageURL) {
                marker.addEventListener("click", function (e) {
                    openInfo(e, id, name);
                    $scope.id = id;
                    setMessageCard(id, name, score, imageURL);
                    //$scope.showDetail = true;
                    document.getElementById("temp").style.display = "block";
                    console.log(document.getElementById("temp"));
                    console.log(id);
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
                document.getElementById("attractionScore").innerHTML = "评分：" + score;
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

    .controller('surveyController', function ($scope) {

    })

    .controller('viewTabController', function ($scope, $stateParams, $state,$rootScope) {
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
        $scope.myGoBack = function () {
            console.log("!23");
            $state.go($rootScope.name);
        };
    })

    .controller('detailController', function ($scope, $stateParams, $ionicHistory, $state) {
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
            "rating5": 10,
            "rating4": 20,
            "rating3": 30,
            "rating2": 15,
            "rating1": 25,
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
        $scope.id = 0;
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $scope.popover.hide();
            var id = parseInt($stateParams.id, 10);
            $scope.id = id;
            console.log("id = " + id);
        });
        /*$scope.$on('$ionicView.enter', function() {
         $state.go($state.current, {}, {reload: true});
         });*/
        var map;
        $scope.$on('$ionicView.enter', function () {
            map = new BMap.Map("" + $scope.id);
            console.log(map);
            console.log("map = " + $scope.id);
            //map.centerAndZoom(new BMap.Point(121.558562, 31.221671), 18);
            map.reset();
            map.enableScrollWheelZoom();

            addMarker($scope.id);
            addPloygon($scope.id);

            function addMarker(id) {
                var point = new BMap.Point(121.558562, 31.221671);
                map.centerAndZoom(point, 15);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            }

            function addPloygon(id) {
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
                ], {strokeColor: "#f50704", fillColor: "", strokeWeight: 3, strokeOpacity: 0, fillOpacity: 0,});
                map.addOverlay(polygon);
            }
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

    .controller('commentController', function ($scope, $stateParams, $ionicHistory, $http) {
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

            var arr = new Array();
            var number = 0;

            function addPloygon(id) {
                $http.get("attraction.do?action=getBound&attractionId=" + id)
                    .success(function (response) {
                        console.log(response);
                        drawPolygon(response);
                    });

                function drawPolygon(message) {
                    var pointArray = message;
                    var l = pointArray.length;
                    var pointArr = new Array();
                    for (var i = 0; i < l; i++) {
                        var pointi = new BMap.Point(pointArray[i].lng, pointArray[i].lat);
                        pointArr.push(pointi);
                    }

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

            $scope.addMarker = function addMarker(type) {
                console.log("addMarker" + type);
                // marker = new BMap.Marker(point);
                var imgSrc = "http://pan01.qiniudn.com/adwebpj/img/marker/" + type + ".png";
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(33, 27));
                var marker = new BMap.Marker(point, {icon: myIcon});
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
                        console.log(response.records);
                    });
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
 