var startListening = function(callback) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function() {
        console.log('onstart');
    };
    recognition.onerror = function(event) {
        console.error('error', event);
    };
    recognition.onend = function() {
        console.log('recognition end');
    };
    recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                console.log('final:', event.results[i][0].transcript);
                callback(event.results[i][0].transcript);
            } else {
                console.log('interim:', event.results[i][0].transcript);
            }
        }
    };
    recognition.start();
};


angular.module('plea', ['angular-meteor']);

angular.module('plea').controller('mainCtrl', ['$scope', '$meteor',
    function($scope, $meteor) {
        console.log('mainCtrl constructor');
        $scope.finalText = [];
        $scope.startListening = () => startListening(text => {
            $scope.finalText.push(text);
            $scope.$apply();
        });
        $scope.startListening();
    }
]);
