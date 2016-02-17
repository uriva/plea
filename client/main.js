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


var MainController = function($scope, $meteor) {
  this.scope_ = $scope;
  this.finalText = [];
  this.grammar = 'sample -> hi there';
  this.startListening();
};

MainController.prototype.startListening = function() {
  startListening(text => {
    this.finalText.push(text);
    this.scope_.$apply();
  });

};

MainController.prototype.readGrammar = function() {
  console.log('readGrammar', this.grammar);

};


angular.module('plea', ['angular-meteor']);

angular.module('plea').controller('mainCtrl', ['$scope', '$meteor', MainController]);
