var key = "AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";
var requestDefault = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&';
var search = angular.module('search',[]);
search.controller('allSearch', ['$scope', "$log",
    function ($scope) {
        $scope.searchByWord =  function () {
            var request = requestDefault;
            $scope.noMaxResults = false;
            $scope.noSearchWord = false;
            var parameter = "";
            if(document.getElementById("searchWord").value == 0) {
                parameter = "q=cookies";
                $scope.noSearchWord = true;
                return 0;
            }
            else
                parameter = "q=" + document.getElementById("searchWord").value;
            addRequestParameter(parameter);
            if(document.getElementById("searchMaxResults").value == 0) {
                parameter = "maxResults=5";
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
                            $scope.requestResults = JSON.parse(requestResultsString);
                        } else {
                            reject(xhr.status + ': ' + xhr.statusText);
                            console.log("REJECTED");
                        }
                    };
                    console.log(requestFinal);
                    xhr.send();
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
        }
    }]);

