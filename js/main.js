var key = "AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";
var OAUTH2_CLIENT_ID = '777808237661-5i6715akvm1ju8oia0ghu2ph620vg6ka.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/youtube'
];

var requestEX = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=pewdiepie&key=AIzaSyAVZzUdPUyWFbuPXChAcIGX8hHwgoBghmw";

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

var search = angular.module('search');
search.controller('allSearch', ['$scope', "$log",
    function () {
        var xhr = new XMLHttpRequest();
        var request = 'https://www.googleapis.com/youtube/v3/search?part=snippet&';
        parameter = "maxResults=5";
        addRequestParameter(parameter);
        console.log(request);
        parameter = "q=pewdiepie";
        addRequestParameter(parameter);
        console.log(request);
        addKey();
        console.log(request);
        xhr.open('GET', request , false);
        xhr.send();
        if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
        } else {
            console.log( xhr.responseText );
        }

        function addAnd () {
            request = request + '&';
        }

        function addKey() {
            addAnd();
            request = request + 'key=' + key;
        }

        function addRequestParameter (parameter){
            request = request + parameter;
            addAnd();
        }
    }]);

