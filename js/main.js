var key = "AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";
var requestExample = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=pewdiepie&key=AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";

/*googleApiClientReady = function() {
    gapi.auth.init(function() {
        window.setTimeout(checkAuth, 1);
    });
}

function checkAuth() {
    console.log('check');
    gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
    }, handleAuthResult);
}
function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        $('.pre-auth').hide();
        $('.post-auth').show();
        loadAPIClientInterfaces();
    } else {
        $('#login-link').click(function() {
            gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
            }, handleAuthResult);
        });
    }
}
function searchByKeyword() {
    var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});
    for(var i in results.items) {
        var item = results.items[i];
        Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
    }
} */

var search = angular.module('search',[]);
search.controller('allSearch', ['$scope', "$log",
    function ($scope) {
        var request = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&';
        $scope.searchByWord =  function () {
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
            var xhr = new XMLHttpRequest();
            xhr.open('GET', request , false);
            xhr.send();
            if (xhr.status != 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            } else {
                var requestResultsString = xhr.responseText;
                $scope.requestResults = JSON.parse(requestResultsString);
                //console.log(requestResults.items);
            }
        }

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
    }]);

