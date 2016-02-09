(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'ngMaterial',
      'firebase'
  ])
  .config(['$stateProvider', '$urlRouterProvider', require('./appRouter')])
  .controller('appCtrl', require('./appCtrl'))
  .controller('userListCtrl', require('./userListCtrl'))
  .controller('userCtrl', require('./userCtrl'))
  .controller('chatCtrl', require('./chatCtrl'))
  .factory('firebaseFactory', require('./firebaseFactory'))
  .constant('FIRE_URL', 'https://material-sandbox.firebaseio.com/');
})();
