var key = "AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";
var requestDefault = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&';
var search = angular.module('search',[]);
search.controller('allSearch', ['$scope', "$log",
    function ($scope) {
        $scope.searchByWord =  function () {
            var request = requestDefault;
            $scope.noMaxResults = false;
            $scope.noSearchWord = false;
            $scope.showResults = false;
            $scope.requestResults = "";
            var parameter = "";
            if(document.getElementById("searchWord").value == 0) {
                $scope.noSearchWord = true;
                return 0;
            }
            else
                parameter = "q=" + document.getElementById("searchWord").value;
            addRequestParameter(parameter);
            var numCheck = isNumeric(document.getElementById("searchMaxResults").value);
            if((document.getElementById("searchMaxResults").value == 0) || (numCheck == !true)) {
                $scope.noMaxResults = true;
                return 0;
            }
            else
                parameter = "maxResults=" + document.getElementById("searchMaxResults").value;
            addRequestParameter(parameter);
            addKey();
            var searchRequest = function (requestFinal) {
                return new Promise(function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', requestFinal , false);
                    xhr.onload = function() {
                        if (xhr.status == 200 ) {
                            resolve(xhr.response);
                            var requestResultsString = xhr.responseText;
                            console.log(requestResultsString);
                            $scope.requestResults = JSON.parse(requestResultsString);
                        } else {
                            reject(xhr.status + ': ' + xhr.statusText);
                            console.log("REJECTED");
                        }
                    };
                    xhr.send();
                    $scope.showResults = true;
                });
            };
            searchRequest(request);

            function addAnd () {
                request = request + '&';
            }

            function addKey() {
                request = request + 'key=' + key;
            }

            function addRequestParameter (parameter){
                request = request + parameter;
                addAnd();
            }

            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
        }
    }]);

