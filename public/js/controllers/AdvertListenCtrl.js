angular.module('AdOnPlatform')
  .controller('AdvertListenCtrl',
    ['$scope', 'WizardHandler', '$sonicnetListener', '$primus', '$window', '$adverts',
    function($scope, WizardHandler, $sonicnetListener, $primus, $window, $adverts) {
    'use strict';

    $scope.finishedListening = function() {
      console.log('Finished');
    };

    $scope.startListening = function() {
      console.log('Start Listening');
      if ($sonicnetListener.isRunning()) {
        $sonicnetListener.stop();
      }
      $sonicnetListener.start()
      .then(function(shortcode) {
        $adverts.getAdvertById(shortcode, function(result) {
          if (result.url) {
            $sonicnetListener.stop();
            $window.location.href = result.url;
          }
        });
      });
      WizardHandler.wizard().next();
    };

    $scope.stopListening = function() {
     console.log('Stop Listening');
     if ($sonicnetListener.isRunning()) {
       $sonicnetListener.stop();
     }
     WizardHandler.wizard().goTo(0);
    };
  }]);