(function() {
  'use strict';

  module.exports = appCtrl;

  appCtrl.$inject = ['$state'];

  function appCtrl($state) {
    var vm = this;
    vm.goToUsers = goToUsers;

    function goToUsers() {
      $state.go('userList');
    }

    function goToNewUser() {
      console.log('user');
      $state.go('user');
    }
  }
})();
